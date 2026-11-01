const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const cheerio = require('cheerio');

const TARGET_DIR = 'www'; 

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

// 2. Acak & Hancurkan index.html menggunakan CHEERIO
async function prosesIndex() {
    try {
        const { minify } = await import('html-minifier-terser');
        let indexAsli = fs.readFileSync('index.html', 'utf8');
        
        const $ = cheerio.load(indexAsli);

        $('script').each((i, el) => {
            const src = $(el).attr('src');
            if (src) return;

            const isiScript = $(el).html();
            if (isiScript && isiScript.trim() !== '') {
                const acak = JavaScriptObfuscator.obfuscate(isiScript, {
                    compact: true,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    identifierNamesGenerator: 'hexadecimal'
                }).getObfuscatedCode();
                
                $(el).html(acak);
            }
        });

        let htmlAcak = $.html();

        const finalHTML = await minify(htmlAcak, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: false
        });

        fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), finalHTML);
        console.log('✅ www/index.html berhasil diacak total pakai Cheerio.');
    } catch(e) { console.log('Gagal acak index.html:', e); }
}

prosesIndex();
