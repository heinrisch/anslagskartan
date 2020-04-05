import spark.Request
import spark.Response
import spark.Spark
import spark.Spark.options

fun fixCors() {
    options("/*") { req, res ->
        val accessControlRequestHeaders = req.headers("Access-Control-Request-Headers")
        if (accessControlRequestHeaders != null) {
            res.header("Access-Control-Allow-Headers", accessControlRequestHeaders)
        }
        val accessControlRequestMethod = req.headers("Access-Control-Request-Method")
        if (accessControlRequestMethod != null) {
            res.header("Access-Control-Allow-Methods", accessControlRequestMethod)
        }
        "OK"
    }

    Spark.before("*") { request: Request, response: Response ->
        response.header("Access-Control-Allow-Origin", "*")
        response.header("Access-Control-Allow-Headers", "*")
        response.type("application/json")
    }
}
