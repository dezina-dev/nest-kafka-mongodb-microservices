import { Kafka, Producer, Consumer, ConsumerRunConfig, Partitioners } from 'kafkajs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  private kafka: Kafka;
  private producer: Producer;
  private consumer1: Consumer;
  private consumer2: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-nestjs-app',
      brokers: ['kafka-broker1:9092', 'kafka-broker2:9092'],
    });

    // Use the LegacyPartitioner for the producer
    this.producer = this.kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

    this.consumer1 = this.kafka.consumer({ groupId: 'microservice1-group' });
    this.consumer2 = this.kafka.consumer({ groupId: 'microservice2-group' });
  }

  async connect() {
    try {
      await this.producer.connect();
      await this.consumer1.connect();
      await this.consumer2.connect();
      this.logger.log('Connected to Kafka');
    } catch (error) {
      this.logger.error(`Error connecting to Kafka: ${error.message}`);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      await this.consumer1.disconnect();
      await this.consumer2.disconnect();
      this.logger.log('Disconnected from Kafka');
    } catch (error) {
      this.logger.error(`Error disconnecting from Kafka: ${error.message}`);
      throw error;
    }
  }

  async sendMicroservice1Message(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      this.logger.log(`Sent message to ${topic}`);
    } catch (error) {
      this.logger.error(`Error sending message to ${topic}: ${error.message}`);
      throw error;
    }
  }

  async sendMicroservice2Message(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      this.logger.log(`Sent message to ${topic}`);
    } catch (error) {
      this.logger.error(`Error sending message to ${topic}: ${error.message}`);
      throw error;
    }
  }

  async consumeMicroservice1Messages(topic: string, callback: (message: any) => void) {
    try {
      await this.consumer1.subscribe({ topic });

      await this.consumer1.run({
        eachMessage: async ({ message }) => {
          const parsedMessage = JSON.parse(message.value.toString());
          callback(parsedMessage);
          this.logger.log(`Received message from ${topic}: ${JSON.stringify(parsedMessage)}`);
        },
      } as ConsumerRunConfig);
    } catch (error) {
      this.logger.error(`Error consuming messages from ${topic}: ${error.message}`);
      throw error;
    }
  }

  async consumeMicroservice2Messages(topic: string, callback: (message: any) => void) {
    try {
      await this.consumer2.subscribe({ topic });

      await this.consumer2.run({
        eachMessage: async ({ message }) => {
          const parsedMessage = JSON.parse(message.value.toString());
          callback(parsedMessage);
          this.logger.log(`Received message from ${topic}: ${JSON.stringify(parsedMessage)}`);
        },
      } as ConsumerRunConfig);
    } catch (error) {
      this.logger.error(`Error consuming messages from ${topic}: ${error.message}`);
      throw error;
    }
  }
}
