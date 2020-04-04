import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import database.Database
import database.getUUID
import spark.Request
import spark.Response
import spark.Spark
import java.sql.ResultSet
import java.util.*


val objectMapper = ObjectMapper().apply {
    registerModules(KotlinModule(), JavaTimeModule())
    configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
}

data class MessageResponse(val message: String)
class ExpectedException(message: String) : Exception(message)

val firebaseUtil by lazy { FirebaseUtil() }

fun main() {
    val responseTransformer = { model: Any? -> objectMapper.writeValueAsString(model) }
    val port = 4021
    println("Starting spark listening to port $port")
    Spark.port(port)

    val routes = Routes()
    Spark.get("/ping", routes::ping, responseTransformer)
    Spark.get("/check-auth", routes::checkAuth, responseTransformer)
    Spark.get("/all-tasks", routes::allTasks, responseTransformer)

    fixCors()

    Spark.afterAfter { request, response ->
        println("${request.uri()} -> ${response.status()}")
    }

    Spark.exception(ExpectedException::class.java) { exception, request, response ->
        response.status(401)
        response.body("Just a failure: ${exception.message}")
    }

    Spark.exception(Exception::class.java) { exception, request, response ->
        response.status(500)
        response.body("Terrible failure: ${exception.message}");
    }
}

class Routes {
    val database = Database()
    fun ping(request: Request, response: Response) = MessageResponse("Pong")
    fun checkAuth(request: Request, response: Response) = auth(request) { userId ->
        MessageResponse("Logged in as user: $userId")
    }

    fun allTasks(request: Request, response: Response) = database.allTask()
}


fun auth(request: Request, block: (idToken: String) -> Any): Any {
    val decodedToken = firebaseUtil.validateToken(request)
    return block(decodedToken.uid)
}

data class Location(val lat: Double, val lng: Double)
data class Task(val id: UUID, val title: String, val location: Location, val data: JsonNode = objectMapper.readValue("{}")) {
    constructor(rs: ResultSet) : this(
        id = rs.getUUID("id"),
        title = rs.getString("title"),
        location = Location(rs.getDouble("lat"), rs.getDouble("lng")),
        data = objectMapper.readValue(rs.getString("data"))
    )
}
