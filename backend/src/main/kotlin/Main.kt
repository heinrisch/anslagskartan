import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.google.firebase.auth.FirebaseAuth
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

fun main() {

    val responseTransformer = { model: Any? -> objectMapper.writeValueAsString(model) }
    val port = 4021
    println("Starting spark listening to port $port")
    Spark.port(port)

    val routes = Routes()
    Spark.get("/ping", routes::ping, responseTransformer)
    Spark.get("/check-auth", routes::checkAuth, responseTransformer)


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
}


fun auth(request: Request, block: (idToken: String) -> Any): Any {
    val idToken = request.headers("idToken") ?: throw ExpectedException("Token Missing")
    val decodedToken = try {
        FirebaseAuth.getInstance().verifyIdToken(idToken)
    } catch (e: Exception) {
        e.printStackTrace()
        throw ExpectedException("Failed verifying token: ${e.message}")
    }
    return block(decodedToken.uid)
}
