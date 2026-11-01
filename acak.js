const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

console.log('Menghilangkan file asli dan menyamarkan...');

// 1. Acak data.js
let dataJsObfuscated = '';
if (fs.existsSync('data.js')) {
    const data = fs.readFileSync('data.js', 'utf8');
    const result = JavaScriptObfuscator.obfuscate(data, {
        compact: true, stringArray: true, stringArrayEncoding: ['base64'], identifierNamesGenerator: 'hexadecimal'
    });
    dataJsObfuscated = result.getObfuscatedCode();
}

// 2. Proses index.html
if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');

    // Acak JS di dalam HTML
    html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
        if (!code.trim()) return match;
        try {
            const res = JavaScriptObfuscator.obfuscate(code, {
                compact: true, stringArray: true, stringArrayEncoding: ['base64'], identifierNamesGenerator: 'hexadecimal'
            });
            return `<script>${res.getObfuscatedCode()}</script>`;
        } catch (err) { return match; }
    });

    // Suntik data.js ke dalam HTML
    if (dataJsObfuscated) html = html.replace('</body>', `<script>\n${dataJsObfuscated}\n</script>\n</body>`);

    // Ubah seluruh HTML jadi Base64
    const base64Html = Buffer.from(html, 'utf8').toString('base64');

    // 🔥 TRIK: Simpan Base64 ini ke dalam file JS biasa bernama 'chunk-vendor.js'
    // WebView mengizinkan file .js untuk dibaca, jadi gak bakal error.
    const chunkJs = `window.__APP_DATA__ = "${base64Html}";`;
    
    fs.writeFileSync(path.join(targetDir, 'chunk-vendor.js'), chunkJs);
    console.log('✅ index.html dan data.js LENYAP, diganti jadi chunk-vendor.js');
}

// 3. Buat index.html palsu yang bersih
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

<!-- Panggil file JS penyamar -->
<script src="chunk-vendor.js"></script>

<script>
  // Tunggu file JS selesai dimuat, lalu bongkar isinya
  window.addEventListener('load', function() {
      try {
          if(!window.__APP_DATA__) throw new Error("Data tidak ditemukan");
          
          var b64 = window.__APP_DATA__;
          var binary = atob(b64);
          var bytes = new Uint8Array(binary.length);
          for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          var decodedHtml = new TextDecoder('utf-8').decode(bytes);
          
          document.open();
          document.write(decodedHtml);
          document.close();
      } catch (e) {
          document.getElementById('root').innerHTML = "<h2 style='color:red;'>Gagal: " + e.message + "</h2>";
      }
  });
</script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), fakeIndex);
console.log('✅ Selesai!');
