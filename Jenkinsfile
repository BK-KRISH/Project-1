pipeline {
    agent any
    environment {
        IMAGE = "bkkrish007/college-login"
    }
    stages {
        stage('Checkout') {
            steps { 
                checkout scm 
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    def img = "${IMAGE}:${BUILD_NUMBER}"
                    bat "docker build -t ${img} ."
                    bat "docker tag ${img} ${IMAGE}:latest"
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat """
                        echo %PASS% | docker login -u %USER% --password-stdin
                        docker push ${IMAGE}:${BUILD_NUMBER}
                        docker push ${IMAGE}:latest
                    """
                }
            }
        }
        stage('Deploy') {
            steps {
                bat "docker rm -f college-login 2>nul || exit 0"
                bat "docker run -d -p 8080:80 --name college-login ${IMAGE}:latest"
            }
        }
    }
}
