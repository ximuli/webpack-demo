# 前言

这里是乐亦栗学习 webpack4 的笔记。

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

## 在项目中写 CSS / Less

1. 

```
npm i css-loader style-loader -D
```

css-loader 用于加载 .css 文件并且转换成 commonjs 对象

style-loader将样式通过 <style> 标签插入到 head 中

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

## 在项目中使用图片和字体

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

5. 同样的还可以使用 url-loader 来解析图片和字体，它会把小资源转换为 base64 格式


# 浏览器内核及其 CSS 前缀

IE Trident（-ms）

Mozilla Geko （-moz）

Chrome Webkit （-webkit）

Opera Presto （-o）