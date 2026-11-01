const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Pastikan folder public ada
if (!fs.existsSync('public')) fs.mkdirSync('public');

console.log('🛡️ Memulai proses penyamaran kode...');

// 1. Ambil data.js ASLI, acak, lalu simpan ke public/data.js
try {
    const dataAsli = fs.readFileSync('data.js', 'utf8');
    const dataAcak = JavaScriptObfuscator.obfuscate(dataAsli, {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal'
    }).getObfuscatedCode();
    
    fs.writeFileSync('public/data.js', dataAcak);
    console.log('✅ File public/data.js berhasil dibuat (Acak Total).');
} catch(e) { console.log('Gagal acak data.js:', e); }

// 2. Ambil index.html ASLI, acak script-nya, simpan ke public/index.html
try {
    let indexAsli = fs.readFileSync('index.html', 'utf8');
    
    // Acak semua isi <script>
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

    fs.writeFileSync('public/index.html', indexAcak);
    console.log('✅ File public/index.html berhasil dibuat (Acak Total).');
} catch(e) { console.log('Gagal acak index.html:', e); }
