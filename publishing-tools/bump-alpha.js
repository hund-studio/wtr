const fs = require("fs");
const packageJson = require("./../package.json");

const version = packageJson.version;
const alphaMatch = version.match(/^(\d+\.\d+\.\d+)-alpha\.(\d+)$/);

if (!alphaMatch) {
	console.error("Version is not in the expected alpha format.");
	process.exit(1);
}

const newVersion = `${alphaMatch[1]}-alpha.${parseInt(alphaMatch[2], 10) + 1}`;

packageJson.version = newVersion;

fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");

console.log(`Version bumped to ${newVersion}`);
