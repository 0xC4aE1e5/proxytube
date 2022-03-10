let express = require("express");
let downloader = require("ytdl-core");
let app = express();

app.use(express.static("public"));

app.get("/vid", (req, res) => {
  let id = req.query.v;
  res.setHeader("Content-Type", "video/mp4");
  downloader(id, {
    filter: "audioandvideo",
    quality: "highestvideo",
  }).pipe(res);
});

app.get("/dl", (req, res) => {
  let id = req.query.v;
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
  downloader(id, {
    filter: "audioandvideo",
    quality: "highestvideo",
  }).pipe(res);
});

app.get("/watch", (req, res) => {
  res.send(
    `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Watching | Proxytube</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>Watching</h1>
            <a href="/dl?v=${encodeURIComponent(req.query.v)}">Download</a>
            <br>
            <a href="/vid?v=${encodeURIComponent(req.query.v)}">Raw</a>
            <br>
            <video controls autoplay>
                <source src="/vid?v=${encodeURIComponent(
                  req.query.v
                )}" type="video/mp4">
            </video>
        </body>
        </html>`
  );
});

app.listen(3000);
