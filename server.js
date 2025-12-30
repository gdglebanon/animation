const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const DIR = __dirname;

// MIME types
const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.JPG': 'image/jpeg'
};

// Parse multipart form data (for image uploads)
function parseMultipart(buffer, boundary) {
    const parts = [];
    const boundaryBuffer = Buffer.from('--' + boundary);
    let start = buffer.indexOf(boundaryBuffer) + boundaryBuffer.length + 2;

    while (true) {
        const end = buffer.indexOf(boundaryBuffer, start);
        if (end === -1) break;

        const part = buffer.slice(start, end - 2);
        const headerEnd = part.indexOf('\r\n\r\n');
        const headers = part.slice(0, headerEnd).toString();
        const content = part.slice(headerEnd + 4);

        const nameMatch = headers.match(/name="([^"]+)"/);
        const filenameMatch = headers.match(/filename="([^"]+)"/);

        if (nameMatch) {
            parts.push({
                name: nameMatch[1],
                filename: filenameMatch ? filenameMatch[1] : null,
                data: filenameMatch ? content : content.toString()
            });
        }

        start = end + boundaryBuffer.length + 2;
    }
    return parts;
}

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API: Save events data
    if (req.method === 'POST' && req.url === '/api/save') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { eventsData } = JSON.parse(body);

                // Read current script.js
                const scriptPath = path.join(DIR, 'script.js');
                let script = fs.readFileSync(scriptPath, 'utf8');

                // Generate new eventsData code
                const eventsCode = `const eventsData = ${JSON.stringify(eventsData, null, 4)
                    .replace(/"color":\s*"#4285F4"/g, '"color": COLORS.BLUE')
                    .replace(/"color":\s*"#EA4335"/g, '"color": COLORS.RED')
                    .replace(/"color":\s*"#FBBC05"/g, '"color": COLORS.YELLOW')
                    .replace(/"color":\s*"#34A853"/g, '"color": COLORS.GREEN')
                };`;

                // Replace eventsData in script
                script = script.replace(
                    /const eventsData = \[[\s\S]*?\n\];/,
                    eventsCode
                );

                fs.writeFileSync(scriptPath, script);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // API: Upload image
    if (req.method === 'POST' && req.url === '/api/upload') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            try {
                const buffer = Buffer.concat(chunks);
                const boundary = req.headers['content-type'].split('boundary=')[1];
                const parts = parseMultipart(buffer, boundary);

                const filePart = parts.find(p => p.filename);
                if (!filePart) throw new Error('No file uploaded');

                // Clean filename
                let filename = filePart.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
                const filePath = path.join(DIR, filename);

                // Save file
                fs.writeFileSync(filePath, filePart.data);

                // Compress with Python if available
                try {
                    execSync(`python3 -c "
from PIL import Image
import os
f = '${filePath}'
img = Image.open(f)
if img.mode in ('RGBA', 'P'): img = img.convert('RGB')
ratio = min(800/img.width, 800/img.height)
if ratio < 1: img = img.resize((int(img.width*ratio), int(img.height*ratio)), Image.LANCZOS)
img.save(f, 'JPEG', quality=75, optimize=True)
print('compressed')
"`, { stdio: 'pipe' });
                } catch (e) {
                    // Python not available, keep original
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, filename }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // API: Get current events data
    if (req.method === 'GET' && req.url === '/api/events') {
        try {
            const scriptPath = path.join(DIR, 'script.js');
            const script = fs.readFileSync(scriptPath, 'utf8');

            // Extract eventsData
            const match = script.match(/const eventsData = (\[[\s\S]*?\n\]);/);
            if (match) {
                // Convert COLORS.X to actual hex values for JSON
                let eventsStr = match[1]
                    .replace(/COLORS\.BLUE/g, '"#4285F4"')
                    .replace(/COLORS\.RED/g, '"#EA4335"')
                    .replace(/COLORS\.YELLOW/g, '"#FBBC05"')
                    .replace(/COLORS\.GREEN/g, '"#34A853"');

                // Remove trailing commas and rotate properties for valid JSON
                eventsStr = eventsStr
                    .replace(/,(\s*[}\]])/g, '$1')
                    .replace(/rotate:\s*-?\d+,?\s*/g, '');

                const eventsData = eval(eventsStr);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(eventsData));
            } else {
                throw new Error('Could not parse eventsData');
            }
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // Serve static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(DIR, decodeURIComponent(filePath));

    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║  GDG Year in Review - Editor Server        ║
╠════════════════════════════════════════════╣
║                                            ║
║  Editor:  http://localhost:${PORT}/editor.html  ║
║  Preview: http://localhost:${PORT}/            ║
║                                            ║
║  Press Ctrl+C to stop                      ║
╚════════════════════════════════════════════╝
`);
});
