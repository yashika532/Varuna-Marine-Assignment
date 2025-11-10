```markdown
# ⚓ FuelEU Maritime — Full Stack Developer Assignment

A structured **FuelEU Maritime Compliance Platform** showcasing both **frontend and backend** implementation under **Hexagonal Architecture (Ports & Adapters)**.  
It calculates route compliance, banking, and pooling logic for maritime emissions under the **FuelEU Regulation**.

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React, TypeScript, TailwindCSS, Vite |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL |
| **Architecture** | Hexagonal (Ports & Adapters) |
| **Tools** | dotenv, pg, ts-node-dev, nodemon |

---

## 📁 Folder Structure

```

frontend/
├── src/
│   ├── adapters/ui/
│   ├── adapters/infrastructure/
│   ├── core/
│   └── shared/

backend/
├── src/
│   ├── adapters/
│   │   ├── inbound/http/
│   │   └── outbound/postgres/
│   ├── core/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── db/
│   └── server/

````

---

## ⚙️ Setup Instructions

### 🧩 1. Clone Repository

```bash
git clone https://github.com/your-username/FuelEU-Maritime.git
cd FuelEU-Maritime
````

---

### 🧠 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```bash
PG_USER=postgres
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=fueleu
```

Start the server:

```bash
npm run dev
```

> Runs on: [http://localhost:4000](http://localhost:4000)

---

### 🎨 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Runs on: [http://localhost:5173](http://localhost:5173)

---

## 🔌 API Endpoints

| Method   | Endpoint                         | Description                        |
| -------- | -------------------------------- | ---------------------------------- |
| **GET**  | `/api/routes`                    | Fetch all maritime routes          |
| **POST** | `/api/routes/:id/baseline`       | Set a baseline route               |
| **GET**  | `/api/routes/comparison`         | Compare baseline with other routes |
| **GET**  | `/api/compliance/cb?shipId&year` | Compute Compliance Balance         |
| **POST** | `/api/banking/bank`              | Bank positive compliance balance   |
| **POST** | `/api/banking/apply`             | Apply banked surplus               |
| **POST** | `/api/pools`                     | Create a pooling agreement         |

---

## 🧪 Testing

Run unit and integration tests (optional):

```bash
npm run test
```

---

## 🧠 Author

**Yashika Jain**
📍 MCA Student @ MNNIT Allahabad
🔗 [LinkedIn](https://www.linkedin.com/in/yashikajain07/) | [GitHub](https://github.com/yashika532)

---

⭐ *If you like this project, don't forget to star the repo!*

```

---
