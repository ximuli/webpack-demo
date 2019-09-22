# 前言

这里是乐亦栗学习 webpack4 的笔记。每个 commit 都清晰明了，代码中有大量注释，便于学习和理解。

玩转webpack

课件地址：

[第一章](https://github.com/geektime-geekbang/geektime-webpack-course/blob/master/ppt/%E3%80%8A%E7%8E%A9%E8%BD%ACwebpack%E3%80%8B%20%E7%AC%AC%E4%B8%80%E7%AB%A0.pdf)

[第二章](https://github.com/geektime-geekbang/geektime-webpack-course/blob/master/ppt/%E3%80%8A%E7%8E%A9%E8%BD%ACwebpack%E3%80%8B%20%E7%AC%AC%E4%BA%8C%E7%AB%A0.pdf)

# 安装 webpack

```
mkdir webpack-demo

cd webpack-demo

npm init -y

npm install webpack webpack-cli --save-dev

./node_modules/.bin/webpack -v
```

# 安装和配置 babel

## 使我们能够在项目中使用 ES6 最新语法

1. npm 安装相关的包
```
npm i @babel/core @babel/preset-env babel-loader -D
```

2. 在项目根目录新建 .babelrc 文件并写入如下代码

```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

## 使我们能在项目中写 react 和 JSX

1. 

```
npm i react react-dom @babel/preset-react -D
```

2. 在 .babelrc 中新增一行

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

3. 就可以写 react 代码啦。

```js
// 注意大小写 React
import React from 'react'
import ReactDOM from 'react-dom'

class Search extends React.Component {
    render() {
        return (
            <div>你好，Search！</div>
        )
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
)
```

# 在项目中写 CSS / Less

1. 

```
npm i css-loader style-loader -D
```

css-loader 用于加载 .css 文件并且转换成 commonjs 对象

style-loader将样式通过 `<style>` 标签插入到 head 中

2. 在 webpack.config.js 中做配置

```js
'use strict'

const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /.js$/, use: 'babel-loader' },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
                // 这里的处理顺序使从右到左依次处理
            }
        ]
    },
    mode: 'production'
}
```

3. 然后就可以写 CSS 了

```js
import React from 'react'
import ReactDOM from 'react-dom'
// 引入新建的 css 文件
import './search.css'

class Search extends React.Component {
    render() {
        return (
            // JSX 中写类名应该用 className
            <div className="search-text">你好，Search！</div>
        )
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
)
```

4. 改成使用 Less

安装 Less 所需的包, less-loader 用于将 less 转换成 css

```
npm i less less-loader -D
```

修改 webpack.config.js

```
'use strict'

const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /.js$/, use: 'babel-loader' },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    mode: 'production'
}
```

引入 less 

```
import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'

class Search extends React.Component {
    render() {
        return (
            <div className="search-text">你好，Search！</div>
        )
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
)
```

# 在项目中使用图片和字体

1. 安装 file-loader

```
npm i file-loader -D
```

2. 在 webpack.config.js 中配置 loader

```
'use strict'

const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /.js$/, use: 'babel-loader' },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: 'file-loader'
            }
        ]
    },
    mode: 'production'
}
```

3. 可以在项目中使用图片了

```
import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from './images/logo.png'

class Search extends React.Component {
    render() {
        return (
            <div className="search-text">
                你好，Search！
                <img src={ logo } />
            </div>
        )
    }
}

ReactDOM.render(
    <Search></Search>,
    document.getElementById('root')
)
```

4. 字体的使用是类似的
  * 需要先在 css 中用 font-face 引入字体文件
  * 然后需要在 webpack.config.js 中做配置
  * 就可以直接使用了

5. 同样的还可以使用 url-loader 来解析图片和字体，做些额外配置它会自动把小资源转换为 base64 格式

# webpack 中的文件监听

文件监听是在源码发生变化时，自动重新构建出新的文件

webpack 开启监听模式，有两种方式：
* 启动 webpack 命令时，带上 --watch 参数
* 在配置 webpack.config.js 中设置 watch: true

唯一缺陷：每次需要手动刷新浏览器

# webpack 中的热更新

## webpack-dev-server

```js
npm i webpack-dev-server -D
```

主要依靠 webpack-dev-server ,再配合 webpack 自带的 HotModuleReplacementPlugin 插件

WDS 不刷新浏览器

WDS 不输出文件，而是放到内存中

操作方法：

1. 在 npm scripts 中添加一项： webpack-dev-server --open
2. 在 webpack.config.js 中添加相关插件的配置

## webpack-dev-middleware

还有一种方式就是使用 webpack-dev-middleware

WDM 将 webpack 输出的文件传输给服务器

适用于灵活的定制场景

# 文件指纹

## 文件指纹如何生成

Hash：和整个项目的构建有关，只有项目文件有修改，整个项目构建的 hash 值就会更改

Chunkhash： 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值

ContentHash： 根据文件内容来定义 hash ，文件内容不变，则 contenthash 不变

## js 的文件指纹设置

设置 output 的 filename ，使用 [chunkhash]

```js
output: {
  filename: '[name][chunkhash:8].js',
  path: __dirname + '/dist'
}
```

CSS 的文件指纹设置和图片的文件指纹设置直接查看 PPT 相关章节。

# 代码压缩

## CSS 压缩

```js
npm i optimize-css-assets-webpack-plugin -D
// 上面的插件需要 cssnano 配合使用
npm i cssnano -D
```

然后在 webpack 配置文件中配置此插件

```
plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]
```

## js 压缩

webpack4 中内置了 uglifyjs-webpack-plugin

当配置中的 mode 为 production 时会默认开启 js 文件的压缩

## html 压缩

配置 html-webpack-plugin 

```
npm i html-webpack-plugin -D
```

# 自动清理构建目录

当前的问题：每次构建都需要手动删除 dist 目录

使用 clean-webpack-plugin ，默认会删除 output 指定的输出目录

```
npm i clean-webpack-plugin -D
```

# PostCSS 插件 autoprefixer 自动补齐 CSS3 前缀

## 浏览器内核及其 CSS 前缀

IE Trident（-ms）

Mozilla Geko （-moz）

Chrome Webkit （-webkit）

Opera Presto （-o）

## autoprefixer

与 less 和 sass 不同， autoprefixer 属于后置处理

```
npm i postcss-loader autoprefixer -D
```

然后配置 postcss-loader

配置 postcss-loader 的时候，要注意顺序，我这边是写在了 less-loader 前面，否则构建会报错

# CSS px 自动转换为 rem

* 使用 px2rem-loader
* 使用手淘的 lib-flexible 库，页面渲染时计算根元素的 font-size 值

```
npm i px2rem-loader -D

npm i lib-flexible -S
```

配置 px2rem-loader 的时候，要注意顺序，我这边是写在了 less-loader 前面，否则构建会报错

