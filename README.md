# Orion MicroCRM

Orion is a simple Customer Relationship Management (CRM) application composed of an Angular frontend and a Spring Boot backend.

## 🚀 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🏗️ Technical Choices & Architecture

To ensure a robust, scalable, and maintainable application, the following technical choices were implemented:

- **CI/CD Pipeline:** GitHub Actions is used to separate the Continuous Integration (automated testing + SonarCloud quality gate) from the Delivery process (building Docker images & GitHub Releases).
- **Containerization:** Multi-stage Docker builds are used to optimize image size and security (e.g., using `nginx-unprivileged` for the frontend and a lightweight JRE for the backend).
- **Monitoring:** An ELK Stack (Elasticsearch, Logstash, Kibana) captures backend logs via TCP in native JSON format, ensuring high observability without multiline stack trace parsing issues.
- **Quality & Security:** SonarCloud is integrated as a strict Quality Gate to prevent technical debt and vulnerabilities from reaching production.

## 🛠️ Installation & Running the Application

The application is fully containerized. Since it shares a global external network with the monitoring stack, you must create this network first:

```bash
docker network create orion-global-network
```

To start both the frontend and the backend, run the following command at the root of the project:

```bash
docker compose up -d
```

- **Frontend:** Accessible at `http://localhost:4200` (Use an Incognito/Private window if your browser forces HTTPS).
- **Backend API:** Accessible at `http://localhost:8080`.

To stop the application:

```bash
docker compose down
```

## 📊 Monitoring (ELK Stack)

This project includes an ELK stack to monitor backend logs in real-time.

1. Start the monitoring stack:

```bash
docker compose -f docker-compose.elk.yml up -d
```

2. Access **Kibana** at `http://localhost:5601`.
3. The logs from the Spring Boot backend are automatically forwarded to Logstash via TCP port 5000 and indexed in Elasticsearch.

## 💾 Infrastructure Backup

Since the backend currently uses an in-memory database (`HSQLDB`) for development, there is no persistent business data to back up. The backup strategy therefore focuses on the **Infrastructure as Code (IaC)**.

An automated backup script is provided to secure the Docker configuration and Logstash pipelines.

```bash
# Make the script executable (first time only)
chmod +x backup.sh

# Run the backup
./backup.sh
```

The script creates a timestamped archive (`.tar.gz`) in the `backups/` directory and automatically retains only the 5 most recent backups.
