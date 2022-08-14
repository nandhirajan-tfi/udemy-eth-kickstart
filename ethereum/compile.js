const path = require("path");
const solc = require("solc"); // Solidity Compiler
const fs = require("fs-extra"); // adds file system methods with fs module

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // Check if directory is exists

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"),
        output[contract]
    );
}