const fs = require('fs');
const path = require('path');
const stripComments = require('strip-comments');

const dirs = ['frontend/src', 'backend', 'bharat-drive/src'];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== 'build' && file !== 'public') {
                processDir(fullPath);
            }
        } else {
            const ext = path.extname(fullPath);
            if (['.js', '.jsx', '.ts', '.tsx', '.css'].includes(ext)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                try {
                    let stripped = stripComments(content);
                    if (content !== stripped) {
                        fs.writeFileSync(fullPath, stripped, 'utf8');
                        console.log('Stripped comments from: ' + fullPath);
                    }
                } catch (e) {
                    console.error('Error processing: ' + fullPath, e);
                }
            }
        }
    }
}

dirs.forEach(d => processDir(path.join(__dirname, d)));
