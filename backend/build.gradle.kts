plugins {
    kotlin("jvm") version "1.3.71"
    application
}

group = "com.misahenk.billbaord"
version = "1.0-SNAPSHOT"

application {
    mainClassName = "MainKt"
}

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    implementation(kotlin("stdlib-jdk8"))
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.3.71")

    // Web
    implementation("com.sparkjava:spark-core:2.8.0")

    // Jackson
    implementation("com.fasterxml.jackson.core:jackson-core:2.9.7")
    implementation("com.fasterxml.jackson.core:jackson-annotations:2.9.7")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.9.7")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.9")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.9.0")

    // Database
    implementation("org.postgresql:postgresql:42.2.6")
    implementation("com.mchange:c3p0:0.9.5.4")

    // Firebase
    implementation("com.google.firebase:firebase-admin:6.12.2")

    // Logging
    implementation("org.slf4j:slf4j-simple:1.7.21")

    // Tests
    testImplementation("org.junit.jupiter:junit-jupiter:5.5.2")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.5.2")
    testRuntime("org.junit.jupiter:junit-jupiter-engine:5.5.2")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.5.2")
    testImplementation("com.github.kittinunf.fuel:fuel:1.13.0")
    testImplementation("com.github.kittinunf.fuel:fuel-gson:1.13.0")
}

val allEnvVariables
    get() = File("$projectDir/.env")
        .readLines()
        .filter { it.isNotBlank() }
        .map { it.split("=") }
        .filter { System.getenv(it.component1()).isNullOrBlank() }
        .map { it.component1() to it.component2() }
        .toMap()

tasks {
    withType<Test> {
        useJUnitPlatform()

        environment(allEnvVariables)

        testLogging {
            events("passed", "skipped", "failed")
        }
    }
}


tasks {
    compileKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
}
