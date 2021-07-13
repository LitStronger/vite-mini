const Koa = require("koa");
const app = new Koa();

const path = require("path");
const fs = require("fs");
const { dirname } = require("path");

app.use(async (ctx) => {
  const url = ctx.request.url;
  // 文件入口
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  } 
  else if (url.endsWith(".js")) {
    const p = path.join(__dirname, url);
    ctx.type = "text/javascript";
    ctx.body = fs.readFileSync(p, "utf-8");
  }
});

app.listen(3000, () => {
  console.log("kvite start");
});
