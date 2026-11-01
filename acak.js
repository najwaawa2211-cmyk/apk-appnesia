const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses pengacakan aman...');

// 1. ACAK DATA.JS
try {
    if (fs.existsSync('data.js')) {
        const data = fs.readFileSync('data.js', 'utf8');
        const result = JavaScriptObfuscator.obfuscate(data, {
            compact: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            identifierNamesGenerator: 'hexadecimal'
        });
        fs.writeFileSync(path.join(targetDir, 'data.js'), result.getObfuscatedCode());
        console.log('✅ data.js berhasil diacak.');
    }
} catch (e) {
    console.error('❌ Gagal data.js:', e.message);
    process.exit(1);
}

// 2. ACAK INDEX.HTML (Base64 Aman untuk WebView Android)
try {
    if (fs.existsSync('index.html')) {
        let html = fs.readFileSync('index.html', 'utf8');

        // Acak script internal
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

        // Ubah ke Base64
        const base64Html = Buffer.from(html, 'utf8').toString('base64');
        
        // Pecah jadi beberapa bagian biar ringan
        const CHUNK_SIZE = 8192;
        let chunks = [];
        for (let i = 0; i < base64Html.length; i += CHUNK_SIZE) {
            chunks.push(`"${base64Html.slice(i, i + CHUNK_SIZE)}"`);
        }

        // Loader
        const loaderHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>
  body { margin:0; padding:0; background:#000; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; }
  #loader { text-align:center; }
</style>
</head>
<body>
<div id="loader">
  <h3>Memuat Aplikasi...</h3>
</div>
<script>
  try {
    var b64 = [
      ${chunks.join(',')}
    ].join('');

    var binary = atob(b64);
    var len = binary.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    
    var decodedHtml = new TextDecoder('utf-8').decode(bytes);

    document.open();
    document.write(decodedHtml);
    document.close();
  } catch (e) {
    document.body.innerHTML = "<h2 style='color:red;text-align:center;'>Gagal memuat: " + e.message + "</h2>";
  }
</script>
</body>
</html>`;

        fs.writeFileSync(path.join(targetDir, 'index.html'), loaderHtml);
        console.log('✅ index.html berhasil dienkripsi total dengan aman!');
    } else {
        console.error('❌ File index.html tidak ditemukan!');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Gagal index.html:', e.message);
    process.exit(1);
                    }
