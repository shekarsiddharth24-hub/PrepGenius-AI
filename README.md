# 🚀 PrepGenius AI

```{=html}
<p align="center">
```
An AI-powered Interview Preparation Platform built with
`<b>`{=html}React + FastAPI + Ollama`</b>`{=html}.
```{=html}
</p>
```
## ✨ Features

-   🤖 Technical & Behavioral mock interviews
-   🧠 AI-generated interview questions and ideal answers
-   📊 Intelligent answer evaluation with semantic scoring
-   📄 Resume Analyzer with role-specific feedback
-   📈 Analytics dashboard & interview history
-   📑 PDF export for interview reports
-   🔐 JWT Authentication
-   🌙 Modern glassmorphism UI with animations

## 🛠 Tech Stack

### Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Framer Motion
-   TanStack Query
-   Axios
-   Monaco Editor

### Backend

-   FastAPI
-   SQLAlchemy 2.0
-   SQLite
-   Pydantic
-   JWT Authentication
-   ReportLab

### AI

-   Ollama
-   HuggingFace Sentence Transformers
-   all-MiniLM-L6-v2

## 🏗 Architecture

``` text
React Frontend
      │
      ▼
 FastAPI Backend
      │
      ├── Authentication
      ├── Interview Service
      ├── Resume Service
      ├── Evaluation Service
      │
      ▼
 Ollama + Embedding Model
      │
      ▼
 SQLite Database
```

## 📂 Project Structure

``` text
frontend/
backend/
README.md
```

## 🚀 Getting Started

### Backend

``` bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

``` bash
npm install
npm run dev
```

## 📸 Screenshots

Add screenshots for: - Login - Dashboard - Interview - Resume Analyzer -
History - Analytics

## 🗺 Roadmap

-   Voice Interviews
-   Live Coding Interviews
-   AI Career Coach
-   ATS Resume Checker
-   Adaptive Learning Paths

## 🤝 Contributing

Fork the repository, create a feature branch, commit your changes, and
open a Pull Request.

## 📄 License

MIT License

## 👨‍💻 Author

**Siddharth Shekar**
