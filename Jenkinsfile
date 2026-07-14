pipeline {
    agent any

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'chmod +x scripts/jenkins-deploy.sh'
                sh './scripts/jenkins-deploy.sh'
            }
        }

    }

    post {
        success {
            echo '🎉 Deployment Successful!'
        }

        failure {
            echo '❌ Deployment Failed!'
        }

        always {
            sh 'docker ps || true'
        }
    }
}


