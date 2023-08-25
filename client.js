const { Kafka } = require("kafkajs")

exports.kafka = new Kafka({
    clientId: "Kafka",
    brokers: ["192.168.1.175:9092"]
})
