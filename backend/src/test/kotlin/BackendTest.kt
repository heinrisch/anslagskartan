import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.Fuel
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import spark.Request
import spark.Spark
import java.util.*

class BackendTest {

    val host = "http://127.0.0.1:1234"

    @Test
    fun `test ping`() {
        val (a,b,c) = Fuel.Companion.get("$host/ping").responseString()
        assertEquals(
            200,
            b.statusCode
        )
    }

    @Test
    fun `test auth`() {
        val (a,b,c) = Fuel.Companion.get("$host/check-auth").responseString()
        assertEquals(
            200,
            b.statusCode
        )
    }

    fun getMyTasks()  = objectMapper.readValue<Routes.Tasks>(Fuel.Companion.get("$host/me/tasks").responseString().third.get())

    fun createTask(): UUID {
        val (a,b,c) = Fuel.Companion.post("$host/tasks").body("""
            {
              "title": "This is the title",
              "location": {
                "lat": 123.123,
                "lng": 123.123
              },
              "data": {
                "category": "Hospital",
                "type": "SELL",
                "text": "Hej! Jag har massa visior som jag kan bli av med"
              }
            }
        """).responseString()
        assertEquals(
            200,
            b.statusCode
        )
        return objectMapper.readValue<Routes.TaskResponse>(c.get()).taskId
    }

    @Test
    fun `test create task`() {
        val id = createTask()
        assertTrue(getMyTasks().tasks.map { it.id }.contains(id))
    }

    @Test
    fun `test replace task`() {
        val id = createTask()
        val newTitle = UUID.randomUUID().toString()

        val (a,b,c) = Fuel.Companion.post("$host/tasks/$id").body("""
            {
              "title": "$newTitle",
              "location": {
                "lat": 123.123,
                "lng": 123.123
              },
              "data": {
                "category": "Hospital",
                "type": "SELL",
                "text": "Hej! Jag har massa visior som jag kan bli av med"
              }
            }
        """).responseString()

        assertEquals(
            200,
            b.statusCode
        )
        assertEquals(
            id,
            objectMapper.readValue<Routes.TaskResponse>(c.get()).taskId
        )

        assertEquals(
            newTitle,
            getMyTasks().tasks.filter { it.id == id }.first().title
        )

    }

    companion object {

        private fun auth(request: Request, block: (idToken: String) -> Any): Any {
            return block("hack-user-123")
        }

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            startWebServer(::auth, 1234)
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            Spark.stop()
        }
    }


}
