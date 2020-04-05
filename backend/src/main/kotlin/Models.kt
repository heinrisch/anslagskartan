import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.readValue
import java.sql.ResultSet
import java.util.*

data class Location(val lat: Double, val lng: Double)

data class Task(
    val id: UUID,
    val title: String,
    val userId: String,
    val location: Location,
    val data: JsonNode = objectMapper.readValue("{}")
) {
    constructor(rs: ResultSet) : this(
        id = rs.getObject("id", UUID::class.java)!!,
        title = rs.getString("title"),
        userId = rs.getString("user_id"),
        location = Location(rs.getDouble("lat"), rs.getDouble("lng")),
        data = objectMapper.readValue(rs.getString("data"))
    )
}


data class MessageResponse(val message: String)

class ExpectedException(message: String) : Exception(message)

data class Tasks(val tasks: List<Task>)

data class TaskResponse(val taskId: UUID)

data class CreateTaskRequest(
    val title: String,
    val location: Location,
    val data: JsonNode
)
