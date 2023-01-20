//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//        𝐀𝐮𝐭𝐡𝐨𝐫'𝐬 𝐂𝐨𝐩𝐲𝐫𝐢𝐠𝐡𝐭 𝐈𝐬
//    𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐒𝐚𝐡𝐫𝐮𝐥 𝐆𝐮𝐧𝐚𝐰𝐚𝐧 𝐂𝐲𝐛𝐞𝐫
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬 𝐨𝐧 𝐮𝐬𝐢𝐧𝐠 𝐭𝐡𝐞 𝐩𝐫𝐨𝐜𝐞𝐝𝐮𝐫𝐞
//   𝐈 𝐡𝐚𝐯𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞𝐝 𝐡𝐨𝐰 𝐭𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐥

//━━━━━━━━━━━━━━━━━(Modules Import )
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

//━━━━━━━━━━━━━━━━━(List Mime Type)
// Don't try to Reduce Value
const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'svg': 'image/svg+xml',
    'ttf': 'application/x-font-ttf',
    'otf': 'application/x-font-opentype',
    'woff': 'application/font-woff',
    'woff2': 'application/font-woff2',
    'eot': 'application/vnd.ms-fontobject',
    'sfnt': 'application/font-sfnt'
};

//━━━━━━━━━━━━━━━━━(Setup Hostname Or IP)
// Support External IP
// Example 192.168.0.1 Or 10.16.197.56
var hostname = '127.0.0.1';

//━━━━━━━━━━━━━━━━━(Setup Port Or 8080 To Dll )
// Not Support Port 443
// If You Want To Use Port 443 You Must Have An SSL Certificate
// Port Default 8000
var port = '8001';

//━━━━━━━━━━━━━━━━━(Modules Import )
http.createServer((req, res) => {
    var myuri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(myuri));
    console.log('[Detected Data] >>' + filename);
    var loadFile;

    try {
        loadFile = fs.lstatSync(filename);
    } catch (error) {
        res.writeHead(404, {
            "Content-Type": 'text/plain'
        });
        res.write('404 Internal Error');
        res.end();
        return;
    }
//━━━━━━━━━━━━━━━━━(Modules Import )
    if (loadFile.isFile()) {
        var mimeType = mimetypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200, {
            "Content-Type": mimeType
        });
//━━━━━━━━━━━━━━━━━(Modules Import )
var filestream = fs.createReadStream(filename);
        filestream.pipe(res);
    } else if (loadFile.isDirectory()) {
        res.writeHead(302, {
            'Location': 'index.html'
        });
//━━━━━━━━━━━━━━━━━(Modules Import )
res.end();
    } else {
        res.writeHead(500, {
            "Content-Type": 'text/plain'
        });
        res.write('500 Internal Error');
        res.end();
    }
//━━━━━━━━━━━━━━━━━(Setup Console)
}).listen(port, hostname, () => {
    console.log(`Server is running on server http://${hostname}:${port}`);
});
//━━━━━━━━━━━━━━━━━(Setup Done Enjoy)
