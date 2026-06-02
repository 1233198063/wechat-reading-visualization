/**
 * 微信读书可视化 - 本地代理服务器
 * 运行: node server.js
 * 然后打开: http://localhost:3000
 */
// 绕过本机 SSL 证书链不完整的问题（仅本地代理使用，不影响安全性）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const WEREAD_GATEWAY = 'https://i.weread.qq.com/api/agent/gateway';

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);

  // CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  // Serve static files
  if (req.method === 'GET') {
    let filePath = path.join(__dirname, parsed.pathname === '/' ? 'index.html' : parsed.pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      const ext = path.extname(filePath);
      const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' }[ext] || 'text/plain';
      res.writeHead(200, { 'Content-Type': mime + ';charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Proxy POST /api → WeChat gateway
  if (req.method === 'POST' && parsed.pathname === '/api') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const auth = req.headers['authorization'] || '';
      const gwUrl = new URL(WEREAD_GATEWAY);

      const options = {
        hostname: gwUrl.hostname,
        path: gwUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'WeReadViz/1.0'
        }
      };

      const proxyReq = https.request(options, proxyRes => {
        let data = '';
        proxyRes.on('data', chunk => data += chunk);
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(data);
        });
      });

      proxyReq.on('error', err => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errcode: -1, errmsg: err.message }));
      });

      proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✅ 微信读书可视化服务已启动`);
  console.log(`   打开浏览器访问: http://localhost:${PORT}\n`);
});
