## Run development environment
1. Install Docker and docker-compose
2. Run the containers:
```
docker-compose up -d
```
3. Example SQL query:
```
docker-compose exec postgres psql -U hh -d hh -c 'SELECT * FROM students'
```
