const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const HTMLMinifier = require('html-minifier-terser');

const TARGET_DIR = 'www'; 

console.log('🛡️ Memulai proses Obfuscation & Minify...');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR);

// 1. Acak data.js (Sama kayak sebelumnya)
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
async function prosesIndex() {
    try {
        let indexAsli = fs.readFileSync('index.html', 'utf8');
        
        // Regex lebih pintar: nangkep <script> atau <script type="...">
        const indexAcak = indexAsli.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, isiScript) => {
            // Kalau script cuma manggil file luar (src="data.js"), biarin aja
            if (match.includes('src=')) return match; 
            if (isiScript.trim() === '') return match;
            
            // Acak isi scriptnya
            const acak = JavaScriptObfuscator.obfuscate(isiScript, {
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal'
            }).getObfuscatedCode();
            
            return `<script>${acak}</script>`;
        });

        // Minify HTML: Hapus spasi, enter, dan komentar biar jadi 1 baris
        const finalHTML = await HTMLMinifier.minify(indexAcak, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: false // JS udah diacak sama javascript-obfuscator
        });

        fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), finalHTML);
        console.log('✅ www/index.html berhasil diacak & di-minify jadi 1 baris.');
    } catch(e) { console.log('Gagal acak index.html:', e); }
}

prosesIndex();
