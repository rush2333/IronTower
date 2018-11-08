const Bundler = require('parcel-bundler');
const app = require('express')();
const path = require('path');
const proxy = require('http-proxy-middleware')

const file = path.join(__dirname,'./index.html'); // Pass an absolute path to the entrypoint here
const options = {
  outDir: './dist', // 将生成的文件放入输出目录下，默认为 dist
  outFile: 'index.html', // 输出文件的名称
  publicUrl: '/', // 静态资源的 url ，默认为 dist
  watch: true, // 是否需要监听文件并在发生改变时重新编译它们，默认为 process.env.NODE_ENV !== 'production'
  cache: true, // 启用或禁用缓存，默认为 true
  target: 'browser', // 可选的目标平台：browser/node/electron，默认为 browser
}; 

// 使用 file 和 options 参数，初始化新的 bundler
const bundler = new Bundler(file, options);

app.use('/api/*', proxy({
  target: 'http://183.234.29.185:8886/',
  changeOrigin: true
}))
// 让 express 使用 bundler 中间件，这将让 parcel 处理你 express 服务器上的每个请求
app.use(bundler.middleware());

// Listen on port 8080
app.listen(8080);
