import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import spark.Request
import spark.Response
import spark.Spark


val objectMapper = ObjectMapper().apply {
    registerModules(KotlinModule(), JavaTimeModule())
    configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
}

data class MessageResponse(val message: String)
class ExpectedException(message: String) : Exception(message)

val firebaseUtil by lazy { FirebaseUtil() }

fun main() {
    allTasks()
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
    fun ping(request: Request, response: Response) = MessageResponse("Pong")
    fun checkAuth(request: Request, response: Response) = auth(request) { userId ->
        MessageResponse("Logged in as user: $userId")
    }

    fun allTasks(request: Request, response: Response) = allTasks()
}


fun auth(request: Request, block: (idToken: String) -> Any): Any {
    val decodedToken = firebaseUtil.validateToken(request)
    return block(decodedToken.uid)
}

data class Location(val lat: Double, val lng: Double)
data class Task(val title: String, val location: Location, val data: JsonNode = objectMapper.readValue("{}"))


fun allTasks() = listOf(
    Task("Karolinska Universitetssjukhuset", Location(59.29374, 18.05942)),
    Task("Aleris Sports Medicine & Ortopedi", Location(59.29628, 18.05375)),
    Task("Stockholms Sjukhem", Location(59.29102, 18.05719)),
    Task("Smärtrehabiliteringen, Capio S:t Görans Sjukhus", Location(59.30994, 18.05736)),
    Task("Capio Sankt Görans Sjukhus", Location(59.31134, 18.05307)),
    Task("S:t Eriks Ögonsjukhus", Location(59.33245, 18.01567)),
    Task("Cavalio AB", Location(59.3335, 18.02048)),
    Task("Ersta sjukhus", Location(59.33315, 18.03731)),
    Task("Capio Psykiatri Hemlösa", Location(59.35512, 17.94724)),
    Task("Södersjukhuset Mammografi", Location(59.40612, 18.03671)),
    Task("SCÄ", Location(59.4042, 18.04805)),
    Task("Psykiatri Södra Stockholm Affektiv- och ångestmottagning Rosenlund", Location(59.40036, 18.04564)),
    Task("Autismcenter för små barn", Location(59.40542, 18.02607)),
    Task("Närakut Rosenlund", Location(59.36523, 18.13665)),
    Task("SÖS", Location(59.36925, 18.14489)),
    Task("Lilla Erstagården", Location(59.33689, 18.08754)),
    Task("Habiliteringscenter Söderstaden barn", Location(59.33706, 18.08239)),
    Task("Remeo Stockholm", Location(59.33566, 18.08548)),
    Task("Farsta Neurologi", Location(59.33531, 18.09097)),
    Task("Hagsätra Vantörs Psykiatriska Heldygnsvård", Location(59.33461, 18.08445)),
    Task("Bromma Sjukhus", Location(59.33584, 18.0793))
)
