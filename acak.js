const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses pengacakan aman...');

let html = fs.readFileSync('index.html', 'utf8');
let dataJs = '';
if (fs.existsSync('data.js')) {
    dataJs = fs.readFileSync('data.js', 'utf8');
}

// 1. ACAK DATA.JS
try {
    if (dataJs) {
        const result = JavaScriptObfuscator.obfuscate(dataJs, {
            compact: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            identifierNamesGenerator: 'hexadecimal'
        });
        dataJs = result.getObfuscatedCode();
        // Kita simpan juga file data.js di folder www (siapa tau butuh)
        fs.writeFileSync(path.join(targetDir, 'data.js'), dataJs);
        console.log('✅ data.js berhasil diacak.');
    }
} catch (e) {
    console.error('❌ Gagal data.js:', e.message);
    process.exit(1);
}

// 2. ACAK INDEX.HTML
try {
    if (html) {
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

        // KITA SUNTIKKAN DATA.JS KE DALAM HTML
        // Biar pas di-decode, data.js udah nempel dan nggak perlu nyari file luar
        if (dataJs) {
            html = html.replace('</body>', `<script>\n${dataJs}\n</script>\n</body>`);
        }

        const base64Html = Buffer.from(html, 'utf8').toString('base64');
        
        // Loader pakai document.write (cara awal yang tampilannya udah bener)
        const loaderHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>
  body { margin:0; padding:0; background:#000; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; }
</style>
</head>
<body>
<div id="loader"><h3>Memuat Aplikasi...</h3></div>
<script>
  try {
    var b64 = "${base64Html}";
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
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
    }
} catch (e) {
    console.error('❌ Gagal index.html:', e.message);
    process.exit(1);
}
