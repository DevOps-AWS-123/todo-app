pipeline {
    agent any

    tools {
        // Specify Maven and Docker tools installed in Jenkins
        maven 'maven'   // Replace with your configured Maven version in Jenkins
        dockerTool 'dockerTool'   // Replace with your configured Docker installation in Jenkins
    }

    environment {
        // Docker Hub repository and credentials
        DOCKER_HUB_REPO = 'rajnages/todoapp'  // Replace with your Docker Hub repository
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id' // Replace with your Docker Hub credentials ID
        MAVEN_OPTS = '-Xmx1024m'  // Limit memory usage for Maven (adjust as necessary)
    }

    options {
        timeout(time: 30, unit: 'MINUTES')  // Set a maximum build time of 30 minutes
        timestamps()  // Add timestamps to the log
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from Git repository
                git 'https://github.com/DevOps-AWS-123/todo-app.git'  // Replace with your repo URL
            }
        }

        stage('Build with Maven') {
            steps {
                // Use a local repository to cache dependencies and run Maven with parallel builds
                sh 'mvn -T 1C -Dmaven.repo.local=$WORKSPACE/.m2 clean package'
            }
        }

        stage('Test') {
            steps {
                // Run tests with Maven
                sh 'mvn -T 1C test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image and tag it with the build number
                    docker.build("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push Docker image to Docker Hub
                    docker.withRegistry('', "${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Docker') {
            steps {
                script {
                    // Run the Docker container from the image
                    sh '''
                    docker stop todoapp || true
                    docker rm todoapp || true
                    docker run -d -p 8080:8080 --name todoapp ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
