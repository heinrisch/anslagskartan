package database

import CreateTaskRequest
import Task
import com.fasterxml.jackson.databind.JsonNode
import com.mchange.v2.c3p0.ComboPooledDataSource
import objectMapper
import java.sql.Connection
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.*

class Database {
    private val pool = ComboPooledDataSource().apply {
        user = System.getenv("DB_USER") ?: "root"
        password = System.getenv("DB_PASSWORD") ?: "password123"
        val host = System.getenv("DB_HOST") ?: "127.0.0.1"
        val port = System.getenv("DB_PORT") ?: "5440"

        driverClass = "org.postgresql.Driver"
        jdbcUrl = "jdbc:postgresql://${host}:${port}/billboard"
        idleConnectionTestPeriod = 300
        maxIdleTime = 600
        initialPoolSize = 1
        minPoolSize = 1
        maxPoolSize = 2
        acquireIncrement = 1
    }

    fun allTask(): List<Task> {
        val query = "SELECT * FROM tasks"
        return runQuery(pool.connection, true, query, emptyList()) {
            val tasks = mutableListOf<Task>()
            while (it.next()) {
                tasks.add(Task(it))
            }
            tasks
        }
    }

    fun replaceTask(userId: String, taskId: UUID, create: CreateTaskRequest) {
        val connection = pool.connection
        connection.autoCommit = false
        deleteTask(taskId, userId, connection, false)
        createTask(taskId, userId, create, connection, false)
        connection.commit()
        connection.close()
    }

    fun deleteTask(
        taskId: UUID,
        userId: String,
        connection: Connection = pool.connection,
        closeConnection: Boolean = true
    ) {
        val query = "DELETE FROM tasks WHERE user_id = ? AND id = ? RETURNING 1"
        val arguments = listOf(userId, taskId)
        return runQuery(connection, closeConnection, query, arguments) {
            it.next()
        }
    }

    fun tasksForUser(userId: String): List<Task> {
        val query = "SELECT * FROM tasks WHERE user_id = ?"
        val arguments = listOf(userId)
        return runQuery(pool.connection, true, query, arguments) {
            val tasks = mutableListOf<Task>()
            while (it.next()) {
                tasks.add(Task(it))
            }
            tasks
        }
    }

    fun createTask(
        taskId: UUID,
        userId: String,
        create: CreateTaskRequest,
        connection: Connection = pool.connection,
        closeConnection: Boolean = true
    ): UUID {
        val query = "INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES (?,?,?,?,?,?::JSONB) RETURNING id"
        val arguments = listOf(
            taskId,
            userId,
            create.title,
            create.location.lat,
            create.location.lng,
            create.data
        )
        return runQuery(connection, closeConnection, query, arguments) {
            it.next()
            it.getObject("id", UUID::class.java)!!
        }
    }

    private fun <T> runQuery(
        connection: Connection,
        closeConnection: Boolean,
        query: String,
        arguments: List<Any>,
        block: (ResultSet) -> T
    ): T {
        val ps = connection.prepareStatement(query)
        arguments.forEachIndexed { index: Int, arg: Any? ->
            val pos = index + 1
            setArgument(ps, pos, arg)
        }
        val result = ps.executeQuery().use {
            block(it)
        }
        ps.close()
        if (closeConnection) connection.close()
        return result
    }

    private fun setArgument(ps: PreparedStatement, position: Int, arg: Any?) = when (arg) {
        is JsonNode -> ps.setObject(position, objectMapper.writeValueAsString(arg))
        is String -> ps.setString(position, arg)
        is Double -> ps.setDouble(position, arg)
        is UUID -> ps.setObject(position, arg)
        else -> throw Exception("Argument not supported: $arg, $position")
    }
}
