const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
const assetsDir = path.join(targetDir, 'assets');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

console.log('Memulai Penyamaran Tingkat Dewa...');

// 1. ACAK DATA.JS
let dataJsCode = '';
if (fs.existsSync('data.js')) {
    const data = fs.readFileSync('data.js', 'utf8');
    const result = JavaScriptObfuscator.obfuscate(data, {
        compact: true, stringArray: true, stringArrayEncoding: ['base64'], identifierNamesGenerator: 'hexadecimal'
    });
    dataJsCode = result.getObfuscatedCode();
}

// 2. PROSES HTML
if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');

    // Acak JS
    html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
        if (!code.trim()) return match;
        try {
            const res = JavaScriptObfuscator.obfuscate(code, {
                compact: true, stringArray: true, stringArrayEncoding: ['base64'], identifierNamesGenerator: 'hexadecimal'
            });
            return `<script>${res.getObfuscatedCode()}</script>`;
        } catch (err) { return match; }
    });

    // Suntik data.js
    if (dataJsCode) html = html.replace('</body>', `<script>\n${dataJsCode}\n</script>\n</body>`);

    const base64Html = Buffer.from(html, 'utf8').toString('base64');
    
    // 🔥 PENYAMARAN: Kita simpan di folder 'assets' dengan nama '.app.js'
    // File titik di depan biasanya disembunyikan oleh sistem.
    fs.writeFileSync(path.join(assetsDir, '.app.js'), base64Html);
    console.log('✅ Kode disamarkan jadi: assets/.app.js');
}

// 3. BUAT INDEX.HTML PALSU
const fakeIndex = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>body { margin:0; padding:0; background:#000; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; }</style>
</head>
<body>
<div id="root"><h3>Memuat Aplikasi...</h3></div>
<script>
  // Ambil file samaran
  fetch('./assets/.app.js')
    .then(res => res.text())
    .then(b64 => {
        if(!b64 || b64.trim() === '') throw new Error("File kosong/gagal dimuat");
        var binary = atob(b64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        var decodedHtml = new TextDecoder('utf-8').decode(bytes);
        
        document.open();
        document.write(decodedHtml);
        document.close();
    })
    .catch(e => {
        document.getElementById('root').innerHTML = "<h2 style='color:red;'>Gagal: " + e.message + "</h2>";
    });
</script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), fakeIndex);
console.log('✅ Selesai! Index asli LENYAP.');
