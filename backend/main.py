from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="CareerMap AI API (Groq Engine)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_client() -> Groq:
    load_dotenv(override=True)
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Groq API Key is missing in .env")
    return Groq(api_key=api_key)

def call_groq(system: str, user: str, max_tokens: int = 2048, temperature: float = 0.7) -> str:
    client = get_client()
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return completion.choices[0].message.content


# ─────────────────────────── MODELS ───────────────────────────

class UserProfile(BaseModel):
    interests: str
    background: str
    target_role: str
    time_commitment: str

class AssetRequest(BaseModel):
    selected_role: str
    background: str
    interests: str

class ResumeRequest(BaseModel):
    resume_text: str
    target_role: str

class InterviewRequest(BaseModel):
    target_role: str
    skill_level: str

class AnswerEvalRequest(BaseModel):
    question: str
    answer: str
    target_role: str

class SalaryRequest(BaseModel):
    target_role: str
    location: str
    experience_years: str

class LinkedInRequest(BaseModel):
    current_headline: str
    current_about: str
    target_role: str

class CultureRequest(BaseModel):
    work_style: str
    environment_preference: str
    target_role: str

class SkillDecayRequest(BaseModel):
    current_skills: str
    target_role: str

class PortfolioRequest(BaseModel):
    target_role: str
    current_skills: str
    background: str

class NetworkingRequest(BaseModel):
    target_role: str
    city: str
    background: str


# ─────────────────────────── ENDPOINTS ───────────────────────────

@app.get("/")
async def root():
    return {"message": "CareerMap AI Backend (Groq) is online", "endpoints": 10}


