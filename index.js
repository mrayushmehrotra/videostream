const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Working fine");
});

app.get("/:file_name", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/video/", req.params.file_name));
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// app.get("/video", (req, res) => {
//   const range = req.headers.range;
//   if (!range) return res.status(400).send("Range must be provided");

//   const videoPath = path.join(__dirname, +"/video.mp4");
//   const videoSize = fs.statSync(videoPath).size;

//   const chunkSize = 10 ** 6;

//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + chunkSize, videoSize - 1);
//   const contentLength = end - start + 1;

//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/*",
//   };

//   res.writeHead(206, headers);

//   const videoStream = fs.createReadStream(videoPath, { start, end });

//   videoStream.pipe(res);
// });

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`);
});
