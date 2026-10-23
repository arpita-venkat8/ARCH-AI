
const {
    WebArchitectureStrategy,
    MobileArchitectureStrategy
} = require("./ArchitectureStrategy");

class ArchitectureFactory {
    static createStrategy(architectureType) {
        const type = (architectureType || "").toLowerCase();

        if (type.includes("mobile")) {
            return new MobileArchitectureStrategy();
        }

        return new WebArchitectureStrategy();
    }
}

module.exports = ArchitectureFactory;
