
class ArchitectureStrategy {
    generate(description, options) {
        throw new Error("generate() must be implemented");
    }
}

class WebArchitectureStrategy extends ArchitectureStrategy {
    generate(description, options) {
        return `
Design a web application architecture.

Project: ${description}
Scale: ${options.scale || "Not specified"}
Deployment: ${options.deployment || "Not specified"}

Include frontend, backend, database, APIs, security,
and deployment recommendations.
`;
    }
}

class MobileArchitectureStrategy extends ArchitectureStrategy {
    generate(description, options) {
        return `
Design a mobile application architecture.

Project: ${description}
Scale: ${options.scale || "Not specified"}
Deployment: ${options.deployment || "Not specified"}

Include mobile client, backend services, database,
authentication, API communication, and security.
`;
    }
}

module.exports = {
    ArchitectureStrategy,
    WebArchitectureStrategy,
    MobileArchitectureStrategy
};
