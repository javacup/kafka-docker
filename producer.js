const  Kafka = require("kafkajs").Kafka
const msg = process.argv[2];
run()
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["Kalyans-MBP.hsd1.az.comcast.net:9092"]
        })
        const producer = kafka.producer()
        console.log(`Connecting... to kafka`)
        //because its a promise we need to await
        await producer.connect()
        console.log(`Connected..`)
        //A-M, N-Z 
        partition = msg[0]<"N"?0:1
        const result = await producer.send({
            "topic":"Users",
            "messages":[
                {
                    "value":msg,
                    "partition":partition
                }
            ]
        })
        console.log(`Sent message succesfully ${JSON.stringify(result)}`)
        await producer.disconnect()
    }
    catch(ex){
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}