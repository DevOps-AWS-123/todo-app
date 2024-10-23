pipeline {
    agent any

    tools {
      maven 'maven'
      docker 'docker'
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

        // Optional: Deploy to a Docker Host (You can customize this step to suit your needs)
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
