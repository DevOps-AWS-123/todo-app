pipeline {
    agent any

    tools {
        // Use the specified versions of Maven and Docker
        maven 'Maven_3.9.9'   // Replace 'Maven_3.8.1' with the actual name configured in Jenkins global tool configuration
        docker 'Docker'   // Replace 'Docker' with the Docker tool name configured in Jenkins global tool configuration
    }

    environment {
        DOCKER_HUB_REPO = 'rajnages/todoapp' // Replace with your DockerHub repo
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id' // Jenkins credentials ID for DockerHub
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/DevOps-AWS-123/todo-app.git' // Replace with your repo URL
            }
        }

        stage('Build with Maven') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        // Optional: Deploy to Docker Host
        stage('Deploy to Docker') {
            steps {
                sh '''
                docker run -d -p 8080:8080 --name todoapp ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        always {
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
