const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const targetDir = 'www';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Memulai proses pengacakan aman...');

// ============================================================
// 1. ACAK DATA.JS
// ============================================================
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

// ============================================================
// 2. ACAK INDEX.HTML
// ============================================================
try {
    if (!fs.existsSync('index.html')) {
        console.error('❌ File index.html tidak ditemukan!');
        process.exit(1);
    }

    let html = fs.readFileSync('index.html', 'utf8');

    // --- Obfuscate script internal (inline) ---
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

    // --- Encode HTML ke base64 ---
    const base64Html = Buffer.from(html, 'utf8').toString('base64');

    // --- Loader yang TIDAK bikin lag ---
    //  * base64 dipecah per 4KB agar parser JS tidak berat
    //  * decode pakai loop charCode (bukan split/map/join)
    //  * pakai iframe srcdoc sebagai ganti document.write
    //  * ada loading indicator
    const CHUNK_SIZE = 4096;
    const chunks = [];
    for (let i = 0; i < base64Html.length; i += CHUNK_SIZE) {
        chunks.push(base64Html.slice(i, i + CHUNK_SIZE));
    }
    // Susun sebagai array string literal, di-join saat runtime
    const base64ArrayLiteral = chunks
        .map(c => JSON.stringify(c))
        .join(',\n    ');

    const loaderHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appnesia</title>
<style>
  html,body{margin:0;padding:0;height:100%;background:#000;overflow:hidden}
  #splash{
    position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
    flex-direction:column;gap:14px;background:#000;color:#fff;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;z-index:10
  }
  .spinner{
    width:42px;height:42px;border-radius:50%;
    border:3px solid rgba(255,255,255,.15);
    border-top-color:#ff6b35;
    animation:spin .8s linear infinite
  }
  @keyframes spin{to{transform:rotate(360deg)}}
  .msg{font-size:13px;color:#888}
  .err{color:#ff6b6b;font-size:14px;padding:0 24px;text-align:center;line-height:1.5;word-break:break-word}
  iframe#app{position:fixed;inset:0;width:100%;height:100%;border:0;display:block}
</style>
</head>
<body>
<div id="splash">
  <div class="spinner"></div>
  <div class="msg">Memuat aplikasi…</div>
</div>

<script>
(function(){
  'use strict';

  // Base64 dipecah per chunk agar parser tidak berat
  var B64_CHUNKS = [
    ${base64ArrayLiteral}
  ];

  function showError(msg){
    var s = document.getElementById('splash');
    if (!s) return;
    s.innerHTML = '<div class="err"></div>';
    s.querySelector('.err').textContent = 'Gagal memuat aplikasi: ' + msg;
  }

  // Decode base64 -> UTF-8 string, tanpa split/map/join
  function b64ToUtf8(b64){
    var bin = atob(b64);
    var len = bin.length;
    var pct = new Array(len);
    for (var i = 0; i < len; i++){
      var h = bin.charCodeAt(i).toString(16);
      pct[i] = '%' + (h.length < 2 ? '0' + h : h);
    }
    return decodeURIComponent(pct.join(''));
  }

  function boot(){
    try {
      var b64 = B64_CHUNKS.join('');
      var decoded = b64ToUtf8(b64);

      // Pakai iframe srcdoc — lebih aman & tidak freeze dibanding document.write
      var iframe = document.createElement('iframe');
      iframe.id = 'app';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals');
      iframe.srcdoc = decoded;

      iframe.onload = function(){
        // Hapus splash setelah iframe benar-benar load
        var s = document.getElementById('splash');
        if (s && s.parentNode) s.parentNode.removeChild(s);
      };

      document.body.appendChild(iframe);
    } catch (e){
      showError(e && e.message ? e.message : String(e));
    }
  }

  // Tunda sedikit agar splash tampil dulu, baru decode
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      setTimeout(boot, 30);
    });
  } else {
    setTimeout(boot, 30);
  }
})();
</script>
</body>
</html>`;

    fs.writeFileSync(path.join(targetDir, 'index.html'), loaderHtml);
    console.log('✅ index.html berhasil dienkripsi total dengan aman!');
} catch (e) {
    console.error('❌ Gagal index.html:', e.message);
    process.exit(1);
            }
