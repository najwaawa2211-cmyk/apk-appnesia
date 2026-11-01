const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const TARGET_DIR = 'www';

async function main() {
    console.log('🛡️ Memulai proses Obfuscation & Minify...');

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

    // 2. Acak & Hancurkan index.html
    try {
        // Menggunakan import() dinamis karena html-minifier-terser adalah ESM
        const { minify } = await import('html-minifier-terser');

        let indexAsli = fs.readFileSync('index.html', 'utf8');
        
        const indexAcak = indexAsli.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, isiScript) => {
            if (match.includes('src=')) return match; 
            if (isiScript.trim() === '') return match;
            
            const acak = JavaScriptObfuscator.obfuscate(isiScript, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal'
            }).getObfuscatedCode();
            
            return `<script>${acak}</script>`;
        });

        const finalHTML = await minify(indexAcak, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: false
        });

        fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), finalHTML);
        console.log('✅ www/index.html berhasil diacak & di-minify jadi 1 baris.');
    } catch(e) { console.log('Gagal acak index.html:', e); }
}

main();
