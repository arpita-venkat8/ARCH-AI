const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const ArchitectureService = require("./ArchitectureService");
const architectureService = new ArchitectureService();

const app = express();
const PORT = 5000;

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

        

console.log("Sending request to ArchitectureService...");

const architecture = await architectureService.generateArchitecture({
    description,
    architectureType,
    scale,
    deployment,
    requirements
});

        console.log("AI RESPONSE RECEIVED");


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