@app.post("/generate-path")
async def generate_career_path(profile: UserProfile):
    print(f">>> /generate-path: {profile.target_role}")
    prompt = f"""
    As an expert Career Counselor AI, analyze the following profile and provide a detailed career roadmap.

    Interests: {profile.interests}
    Academic/Professional Background: {profile.background}
    Target Career Goal: {profile.target_role}
    Available Time Commitment: {profile.time_commitment}

    Please provide:
    1. Top 3 Career Path Recommendations (with descriptions)
    2. Detailed Skill Gap Analysis for each path.
    3. Personalized Learning Recommendations.
       **CRITICAL: Provide direct links or platform names (e.g., Coursera, Udemy, YouTube, specific GitHub Repos) for each recommendation.**
    4. A step-by-step Action Roadmap for the next 6-12 months (tailored specifically to fit a {profile.time_commitment} schedule).

    Format the output in clean Markdown with clear headings and bullet points. Use bold text for emphasis.
    """
    try:
        result = call_groq("You are an elite career counseling AI.", prompt, max_tokens=2048)
        return {"roadmap": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-assets")
async def generate_assets(req: AssetRequest):
    print(f">>> /generate-assets: {req.selected_role}")
    prompt = f"""
    The user has selected the following target role: **{req.selected_role}**
    Their background: {req.background}
    Their interests: {req.interests}

    Generate the following two assets:

    ## PART 1: Custom Cover Letter
    Write a compelling, professional cover letter (3 paragraphs) for this role.
    - Opening: Hook the hiring manager with a strong, specific opening line.
    - Middle: Connect their background and interests directly to the role's requirements.
    - Closing: A confident, actionable closing with a call to action.

    ## PART 2: Resume Bullet Points
    Generate exactly 5 powerful, ATS-optimized resume bullet points the user should add to their resume to target this role.
    - Each bullet point must start with a strong action verb.
    - Each bullet point must include a quantifiable metric (e.g., "Increased X by 30%").
    - Format as a numbered list.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are an elite resume writer and career coach.", prompt, max_tokens=1500)
        return {"assets": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/scan-resume")
async def scan_resume(req: ResumeRequest):
    print(f">>> /scan-resume: {req.target_role}")
    prompt = f"""
    You are an ATS (Applicant Tracking System) and senior technical recruiter.
    Analyze the following resume for the target role: **{req.target_role}**

    RESUME TEXT:
    ---
    {req.resume_text}
    ---

    Provide:

    ## ATS Match Score
    Give a single numerical score from 0-100 representing how well this resume matches the target role. Bold the number.

    ## Missing Keywords
    List the top 10 keywords/phrases missing from this resume that ATS systems look for in a {req.target_role} role. Format as a bullet list.

    ## Rewritten Bullet Points
    Pick the 3 weakest bullet points from the resume, rewrite them to be stronger, quantified, and ATS-optimized. Show "Before" and "After" for each.

    ## Overall Assessment
    2-3 sentences summarizing the key changes needed.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are an expert ATS analyst and technical recruiter.", prompt, max_tokens=1500)
        return {"analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/mock-interview")
async def mock_interview(req: InterviewRequest):
    print(f">>> /mock-interview: {req.target_role} ({req.skill_level})")
    prompt = f"""
    Generate exactly 10 realistic, high-quality interview questions for a candidate targeting the role of **{req.target_role}** at a **{req.skill_level}** level.

    The questions must be:
    - A mix of: 3 behavioral (STAR format), 4 technical/role-specific, 2 system design or situational, 1 curveball/culture fit question.
    - Ordered from easier to harder.
    - Each question should include a brief "(Why this is asked)" note in italics.

    Format as a numbered Markdown list.
    """
    try:
        result = call_groq("You are a senior technical interviewer at a top-tier tech company.", prompt, max_tokens=1200)
        return {"questions": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/evaluate-answer")
async def evaluate_answer(req: AnswerEvalRequest):
    print(f">>> /evaluate-answer: {req.target_role}")
    prompt = f"""
    You are evaluating an interview answer for a candidate applying for: **{req.target_role}**

    INTERVIEW QUESTION:
    "{req.question}"

    CANDIDATE'S ANSWER:
    "{req.answer}"

    Provide structured feedback:

    ## Score
    Rate the answer out of 10. Bold the score.

    ## Strengths
    What did they do well? (2-3 bullet points)

    ## Weaknesses
    What was missing or weak? (2-3 bullet points)

    ## Model Answer
    Provide a concise, ideal answer to this question that they can learn from.

    ## Pro Tip
    One specific tip to instantly improve their interview performance.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are an elite interview coach at a FAANG company.", prompt, max_tokens=1000)
        return {"feedback": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/salary-intel")
async def salary_intelligence(req: SalaryRequest):
    print(f">>> /salary-intel: {req.target_role} in {req.location}")
    prompt = f"""
    You are a compensation intelligence expert with deep knowledge of global tech salaries.

    Target Role: **{req.target_role}**
    Location: **{req.location}**
    Experience: **{req.experience_years} years**

    Provide:

    ## Salary Range Intelligence
    Provide realistic salary ranges (in local currency and USD equivalent) at 3 levels:
    - Junior (0-2 years): Range + Median
    - Mid-Level (3-5 years): Range + Median
    - Senior (6+ years): Range + Median
    Also mention total compensation (base + equity + bonus) for each level.

    ## Negotiation Scripts
    Give 3 exact word-for-word scripts the candidate can use:
    1. When asked "What are your salary expectations?"
    2. When receiving an offer below expectations
    3. When negotiating equity/benefits beyond base salary

    ## Red Flags in Job Offers
    List 5 specific red flags to watch for in offer letters for this role.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are a compensation and negotiation intelligence expert.", prompt, max_tokens=1500)
        return {"intel": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/optimize-linkedin")
async def optimize_linkedin(req: LinkedInRequest):
    print(f">>> /optimize-linkedin: {req.target_role}")
    prompt = f"""
    You are a LinkedIn profile optimization expert who helps professionals attract recruiters.

    Target Role: **{req.target_role}**

    CURRENT HEADLINE:
    "{req.current_headline}"

    CURRENT ABOUT SECTION:
    "{req.current_about}"

    Provide:

    ## Optimized Headline (3 Versions)
    Write 3 alternative headlines optimized for recruiter search algorithms. Each should be under 220 characters.
    Explain the strategy behind each.

    ## Rewritten "About" Section
    Rewrite the About section using the PSB formula (Problem → Solution → Benefit).
    - Must be 2,000 characters or less.
    - Start with a powerful hook (not "I am...").
    - Include relevant keywords for {req.target_role}.
    - End with a clear call to action.

    ## Keywords to Add
    List 10 keywords missing from their profile that recruiters search for when hiring {req.target_role}s.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are a LinkedIn optimization expert and personal branding coach.", prompt, max_tokens=1500)
        return {"optimized": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/culture-match")
async def culture_match(req: CultureRequest):
    print(f">>> /culture-match: {req.target_role}")
    prompt = f"""
    You are a company culture intelligence analyst.

    Target Role: **{req.target_role}**
    Work Style Preference: **{req.work_style}** (e.g., remote/hybrid/onsite)
    Environment Preference: **{req.environment_preference}** (e.g., startup/enterprise/flat hierarchy)

    Provide:

    ## Top 10 Matching Companies
    List 10 specific, real companies (with their website) that match these preferences for a {req.target_role} role.
    For each company, explain in 1-2 sentences WHY it's a match based on their culture.

    ## Application Message Hooks
    For the top 3 companies, write a customized 2-sentence hook the candidate can use in their cover letter that aligns with each company's specific culture.

    ## Culture Red Flags
    List 5 questions the candidate should ask in interviews to detect whether a company's stated culture matches reality.

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are a company culture and talent intelligence analyst.", prompt, max_tokens=1500)
        return {"matches": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/skill-decay")
async def skill_decay(req: SkillDecayRequest):
    print(f">>> /skill-decay: {req.target_role}")
    prompt = f"""
    You are an AI labor market analyst with expertise in technology trends and automation risk.

    Current Skills: {req.current_skills}
    Target Role: **{req.target_role}**

    Provide:

    ## Skills at Risk of Obsolescence (Next 2 Years)
    From their current skill set, identify which specific skills are being automated or commoditized by AI.
    For each at-risk skill, explain WHY and WHEN it will decline.

    ## Emerging Skills to Acquire NOW
    List 7 emerging skills/technologies they must learn immediately to stay ahead.
    For each, include: (a) Why it's growing, (b) One resource to learn it fast.

    ## Career Resilience Score
    Give a score from 1-100 representing how "future-proof" their current skill set is.
    Bold the score. Provide a 2-sentence explanation.

    ## The 90-Day Upskilling Sprint
    A concrete 90-day plan to go from "at-risk" to "future-proof".

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are a future-of-work AI analyst and career strategist.", prompt, max_tokens=1500)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/portfolio-blueprint")
async def portfolio_blueprint(req: PortfolioRequest):
    print(f">>> /portfolio-blueprint: {req.target_role}")
    prompt = f"""
    You are a senior engineering mentor and portfolio design expert.

    Target Role: **{req.target_role}**
    Current Skills: {req.current_skills}
    Background: {req.background}

    Generate exactly 3 portfolio project blueprints that will maximize the candidate's chances of getting hired.

    For EACH project provide:
    1. **Project Name & Concept**: A compelling, specific project idea (not a generic to-do app).
    2. **Problem It Solves**: The real-world problem this project demonstrates you can solve.
    3. **Tech Stack**: Exact technologies to use (be specific, e.g., "Next.js 14, Supabase, OpenAI API").
    4. **GitHub Structure**: Key folders and files to include in the repo.
    5. **README Template**: A short, recruiter-ready README outline.
    6. **How to Present It**: Exact talking points to use when discussing it in interviews.
    7. **Difficulty Level**: Beginner / Intermediate / Advanced

    Use clean Markdown formatting with clear headings for each project.
    """
    try:
        result = call_groq("You are a senior software engineering mentor and portfolio strategist.", prompt, max_tokens=2000)
        return {"blueprint": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/networking-strategy")
async def networking_strategy(req: NetworkingRequest):
    print(f">>> /networking-strategy: {req.target_role} in {req.city}")
    prompt = f"""
    You are a professional networking strategist and career coach.

    Target Role: **{req.target_role}**
    Location: **{req.city}**
    Background: {req.background}

    Provide:

    ## Communities & Events to Join
    List 8 specific communities (Discord servers, Slack groups, Meetup groups, Subreddits, LinkedIn groups) relevant to {req.target_role} professionals in or near {req.city}.
    Include the platform and how to find/join each.

    ## Cold Outreach Message Template
    Write a 3-sentence LinkedIn cold outreach message template to send to recruiters hiring for {req.target_role} roles.
    It should feel human, not spammy. Include [PLACEHOLDER] for personalization spots.

    ## 30 / 60 / 90 Day Networking Game Plan
    - **Days 1-30**: Foundation phase (who to connect with, what profiles to optimize)
    - **Days 31-60**: Active outreach phase (how many messages to send, what events to attend)
    - **Days 61-90**: Conversion phase (following up, coffee chats, referrals)

    Use clean Markdown formatting.
    """
    try:
        result = call_groq("You are a professional networking and career growth strategist.", prompt, max_tokens=1500)
        return {"strategy": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
