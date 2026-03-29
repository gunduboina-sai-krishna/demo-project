pipeline {
    agent any
    environment {
        SONAR_SERVER = 'sonar-server'   // must match Jenkins config
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/gunduboina-sai-krishna/demo-project.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv("${SONAR_SERVER}") {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=demo \
                        -Dsonar.projectName=demo \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=node_modules/** \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }

        // 🔥 THIS IS CRITICAL (pipeline will fail here if quality is bad)
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                docker build -t sai/krishna:latest .
                """
            }
        }
    }
}