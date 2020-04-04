package lib.database

import com.mchange.v2.c3p0.ComboPooledDataSource
import java.util.concurrent.ConcurrentHashMap

/*
master
bUZYs6thS8h5ZwExuElyi4lMFi
5432
billboard-map.c1yomcfi20b2.eu-west-1.rds.amazonaws.com
    DB_USER=master DB_PASSWORD=bUZYs6thS8h5ZwExuElyi4lMFi DB_HOST=billboard-map.c1yomcfi20b2.eu-west-1.rds.amazonaws.com DB_PORT=5432
 */

object Config {
    object Database {
        val user = System.getenv("DB_USER") ?: "root"
        val password = System.getenv("DB_PASSWORD") ?: "password123"
        val host = System.getenv("DB_HOST") ?: "127.0.0.1"
        val port = System.getenv("DB_PORT") ?: "5440"
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
