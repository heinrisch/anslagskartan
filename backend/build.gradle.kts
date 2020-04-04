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
}

dependencies {
    implementation(kotlin("stdlib-jdk8"))


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
}

tasks {
    compileKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
}
