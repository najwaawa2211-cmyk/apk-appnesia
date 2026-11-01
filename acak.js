const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const TARGET_DIR = 'www'; // Sesuaikan dengan web-dir di workflow kamu

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

// 2. Acak index.html
try {
    let indexAsli = fs.readFileSync('index.html', 'utf8');
    
    const indexAcak = indexAsli.replace(/<script>([\s\S]*?)<\/script>/g, (match, isiScript) => {
        if (isiScript.trim() === '' || isiScript.includes('src=')) return match; 
        
        const acak = JavaScriptObfuscator.obfuscate(isiScript, {
            compact: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            identifierNamesGenerator: 'hexadecimal'
        }).getObfuscatedCode();
        
        return `<script>${acak}</script>`;
    });

    fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), indexAcak);
    console.log('✅ www/index.html berhasil dibuat (Acak).');
} catch(e) { console.log('Gagal acak index.html:', e); }
