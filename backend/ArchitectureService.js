
const ArchitectureFactory = require("./patterns/ArchitectureFactory");

class ArchitectureService {
    async generateArchitecture({
        description,
        architectureType,
        scale,
        deployment,
        requirements
    }) {
        const strategy = ArchitectureFactory.createStrategy(
            architectureType
        );

        const instructions = strategy.generate(description, {
            scale,
            deployment
        });

        return `
ARCHI.AI - SOFTWARE ARCHITECTURE

1. PROJECT OVERVIEW
Project: ${description}

2. RECOMMENDED TECHNOLOGY STACK
Frontend: HTML, CSS, JavaScript
Backend: Node.js and Express
Database: Choose SQLite for a small project or PostgreSQL for a larger project.

3. FRONTEND ARCHITECTURE
Create reusable UI components and validate user inputs.

4. BACKEND ARCHITECTURE
Use Express routes to handle requests and a service layer for business logic.

5. DATABASE DESIGN
Design tables based on the project's data and relationships.

6. API ENDPOINTS
GET /api/test - Check backend status
POST /api/generate - Generate architecture

7. AUTHENTICATION AND AUTHORIZATION
Use secure authentication and role-based access where required.

8. MAIN SERVICES / COMPONENTS
Separate frontend, API routes, services, and data storage.

9. SYSTEM DATA FLOW
User -> Frontend -> Backend -> ArchitectureService -> Architecture output.

10. DEPLOYMENT ARCHITECTURE
Deploy the frontend and backend to a suitable hosting platform.

11. SECURITY CONSIDERATIONS
Validate inputs, protect secrets, and use HTTPS in production.

12. SCALABILITY
Add caching, database indexing, and load balancing when needed.

13. FUTURE IMPROVEMENTS
Add real AI integration, automated tests, and monitoring.

ARCHITECTURE TYPE: ${architectureType || "Not specified"}
EXPECTED SCALE: ${scale || "Not specified"}
DEPLOYMENT: ${deployment || "Not specified"}
REQUIREMENTS: ${
            requirements && requirements.length
                ? requirements.join(", ")
                : "Not specified"
        }

GENERATION STRATEGY:
${instructions}

NOTE: This is sample-generated output. No AI API was called.
`;
    }
}

module.exports = ArchitectureService;
