package lib.database

import com.mchange.v2.c3p0.ComboPooledDataSource
import java.util.concurrent.ConcurrentHashMap

object Config {
    object Database {
        val user = "root"
        val password = "password123"
        val host = "127.0.0.1"
        val port = "5440"
    }
}

private val dataSources = ConcurrentHashMap<String, ComboPooledDataSource>()

fun getOrCreateDataSource(dbName: String): ComboPooledDataSource {
    return dataSources[dbName] ?: ComboPooledDataSource().apply {
        driverClass = "org.postgresql.Driver"
        jdbcUrl = "jdbc:postgresql://${Config.Database.host}:${Config.Database.port}/$dbName"
        user = Config.Database.user
        password = Config.Database.password
        // Test that the connections are valid every 5 min
        // http://www.mchange.com/projects/c3p0/index.html#idleConnectionTestPeriod
        idleConnectionTestPeriod = 300
        maxIdleTime = 600
        initialPoolSize = 1
        minPoolSize = 1
        maxPoolSize = 2
        acquireIncrement = 1
    }.also {
        dataSources[dbName] = it
    }
}
