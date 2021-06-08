FROM maven:3.6.3-jdk-11 AS builder
WORKDIR /hh-gowork
COPY ./pom.xml ./
RUN mvn dependency:go-offline
COPY ./src ./src
RUN mvn -B clean package -DskipTests

FROM openjdk:11
WORKDIR /hh-gowork
COPY --from=builder /hh-gowork/target ./target
COPY --from=builder /hh-gowork/src/etc ./settings
ENTRYPOINT java -DsettingsDir=./settings -jar ./target/back.jar
