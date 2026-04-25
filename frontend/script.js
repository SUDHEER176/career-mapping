document.addEventListener('DOMContentLoaded', () => {
    const careerForm = document.getElementById('careerForm');
    const btnSubmit = careerForm.querySelector('.btn-submit');
    const resultsContainer = document.getElementById('results');

    careerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const interests = document.getElementById('interests').value;
        const background = document.getElementById('background').value;

        // Show loading state
        btnSubmit.classList.add('loading');
        btnSubmit.disabled = true;
        resultsContainer.classList.add('hidden');
        resultsContainer.innerHTML = '';

        try {
            const response = await fetch('http://localhost:8000/generate-path', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    interests: interests,
                    academic_background: background
                }),
            });

            const data = await response.json();

            if (response.ok) {
                renderResults(data.roadmap);
                resultsContainer.classList.remove('hidden');
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Error: ' + data.detail);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Mock data for demonstration if backend is not running
            console.log("Showing mock data for UI demonstration...");
            renderMockResults();
            resultsContainer.classList.remove('hidden');
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        } finally {
            btnSubmit.classList.remove('loading');
            btnSubmit.disabled = false;
        }
    });

    function renderResults(roadmapText) {
        // Try to parse if it's JSON or just render it nicely
        const formattedText = roadmapText.replace(/\n/g, '<br>');
        
        resultsContainer.innerHTML = `
            <div class="glass-card result-card">
                <h2 class="gradient-text">Your AI Career Roadmap</h2>
                <div class="result-content">
                    ${formattedText}
                </div>
                <button onclick="window.print()" class="btn-secondary" style="margin-top: 2rem; width: 100%;">Download PDF Roadmap</button>
            </div>
        `;
    }

    function renderMockResults() {
        resultsContainer.innerHTML = `
            <div class="glass-card result-card">
                <h2 class="gradient-text">Personalized AI Roadmap</h2>
                <div class="path-card">
                    <h3>1. AI Solutions Architect</h3>
                    <p>Building the bridge between business needs and technological implementation.</p>
                    <div class="tag">High Growth</div>
                </div>
                <div class="path-card">
                    <h3>2. Creative Technologist</h3>
                    <p>Blending art and code to create immersive digital experiences.</p>
                    <div class="tag">Creative Focus</div>
                </div>
                <div class="glass-card" style="background: rgba(0,242,255,0.05); margin-top:2rem;">
                    <h3>Skill Gap Analysis</h3>
                    <ul>
                        <li>Advanced Predictive Modeling (Gap)</li>
                        <li>UI/UX for AR/VR (Gap)</li>
                        <li>Cloud Infrastructure (Acquired)</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Scroll animation for reveals
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .glass-card');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
