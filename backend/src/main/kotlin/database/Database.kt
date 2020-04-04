package database

import Task
import lib.database.getOrCreateDataSource

class Database : DatabaseQueries {
    val pool = getOrCreateDataSource("billboard")
    val connection
        get() = pool.connection

    fun allTask() = connection.executeQuery(
        """SELECT * FROM tasks""",
        listOf(),
        parseList { Task(it) }
    )
}
