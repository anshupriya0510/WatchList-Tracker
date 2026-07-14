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
                sh '''
cat > .env <<EOF
MONGO_URI=mongodb+srv://anshupriya4748_db_user:anshupriya2004@cluster0anshu.etj421u.mongodb.net/watchlist?retryWrites=true&w=majority&appName=Cluster0Anshu
PORT=5000
EOF
'''
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
