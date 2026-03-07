const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outDir = path.join(__dirname, 'public');
const partialsDir = path.join(srcDir, '_partials');

const nav = fs.readFileSync(path.join(partialsDir, 'nav.html'), 'utf8');
const footer = fs.readFileSync(path.join(partialsDir, 'footer.html'), 'utf8');

function build(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('_')) continue;
        const srcPath = path.join(dir, entry.name);
        const destPath = path.join(outDir, path.relative(srcDir, srcPath));
        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            build(srcPath);
        } else if (entry.name.endsWith('.html')) {
            let html = fs.readFileSync(srcPath, 'utf8');
            html = html.replace('<!-- INCLUDE:nav -->', nav);
            html = html.replace('<!-- INCLUDE:footer -->', footer);
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.writeFileSync(destPath, html);
            console.log(`  ${path.relative(__dirname, destPath)}`);
        }
    }
}

console.log('Building...');
build(srcDir);
console.log('Done.');
