const http = require('http');
const fs = require('fs');

const routes = {
  '/': './index.html',
  '/index.html': './index.html',
  '/about.html': './about.html',
  // 新しいページを追加するときは、ここに追加するだけでok！
  // '/contact.html': './contact.html',
};

// ファイルを読み込んでレスポンスを返す関数
const serveHtml = (res, filePath, statusCode) => {
  // fs.readFileを使ってファイルを読み込む
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 読み込みに失敗したら500エラーを返す
      // 500.htmlが見つからない場合も考慮
      fs.readFile('./500.html', (err500, data500) => {
        if (err500) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('サーバーエラー');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data500);
        }
      });
    } else {
      // 成功したらHTMLを返す
      res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    }
  });
};


const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        // 500エラー: index.htmlの読み込みに失敗した場合
        fs.readFile('./500.html', (err500, data500) => {
          if (err500) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('サーバーエラー');
          } else {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data500);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    });
  } else if (req.url === '/about.html') {
    fs.readFile('./about.html', (err, data) => {
      if (err) {
        // 500エラー: about.htmlの読み込みに失敗した場合
        fs.readFile('./500.html', (err500, data500) => {
          if (err500) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('サーバーエラー');
          } else {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data500);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    });
  } else if (req.url.startwWith('/hello?')) {
    const url = new URL(req.url, 'http://localhost:3000');
    const name = url.searchParams.get('username');
    
    fs.readFile('./hello.html', 'utf-8', (err, data) =>{
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
      res.end('サーバエラー');
      return;
    }
  
    const updatedHtml = data.replace('<div id="greetig-message"></div>',`<h1>こんにちは、${name}さん！</h1>`);
       
       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
       res.end(updatedHtml);
     }); 
    res.writeHead(200,{ 'Content-Type': 'text/html; charset=utf-8'});
    res.end(`>こんにちは、${name}さん!</h1>`);
  } else {
    // 404エラー: ページが見つからない場合
    fs.readFile('./404.html', (err404, data404) => {
      if (err404) {
        // 404.htmlが読み込めない場合は、プレーンテキストを返す
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('ページが見つかりません');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data404);
      }
    });
  }
}
)
server.listen(3000, () => {
  console.log('http://localhost:3000 にアクセスしてみよう');
});