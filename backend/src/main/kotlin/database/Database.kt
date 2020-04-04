package database

import Routes
import Task
import lib.database.getOrCreateDataSource
import java.sql.Connection
import java.util.*

class Database : DatabaseQueries {
    val pool = getOrCreateDataSource("billboard")
    val c
        get() = pool.connection

    fun allTask() = c.executeQuery(
        """SELECT * FROM tasks""",
        listOf(),
        parseList { Task(it) }
    )

    fun createTask(taskId: UUID, userId: String, create: Routes.CreateTaskRequest, connection: Connection = c, closeConnection: Boolean = true) =
        connection.executeQuery(
            """INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES (?,?,?,?,?,?::JSONB) RETURNING id""",
            listOf(taskId, userId, create.title, create.location.lat, create.location.lng, Json(create.data)),
            closeConnection,
            ::returnUuid
        )

    fun replaceTask(userId: String, taskId: UUID, create: Routes.CreateTaskRequest) = c.transaction {
        deleteTask(taskId, userId, connection, false)
        createTask(taskId, userId, create, connection, false)
    }

    fun deleteTask(taskId: UUID, userId: String, connection: Connection = c, closeConnection: Boolean = true) = connection.executeUpdate(
        """DELETE FROM tasks WHERE user_id = ? AND id = ?""",
        listOf(userId, taskId),
        closeConnection
    )

    fun tasksForUser(userId: String): List<Task> = c.executeQuery(
        """SELECT * FROM tasks WHERE user_id = ?""",
        listOf(userId),
        parseList { Task(it) }
    )
}
