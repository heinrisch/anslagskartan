package database

import objectMapper
import java.sql.Connection
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.time.LocalTime
import java.time.OffsetDateTime
import java.util.*


data class Json(val data: String) {
    constructor(data: Any) :
            this(objectMapper.writeValueAsString(data))
}

data class StringArray(val strings: List<String>)
data class UUIDArray(val uuids: List<UUID>)

interface DatabaseQueries {
    /*
    data.Database pooling with c3p0 is used.
    Connections, PreparedStatements, and ResultSets should be closed!
     */

    fun PreparedStatement.setArgument(connection: Connection, position: Int, arg: Any?) = when (arg) {
        is Json -> setObject(position, arg.data)
        is StringArray -> setArray(position, connection.createArrayOf("text", arg.strings.toTypedArray()))
        is UUIDArray -> setArray(position, connection.createArrayOf("uuid", arg.uuids.toTypedArray()))
        is String -> setString(position, arg)
        is Double -> setDouble(position, arg)
        is OffsetDateTime -> setObject(position, arg)
        is LocalTime -> setObject(position, arg)
        is UUID -> setObject(position, arg)
        is Int -> setInt(position, arg)
        is Long -> setLong(position, arg)
        else -> {
            if (arg == null) {
                setObject(position, null)
            } else {
                throw Exception("Argument not supported: $arg, $position")
            }
        }
    }

    private fun <T> Connection.statement(
        query: String,
        args: List<Any?>,
        closeConnection: Boolean = true,
        block: PreparedStatement.() -> T
    ): T {
        val statement = prepareStatement(query).apply {
            args.forEachIndexed { index: Int, arg: Any? ->
                val pos = index + 1
                setArgument(this@statement, pos, arg)
            }
        }
        return try {
            block(statement)
        } finally {
            statement.close()
            if (closeConnection) close()
        }
    }

    fun Connection.executeUpdate(query: String, args: List<Any?>, closeConnection: Boolean = true) =
        statement(query, args, closeConnection) {
            executeUpdate()
        }

    fun <T> Connection.executeQuery(query: String, args: List<Any?>, block: (ResultSet) -> T): T =
        executeQuery(query, args, true, block)

    fun <T> Connection.executeQuery(
        query: String,
        args: List<Any?>,
        closeConnection: Boolean,
        block: (ResultSet) -> T
    ): T = statement(query, args, closeConnection) {
        val resultSet = executeQuery()
        return@statement try {
            block(resultSet)
        } finally {
            resultSet.close()
        }
    }

    fun Connection.executeBatch(query: String, argList: Sequence<List<Any?>>, closeConnection: Boolean = true) {
        val statement = prepareStatement(query)
        argList.forEach { args ->
            args.forEachIndexed { index, arg -> statement.setArgument(this, index + 1, arg) }
            statement.addBatch()
        }
        statement.executeBatch()
        statement.close()
        if (closeConnection) close()
    }

    class Transaction(val connection: Connection) : DatabaseQueries {
        fun executeUpdate(query: String, args: List<Any?>) = connection.executeUpdate(query, args, false)
        fun <T> executeQuery(query: String, args: List<Any?>, block: (ResultSet) -> T): T =
            connection.executeQuery(query, args, false, block)

        fun executeBatch(query: String, argList: Sequence<List<Any?>>) = connection.executeBatch(query, argList, false)
    }

    fun Connection.transaction(block: Transaction.() -> Unit) {
        autoCommit = false
        block(Transaction(this))
        commit()
        autoCommit = true
        close()
    }

    fun <T> parseList(block: (ResultSet) -> T) = { resultSet: ResultSet ->
        val result = mutableListOf<T>()
        while (resultSet.next()) {
            result.add(block(resultSet))
        }
        result.toList()
    }

    fun <T> parse(block: (ResultSet) -> T) = { resultSet: ResultSet ->
        if (resultSet.next()) {
            block(resultSet)
        } else {
            null
        }
    }

    fun returnUuid(resultSet: ResultSet) = returnUuidOrNull(resultSet)!!

    fun returnUuidOrNull(resultSet: ResultSet): UUID? {
        if (!resultSet.next()) return null
        return resultSet.getUUID("id")
    }
}

fun ResultSet.getOffsetDateTime(columnName: String) = this.getObject(columnName, OffsetDateTime::class.java)!!
fun ResultSet.getOffsetDateTimeOrNull(columnName: String): OffsetDateTime? =
    this.getObject(columnName, OffsetDateTime::class.java)

fun ResultSet.getLocalTime(columnName: String) =
    this.getObject(columnName, LocalTime::class.java)

fun ResultSet.getUUID(columnName: String) = this.getObject(columnName, UUID::class.java)!!
fun ResultSet.getStringList(columnName: String) =
    (getArray(columnName).array as? Array<out Any?>)?.filterIsInstance<String>() ?: emptyList()

fun ResultSet.getUUIDList(columnName: String) =
    (getArray(columnName).array as? Array<out Any?>)?.filterIsInstance<UUID>() ?: emptyList()
