# Run development environment
1. Install Docker and docker-compose
2. Run the containers:
```
docker-compose up -d
```
3. Example SQL query:
```
docker-compose exec postgres psql -U hh -d hh -c 'SELECT * FROM students'
```

# HelloWorld nab
## Сборка docker образа

Выкачиваем готовый образ с java 11 и последней версией maven с docker hub:
```
docker pull maven:3.6.3-jdk-11
```

## Создание volume для maven repo

```
docker volume create --name maven-repo
```

## Работа с docker

### Linux:

Сборка и запуск приложения:
```
docker run --rm -v maven-repo:/root/.m2 -v $PWD:/mnt/app:Z -w /mnt/app -p 8080:8080 -it maven:3.6.3-jdk-11 mvn install exec:java
```

Только запуск приложения:
```
docker run --rm -v maven-repo:/root/.m2 -v $PWD:/mnt/app:Z -w /mnt/app -p 8080:8080 -it maven:3.6.3-jdk-11 mvn exec:java
```

### Windows:

Заменить в вызовых команд `$PWD` на `%cd%`
