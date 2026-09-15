const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();
const PORT = 5000;

// OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Open frontend
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "ARCHI.AI API is working!"
    });
});

// Generate architecture
app.post("/api/generate", async (req, res) => {

    console.log("");
    console.log("================================");
    console.log("AI GENERATION REQUEST RECEIVED");
    console.log("================================");

    try {

        const {
            description,
            architectureType,
            scale,
            deployment,
            requirements
        } = req.body;

        console.log("Project:", description);

        if (!description || description.trim() === "") {
            return res.status(400).json({
                success: false,
                error: "Project description is required."
            });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "OpenAI API key is missing."
            });
        }

        const prompt = `
You are ARCHI.AI, an expert software architect.

Create a complete software architecture for this project.

PROJECT DESCRIPTION:
${description}

ARCHITECTURE TYPE:
${architectureType || "Not specified"}

EXPECTED SCALE:
${scale || "Not specified"}

DEPLOYMENT:
${deployment || "Not specified"}

KEY REQUIREMENTS:
${
    requirements && requirements.length > 0
        ? requirements.join(", ")
        : "Not specified"
}

Return the architecture using these sections:

1. PROJECT OVERVIEW
2. RECOMMENDED TECHNOLOGY STACK
3. FRONTEND ARCHITECTURE
4. BACKEND ARCHITECTURE
5. DATABASE DESIGN
6. API ENDPOINTS
7. AUTHENTICATION AND AUTHORIZATION
8. MAIN SERVICES / COMPONENTS
9. SYSTEM DATA FLOW
10. DEPLOYMENT ARCHITECTURE
11. SECURITY CONSIDERATIONS
12. SCALABILITY
13. FUTURE IMPROVEMENTS

Keep the explanation clear and professional.
This is for a college software project.
Explain why the recommended technologies are suitable.
`;

        console.log("Sending request to OpenAI...");

        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: prompt
        });

        console.log("AI RESPONSE RECEIVED");

        const architecture = response.output_text;

        if (!architecture) {
            return res.status(500).json({
                success: false,
                error: "AI returned an empty response."
            });
        }

        console.log(
            "Generated characters:",
            architecture.length
        );

        res.json({
            success: true,
            message: "Architecture generated successfully!",
            architecture: architecture
        });

    } catch (error) {

        console.error("");
        console.error("================================");
        console.error("OPENAI ERROR");
        console.error("================================");
        console.error(error.message);

        res.status(500).json({
            success: false,
            error: error.message || "AI generation failed."
        });
    }
});

// Start server
const server = app.listen(
    PORT,
    "127.0.0.1",
    () => {

        console.log("");
        console.log("====================================");
        console.log("🚀 ARCHI.AI BACKEND IS RUNNING");
        console.log("🌐 http://127.0.0.1:5000");
        console.log("====================================");
        console.log("");
    }
);

// Keep Node alive
process.stdin.resume();

// Server errors
server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});