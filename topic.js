const  Kafka = require("kafkajs").Kafka
run()
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["Kalyans-MBP.hsd1.az.comcast.net:9092"]
        })
        const admin = kafka.admin();
        console.log(`Connecting... to kafka`)
        //because its a promise we need to await
        await admin.connect()
        console.log(`Connected..`)
        //A-M, N-Z 
        const result = await admin.createTopics({
            "topics":[{
                "topic":"Users",
                "numPartitions":2
            }]
        })
        console.log(`Created topic succesfully ${result}`)
        await admin.disconnect()
    }
    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}