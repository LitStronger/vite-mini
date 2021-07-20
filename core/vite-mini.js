const Koa = require("koa");
const app = new Koa();
const path = require("path");
const fs = require("fs");
const utils = require("../utils/utils");

app.use(async (ctx) => {
  const { url, query } = ctx.request;
  // 入口
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  }

  // js文件
  else if (url.endsWith(".js")) {
    const p = path.join(__dirname, "..", url);
    ctx.type = "text/javascript";

    const ret = fs.readFileSync(p, "utf-8");
    ctx.body = utils.convertImport(ret);
  }

  // 匹配路径转换后的文件（/@module）
  else if (url.startsWith("/@module")) {
    ctx.type = "text/javascript";

    const ret = utils.readModule(url);
    ctx.body = utils.convertImport(ret);
  }

  // 需要编译的文件，vue、ts、tsx等
  else if (url.indexOf(".vue") > -1) {
    const ret = utils.fileCompile(url, query);
    ctx.type = "text/javascript";
    ctx.body = ret;
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`vite-mini start at: http://localhost:${port}`);
});
