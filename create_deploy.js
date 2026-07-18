const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = __dirname;
const deployDir = path.join(sourceDir, 'indisearch_deploy');

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir);
fs.mkdirSync(path.join(deployDir, 'backend'));
fs.mkdirSync(path.join(deployDir, 'frontend'));

// Copy backend
const backendSource = path.join(sourceDir, 'backend');
const backendDest = path.join(deployDir, 'backend');

function copyFolderSync(from, to, exclude) {
    if (!fs.existsSync(to)) fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (exclude && exclude.includes(element)) return;
        const stat = fs.lstatSync(path.join(from, element));
        if (stat.isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else if (stat.isDirectory()) {
            copyFolderSync(path.join(from, element), path.join(to, element), exclude);
        }
    });
}

copyFolderSync(backendSource, backendDest, ['node_modules', '.env']);

// Copy frontend dist
const distSource = path.join(sourceDir, 'frontend', 'dist');
const distDest = path.join(deployDir, 'frontend', 'dist');
copyFolderSync(distSource, distDest);

console.log('Deploy folder created successfully!');
