import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import spark.Request
import spark.Spark
import kotlin.reflect.KFunction2


val objectMapper = ObjectMapper().apply {
    registerModules(KotlinModule(), JavaTimeModule())
    configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
}

val firebaseUtil by lazy { FirebaseUtil() }

fun main() {
    startWebServer(firebaseUtil::firebaseAuth, System.getenv("PORT")?.toInt() ?: 4021)
}

fun startWebServer(auth: KFunction2<Request, (userId: String) -> Any, Any>, port: Int) {
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

    Spark.exception(ExpectedException::class.java) { exception, _, response ->
        exception.printStackTrace()
        response.status(401)
        response.body("Just a failure: ${exception.message}")
    }

    Spark.exception(Exception::class.java) { exception, _, response ->
        exception.printStackTrace()
        response.status(500)
        response.body("Terrible failure: ${exception.message}")
    }

    Spark.awaitInitialization()
}
