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
import kotlin.reflect.KFunction2


val objectMapper = ObjectMapper().apply {
    registerModules(KotlinModule(), JavaTimeModule())
    configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
}

data class MessageResponse(val message: String)
class ExpectedException(message: String) : Exception(message)

val firebaseUtil by lazy { FirebaseUtil() }

fun main() {
    startWebServer(::firebaseAuth, 4021)
}

fun startWebServer(auth: KFunction2<Request, (userId:String) -> Any, Any>, port: Int) {
    val responseTransformer = { model: Any? -> objectMapper.writeValueAsString(model) }
    println("Starting spark listening to port $port")
    Spark.port(port)

    val routes = Routes(auth)
    Spark.get("/ping", routes::ping, responseTransformer)
    Spark.get("/check-auth", routes::checkAuth, responseTransformer)
    Spark.get("/tasks", routes::allTasks, responseTransformer)
    Spark.post("/tasks", routes::createTask, responseTransformer)
    Spark.post("/tasks/:taskId", routes::replace, responseTransformer)
    Spark.delete("/tasks/:taskId", routes::deleteTask, responseTransformer)
    Spark.get("/me/tasks", routes::tasksForUser, responseTransformer)

    fixCors()

    Spark.afterAfter { request, response ->
        println("${request.uri()} -> ${response.status()}")
    }

    Spark.exception(ExpectedException::class.java) { exception, request, response ->
        exception.printStackTrace()
        response.status(401)
        response.body("Just a failure: ${exception.message}")
    }

    Spark.exception(Exception::class.java) { exception, request, response ->
        exception.printStackTrace()
        response.status(500)
        response.body("Terrible failure: ${exception.message}");
    }

    Spark.awaitInitialization()
}

class Routes(val auth: KFunction2<Request, (userId:String) -> Any, Any>) {
    private val database = Database()
    fun ping(request: Request, response: Response) = MessageResponse("Pong")
    fun checkAuth(request: Request, response: Response) = auth(request) { userId ->
        MessageResponse("Logged in as user: $userId")
    }

    data class Tasks(val tasks: List<Task>)
    data class TaskResponse(val taskId: UUID)
    data class CreateTaskRequest(
        val title: String,
        val location: Location,
        val data: JsonNode
    )

    fun createTask(request: Request, response: Response) = auth(request) { userId ->
        val create = objectMapper.readValue<CreateTaskRequest>(request.body())
        val id = database.createTask(UUID.randomUUID(), userId, create)
        return@auth TaskResponse(id)
    }

    fun replace(request: Request, response: Response) = auth(request) { userId ->
        val taskId = UUID.fromString(request.params(":taskId"))
        val create = objectMapper.readValue<CreateTaskRequest>(request.body())
        database.replaceTask(userId, taskId, create)
        return@auth TaskResponse(taskId)
    }

    fun deleteTask(request: Request, response: Response) = auth(request) { userId ->
        val taskId = UUID.fromString(request.params(":taskId"))
        database.deleteTask(taskId, userId)
        return@auth MessageResponse("Gone")
    }

    fun tasksForUser(request: Request, response: Response) = auth(request) { userId ->
        val tasks = database.tasksForUser(userId)
        return@auth Tasks(tasks)
    }

    fun allTasks(request: Request, response: Response) =
        Tasks(database.allTask())
}


fun firebaseAuth(request: Request, block: (idToken: String) -> Any): Any {
    val decodedToken = firebaseUtil.validateToken(request)
    return block(decodedToken.uid)
}

data class Location(val lat: Double, val lng: Double)
data class Task(
    val id: UUID,
    val title: String,
    val userId: String,
    val location: Location,
    val data: JsonNode = objectMapper.readValue("{}")
) {
    constructor(rs: ResultSet) : this(
        id = rs.getUUID("id"),
        title = rs.getString("title"),
        userId = rs.getString("user_id"),
        location = Location(rs.getDouble("lat"), rs.getDouble("lng")),
        data = objectMapper.readValue(rs.getString("data"))
    )
}
