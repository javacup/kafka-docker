docker kafka example 

step 1: run zookeeper

docker run --name zookeeper -p 2181:2181 zookeeper

step 2: run kafka (change host name)

docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=Kalyans-MBP.hsd1.az.comcast.net:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://Kalyans-MBP.hsd1.az.comcast.net:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka 

step 3: write a program that creates a topic with 2 partitions (topic.js)
		- install kafkajs (npm install kafkajs)
		- construct a new Kafka object by providing a client id and kafka brokers (from step 2)
		- call the admin function on kafka object
		- connect to kafka 
		- use the createTopics function and provide topic name and # partitions

step 4: write a program that creates a message using a producer (producer.js)
		messages starting with a character between A - M will be written to partition 0 otherwise 1

step 5: write a program that consumes a message (consumer.js)
		if there is only 1 consumer both partitions are consumed by the same consumer
		if there are multiple consumers the messages are parallel consumed, each consumer getting a tcp connection to a partition

Examples:
1. To send message 
	open a terminal window to your project
	node producer.js Mahitham (sends a message to partition 0)
	node producer.js Yudhistir (sends a message to partiion 1)
2. To consume a message 
	open a new terminal window 
		node consumer.js -> gets a tcp connection to one of the partitions for the topic Users
		if its the first time this consumer is consuming messages, all messages are replayed from beginning otherwise based on the commit offset 
		maintained by the consumer group, this consumer gets the most recent message
	open another terminal window
		node consumer.js -> get a tcp connection to the other partition for the topic Users
		(same behavior as above)
3. If one of the consumers goes offline, then the consumer group is rebalanced with the remaining consumer, then it starts consuming from both partitions
4. If the other consumer comes online, then the consumer group is rebalanced and consumers get reassigned a partition for message consumption
		 



