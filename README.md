# Employee Management

Simple React UI plus a Spring Boot backend. The UI talks only to `http://localhost:8080`.

## APIs

- `GET  http://localhost:8080/api/employees` — list employees
- `POST http://localhost:8080/api/employees` — save a new employee

H2 console: `http://localhost:8080/h2-console`  
JDBC URL: `jdbc:h2:file:./data/employee-db`  
User: `sa` (no password)

## Run backend

```bash
cd D:\psystem\personal\employee-management\backend
C:\apache-maven-3.9.4\bin\mvn.cmd spring-boot:run
```

If port 8080 is already in use (on this machine `PEMHTTPD-x64` / Apache often occupies it), stop that service first, then start the backend again.

## Run frontend

```bash
cd D:\psystem\personal\employee-management
npm install
npm run dev
```

Open `http://localhost:5173`.
