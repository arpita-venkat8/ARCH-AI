
const ArchitectureFactory = require("./patterns/ArchitectureFactory");
const { GoogleGenAI } = require("@google/genai");

class ArchitectureService {
    constructor() {
        this.ai = null;
    }

    async generateArchitecture({
        description,
        architectureType,
        scale,
        deployment,
        requirements
    }) {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "Gemini API key is missing. Add GEMINI_API_KEY to backend/.env."
            );
        }

        if (!this.ai) {
            this.ai = new GoogleGenAI({ apiKey });
        }

        const strategy = ArchitectureFactory.createStrategy(
            architectureType
        );

        const instructions = strategy.generate(description, {
            scale,
            deployment
        });

        const prompt = `
You are ARCHI.AI, a software architecture design assistant.

Create a detailed, project-specific software architecture report.
Use Markdown headings and clear explanations.

PROJECT DESCRIPTION:
${description}

ARCHITECTURE TYPE:
${architectureType || "Web"}

EXPECTED SCALE:
${scale || "Medium"}

DEPLOYMENT:
${deployment || "Cloud"}

ADDITIONAL REQUIREMENTS:
${requirements && requirements.length
    ? requirements.join(", ")
    : "No additional requirements specified."}

DESIGN STRATEGY:
${instructions}

Include these sections:
1. Project Overview
2. Recommended Technology Stack, with reasons
3. Frontend Architecture
4. Backend Architecture
5. Database Design, including suggested entities or tables
6. API Endpoints, with methods and purposes
7. Authentication and Authorization
8. Main Services and Components
9. System Data Flow
10. Deployment Architecture
11. Security Considerations
12. Scalability and Performance
13. Design Patterns Used
14. Future Improvements

Make every section relevant to the actual project.
Explain important component responsibilities and how they interact.
Do not claim that code has been implemented or tested.
If a detail is unknown, state a reasonable assumption instead of
presenting it as a confirmed fact.
`;

        const response = await this.ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt
        });

        const architecture = response.text;

        if (!architecture || !architecture.trim()) {
            throw new Error(
                "Gemini returned an empty response. Please try again."
            );
        }

        return architecture.trim();
    }
}

module.exports = ArchitectureService;
