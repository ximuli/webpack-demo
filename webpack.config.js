'use strict';

const path = require('path')

module.exports = {
  // entry 在单入口时是一个字符串，多入口（多页应用）时是一个对象
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  /* 
    output 用来告诉 webpack 如何将编译后的文件输出到磁盘
    单入口时 output 的 filename 可以是写死的，多入口时需要用占位符 [name] 来区分
  */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  /*
    webpack4
    mode用来指定当前的构建环境是 production / development 还是 none
    设置 mode 可以使用 webpack 内置的函数，默认值为 production 
  */
  mode: 'production',
  /*
    webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 loaders 去支持其他文件类型并且把他们转换为有效的模块，并且可以添加到依赖图当中。
    本身是一个函数，接受源文件为参数，返回转换的结果。
    loaders 用法：在 module 下指定 rules 对象数组，其中 test 指定匹配规则， use 指定使用 loader 的名称
  */
  module: {
    rules: [
      { test: /.js$/, use: 'babel-loader' },
      /* 
        css-loader 用于加载 .css 文件，并且转换成 commonjs 对象
        style-loader 将样式通过 <style> 标签插入到 head 中
        loader 的调用是链式调用，执行顺序是从右到左 ，因此我们这里是先写 style-loader 再写 css-loader ，
        这样在解析的时候会先执行 css-loader ，然后把结果传递给 style-loader 去执行
      */
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      /*
        file-loader 和 url-loader 作用相似
        url-loader 可以做些设置来自动将小资源转换为 base64 格式
      */
      // { test: /.(png|jpg|gif|jpeg)$/, use: 'file-loader' },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      { test: /.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' }
    ]
  },
  /*
    plugins 用于 bundle 文件的优化，资源管理和环境变量的注入
    作用于整个构建过程
  */
  plugins: []
}