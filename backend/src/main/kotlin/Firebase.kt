import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseToken
import spark.Request


class FirebaseUtil {

    init {
        val serviceAccount =
            javaClass.getResourceAsStream("firebase.json")
        val options = FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://billboard-map-273108.firebaseio.com")
            .build()
        FirebaseApp.initializeApp(options)
    }

    private fun validateToken(request: Request): FirebaseToken {
        val idToken = request.headers("idToken") ?: throw ExpectedException("Token Missing")
        return try {
            FirebaseAuth.getInstance().verifyIdToken(idToken)
        } catch (e: Exception) {
            e.printStackTrace()
            throw ExpectedException("Failed verifying token: ${e.message}")
        }
    }

    fun firebaseAuth(request: Request, block: (idToken: String) -> Any): Any {
        val decodedToken = firebaseUtil.validateToken(request)
        return block(decodedToken.uid)
    }
}
