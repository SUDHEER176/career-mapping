# 🚀 CareerMap AI

CareerMap AI is a next-generation, intelligent career navigation platform. Powered by **Llama-3 via Groq**, it deeply analyzes your professional DNA to synthesize high-fidelity career roadmaps, generate tailored job assets, and future-proof your trajectory against market shifts.

## ✨ Advanced AI Capabilities (Command Center)

1. **Career Pathway Synthesis**: Generates a 6-12 month roadmap tailored to your specific time commitment and target goals.
2. **Cover Letter & Resume Synthesis**: Instantly creates personalized cover letters and ATS-optimized bullet points for your target role.
3. **ATS Resume Scanner**: Paste your raw resume to get a 0-100 match score, identify missing keywords, and get instant bullet point rewrites.
4. **Mock Interview Generator**: Generates 10 tiered interview questions (behavioral, technical, system design) tailored to your exact skill level.
5. **Salary Intelligence**: Provides local market ranges, proven negotiation scripts, and red flags to watch for in offers.
6. **LinkedIn Optimizer**: Rewrites your headline and 'About' section using recruiter psychology (PSB formula).
7. **Culture Matcher**: Finds the top 10 companies that align exactly with your work style and environment preferences.
8. **Skill Decay Predictor**: Evaluates your current stack to predict which skills will be obsolete in 2 years and what to learn immediately to stay resilient.
9. **Portfolio Blueprint**: Generates 3 highly specific, compelling project ideas (with tech stacks) guaranteed to impress hiring managers.
10. **Networking Strategy**: Delivers a 30/60/90-day networking plan, cold outreach templates, and specific communities to join.

## 🛠 Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Framer Motion, Lucide React
- **Backend**: Python 3.x, FastAPI, Uvicorn
- **AI Engine**: Llama-3.3-70b-versatile (via Groq API)

## 📁 Project Structure

```text
career/
├── backend/                  # FastAPI Backend (AI Core)
│   ├── main.py               # 10 advanced Gen AI endpoints
│   ├── requirements.txt
│   └── .env                  # Add your GROQ_API_KEY here
└── frontend/                 # React UI (Cinematic Terminal)
    ├── src/
    │   ├── components/       # UI Components & Advanced Tools Dashboard
    │   ├── App.jsx           # Main Application Logic
    │   ├── index.css         # Custom Glassmorphism & Tailwind Directives
    │   └── main.jsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Quick Start Guide

### 1. Start the Backend (API)
```bash
cd backend
pip install -r requirements.txt
# Create a .env file and add your Groq API key:
# GROQ_API_KEY=gsk_your_api_key_here
python main.py
# Server runs on http://localhost:8001
```

### 2. Start the Frontend (UI)
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 🔒 Security Note
Ensure your `backend/.env` is never pushed to public repositories. This is automatically handled by the root `.gitignore`.
