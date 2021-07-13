const fs = require("fs");
const path = require("path");
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");

// 处理裸模块（第三方库）。如果以'/'，'./'，'../'开头则直接返回，否则转化为/@module
function convertImport(content) {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    if (s1.startsWith("./") || s1.startsWith("/") || s1.startsWith("../")) {
      return s0;
    } else {
      return ` from '/@modules/${s1}'`;
    }
  });
}

// 读取裸模块
function readModule(url) {
  const moduleName = url.replace("/@modules/", "");
  const prefix = path.join(__dirname, "../node_modules", moduleName);
  // 读入打包后的vue.js
  const module = require(prefix + "/package.json").module;
  const filePath = path.join(prefix, module);
  return (ret = fs.readFileSync(filePath, "utf8"));
}

// 编译vue、ts、tsx等
function fileCompile(url, query) {
  // SFC路径
  const p = path.join(__dirname, "..", url.split("?")[0]);
  const ret = compilerSfc.parse(fs.readFileSync(p, "utf-8")); // SFC文件请求
  if (!query.type) {
    const scriptContent = ret.descriptor.script.content;
    console.log(scriptContent);
    const script = scriptContent.replace(
      "export default ",
      "const __script = "
    ); // 返回App.vue解析结果

    return `${convertImport(script)} 
            import { render as __render } from '${url}?type=template' 
            __script.render = __render        
            export default __script      `;
  }
  // 模板内容
  else if (query.type === "template") {
    const template = ret.descriptor.template.content; // 编译为render
    const render = compilerDom.compile(template, { mode: "module" }).code;
    return convertImport(render);
  }
}

module.exports = {
  convertImport,
  readModule,
  fileCompile,
};
