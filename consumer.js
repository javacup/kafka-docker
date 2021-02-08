const  Kafka = require("kafkajs").Kafka

run()
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["Kalyans-MBP.hsd1.az.comcast.net:9092"]
        })
        const consumer = kafka.consumer({"groupId":"test"})

        console.log(`Connecting... to kafka`)
        //because its a promise we need to await
        await consumer.connect()
        console.log(`Connected..`)

        await consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received message: ${result.message.value} on partition ${result.partition} `)
            }
        })
    }
    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }
}