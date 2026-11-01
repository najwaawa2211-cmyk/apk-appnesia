const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const TARGET_DIR = 'www'; 

console.log('🛡️ Memulai proses Obfuscation...');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR);

// 1. Acak data.js
try {
    const dataAsli = fs.readFileSync('data.js', 'utf8');
    const dataAcak = JavaScriptObfuscator.obfuscate(dataAsli, {
        compact: true,
        controlFlowFlattening: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    }).getObfuscatedCode();
    
    fs.writeFileSync(path.join(TARGET_DIR, 'data.js'), dataAcak);
    console.log('✅ www/data.js berhasil dibuat (Acak).');
} catch(e) { console.log('Gagal acak data.js:', e); }

// 2. Acak index.html (Tanpa library tambahan, pakai Regex Super Aman)
try {
    let indexAsli = fs.readFileSync('index.html', 'utf8');
    
    // Mencari tag <script> yang TIDAK punya atribut src="..."
    const regexScript = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
    
    let indexAcak = indexAsli.replace(regexScript, (match, isiScript) => {
        if (isiScript.trim() === '') return match;
        
        try {
            const acak = JavaScriptObfuscator.obfuscate(isiScript, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal'
            }).getObfuscatedCode();
            
            return `<script>${acak}</script>`;
        } catch(err) {
            return match;
        }
    });

    fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), indexAcak);
    console.log('✅ www/index.html berhasil diacak.');
} catch(e) { console.log('Gagal acak index.html:', e); }
