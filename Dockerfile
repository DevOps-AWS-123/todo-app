# Use an official OpenJDK image as a base
FROM openjdk:11-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar from target to the container
COPY target/todoapp-0.0.1-SNAPSHOT.jar /app/todoapp.jar

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the jar
ENTRYPOINT ["java", "-jar", "todoapp.jar"]
