const Koa = require("koa");
const app = new Koa();

const path = require("path");
const fs = require("fs");

app.use(async (ctx) => {
  const url = ctx.request.url;
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  } else if (url.endsWith(".js")) {
    // 获取js文件绝对路径，读取并返回
    const p = path.join(__dirname, url);
    ctx.type = "text/javascript";
    ctx.body = fs.readFileSync(p, "utf-8");
  }
});

app.listen(3000, () => {
  console.log("kvite start");
});
