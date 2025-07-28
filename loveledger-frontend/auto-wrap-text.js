const fs = require('fs');
const path = require('path');

// 定义一个递归遍历目录的函数
function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);  // 读取目录中的文件
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);  // 获取文件的状态信息
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);  // 如果是文件夹，递归遍历
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      wrapTextInTFunction(fullPath);  // 如果是 JS 或 JSX 文件，执行替换操作
    }
  });
}

// 替换文件中的文本内容，将文本包裹在 t() 函数中
function wrapTextInTFunction(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');  // 读取文件内容

  // 正则匹配未包裹的文本内容（只处理简单的文本节点）
  const regex = />([^<]+)<\/[a-zA-Z]+>/g;
  content = content.replace(regex, (match, p1) => {
    // 用 t() 函数包裹匹配的文本
    return match.replace(p1, `{t('${p1}')}`);
  });

  // 将修改后的内容写回文件
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated file: ${filePath}`);
}

// 执行替换：从根目录开始遍历 src 目录
traverseDirectory('./src');
