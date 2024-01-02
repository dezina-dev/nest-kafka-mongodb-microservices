# Microservices with Kafka in NestJS

This NestJS application consists of two microservices (`Microservice1` and `Microservice2`) interacting with each other through Kafka. Each microservice manages its own data and communicates with the other microservice via Kafka messages.

## Microservice1

### Overview

- **Service Name:** `Microservice1`
- **Data Model:** Manages `Product` entities.

### Service Structure

- **Module:** `Microservice1Module`
- **Controller:** `Microservice1Controller`
- **Service:** `Microservice1Service`
- **Model:** `Product`

### Functionality

- `getAllProducts`: Retrieve all products from the database.
- `createProduct`: Create a new product and publish a Kafka message.

## Microservice2

### Overview

- **Service Name:** `Microservice2`
- **Data Model:** Manages `Order` entities.

### Service Structure

- **Module:** `Microservice2Module`
- **Controller:** `Microservice2Controller`
- **Service:** `Microservice2Service`
- **Model:** `Order`

### Functionality

- `getAllOrders`: Retrieve all orders from the database.
- `createOrder`: Create a new order and publish a Kafka message.

## Kafka Service

### Overview

- **Service Name:** `KafkaService`
- **Description:** Manages Kafka connections, producers, and consumers for communication between microservices.

### Service Structure

- **Service:** `KafkaService`

### Functionality

- **Connect and Disconnect:** Establish and terminate connections to Kafka.
- **Send Messages:** Send messages to specific Kafka topics for each microservice.
- **Consume Messages:** Receive and process messages from Kafka topics for each microservice.
- **Why kafka used:** Kafka is used as a message broker to facilitate communication and data synchronization between the microservices,     specifically microservice1 and microservice2. Kafka provides a distributed and fault-tolerant messaging system that allows decoupling of different services by enabling asynchronous communication. Kafka serves as a central communication hub for your microservices, enabling them to communicate asynchronously through events. This helps in building a scalable, resilient, and loosely coupled microservices architecture.

## Usage

### Docker

- **Why docker used:** The application can be run using Docker for ease of deployment & primarily to provide containerization for your microservices.

1. Install Docker on your machine if not already installed.

2. Build the Docker image:

   ```bash
   Go in each directory where there is Dockerfile & build docker image
      cd microservice1
      docker build -t microservice1-image .
   ```
3. Run the Docker container

  ```bash
  docker run -p 4001:4001 my-nestjs-app
  ```
4. docker-compose.yml
  ```bash
    - You use the docker-compose up command to start all the services defined in the file docker-compose.yml.
    - Instead of running individual docker build and docker run commands for each service, you define all the configurations in a docker-compose.yml file and then use a single docker-compose command to start and manage the entire application.
    - Build Docker images: docker-compose build
    - Run Docker Compose: docker-compose up
  ```
  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
