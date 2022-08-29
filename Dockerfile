FROM openjdk:18

LABEL Thomas="thomaskittlaus@gmail.com"

ADD backend/target/AWSTrainer.jar AWSTrainer.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$URI -jar /AWSTrainer.jar" ]