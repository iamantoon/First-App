**Run the application using Docker**

1. Down the repo to your local machine
2. Open a terminal from the root directory
3. Run the ```docker-compose up --build``` command
4. Go to http://localhost:5200/ to test the application

**Run backend locally**

1. Create ```docker-compose.yaml``` in the root directory
2. Fill it with a code like this:
```
version: '3.4'

services:
  db_auth:
    container_name: db_auth
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=root
      - POSTGRES_USER=admin
    image: postgres:14.3-alpine
```

3. Run the ```docker-compose up --build``` command
4. Install a Postgres extension for VS Code like PostgreSQL by Chris Kolkman
5. Use the extension to connect to the database you just created
6. Go to ```appsettins.Development.json``` and make sure the string describing a connection to database isn't wrong

**Run Angular application locally**

1. Go to the client folder and run ```npm install```
2. Go to the file named environment.prod.ts and environment.ts and change the apiUrl field to ```http://localhost:5000/api/```
3. Run the ```ng serve``` command
4. Go to ```http://localhost:4200``` and test the application
