## Run dev env
1. Install Docker and docker-compose
2. Run this command (from project root):
```console
docker-compose up -d
```
3. To get a console to a running container run:
```console
docker-compose exec back bash
docker-compose exec front bash
```
4. To get container logs:
```console
docker logs back_back_1
```
5. To clear the env run:
```console
docker-compose down
```
6. Go to `http://localhost:8082` in the browser to view the back API

## http-requests from browser
1. Add `/backend` prefix to location in every request.
For example, instead `http://localhost:3000/login` use `http://localhost:3000/backend/login`.
