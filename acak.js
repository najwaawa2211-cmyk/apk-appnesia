const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

console.log('Memulai proses obfuscation...');

// 1. Acak data.js
try {
    const data = fs.readFileSync('data.js', 'utf8');
    const result = JavaScriptObfuscator.obfuscate(data, {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    });
    fs.writeFileSync(path.join(targetDir, 'data.js'), result.getObfuscatedCode());
    console.log('✅ data.js berhasil diacak.');
} catch (e) {
    console.error('❌ Gagal mengacak data.js:', e.message);
    process.exit(1); 
}

// 2. Acak index.html
try {
    let html = fs.readFileSync('index.html', 'utf8');
    html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
        if (!code.trim()) return match;
        try {
            const res = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal',
                controlFlowFlattening: false,
                deadCodeInjection: false
            });
            return `<script>${res.getObfuscatedCode()}</script>`;
        } catch (err) {
            return match;
        }
    });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    console.log('✅ index.html berhasil diacak.');
} catch (e) {
    console.error('❌ Gagal membaca index.html:', e.message);
    process.exit(1);
  }
