import com.fasterxml.jackson.module.kotlin.readValue
import database.Database
import spark.Request
import spark.Response
import java.util.*
import kotlin.reflect.KFunction2

@Suppress("UNUSED_PARAMETER")
class Routes(val auth: KFunction2<Request, (userId: String) -> Any, Any>) {
    private val database = Database()
    fun ping(request: Request, response: Response) =
        MessageResponse("Pong")

    fun checkAuth(request: Request, response: Response) = auth(request) { userId ->
        MessageResponse("Logged in as user: $userId")
    }

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
