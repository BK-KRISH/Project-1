pipeline {
  agent any
  environment {
    IMAGE = "bkkrish007/college-login"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
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
            docker login -u %USER% -p %PASS%
            docker push %USER%/college-login:${BUILD_NUMBER}
            docker push %USER%/college-login:latest
          """
        }
      }
    }
    stage('Deploy') {
      steps {
        bat "docker rm -f college-login 2>nul"
        bat "docker run -d -p 8080:80 --name college-login %USER%/college-login:latest"
      }
    }
  }
}

