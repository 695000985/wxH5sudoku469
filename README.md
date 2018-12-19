# mpsudoku469

> A Mpvue project

## Build Setup

``` bash
# 安装依赖（注意查看package.json里面模块的安装版本号）
npm install

# 小程序运行
npm run dev

# H5运行
npm run devH5

# 小程序打包（打包到dist目录)
npm run build

# H5打包（打包到distH5目录)
npm run buildH5

```


## 一、mpvue只打包小程序
通过mpvue 官方文档 构建项目

在自动生成的配置文件及目录的情况下 正常开发小程序业务

注意（遇到的坑）：

mpvue 开发小程序中，不同路由使用同一公共组件会导致数据不更改的情况，查询mpvue官网及论坛，不支持动态组件，所以改变之前开发思路，不同宫格各一个路由，使用同一组件，通过路由地址来判断，表示切换时，数据不更新，改成了使用同一路由，不引用动态组件，通过url参数区分，ok了

url 路由参数通过 this.root.mp.query获取，并且在page onLoad 时候传递的 options，即mounted生命函数中能获取

之前的this.router.push改成小程序支持的wx.navigateTo(url)，this.router.replace 改成 wx.reLaunch({ url })，其他相关的api 均改成对应的微信小程序的api

引用图片路径时，微信小程序中不支持在template中使用require请求图片资源，静态请求src可以使用../../../static/img/或者 /static/img/引用根目录图片，动态引用src 时，使用 /static/img/，在同时能兼容H5的时候，可使用变量+局部路径来实现，如小程序能编译 /static/img/，而H5能编译 static/img/

vuex 的使用，官方给的demo是pages 文件每个page页面各一个store.js储存数据；可以直接挂到Vue原型上，在入口文件main.js中：
import store from ‘./store’
Vue.prototype.$store = store

### 注意配置文件
.postcssrc.js 此条为编译微信的时候需用配置 “postcss-mpvue-wxss”: {}，转化成wxss有特别棒的效果，可以优化css的样式，编译成wxss可识别的样式代码，转化效果

添加”postcss-mpvue-wxss”: {} 编译后效果


解决方法：转化成H5时不需要”postcss-mpvue-wxss”: {}，否则可能会造成页面样式混乱，可以直接注释掉此行，或者在打包配置文件里面取消postcss 插件编译的配置

打包成H5的配置内容
``` bash
AppH5.vue 添加入口设置
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>
```

main.js 和 mainH5.js 通过Vue.mixin分别配置微信小程序和H5的相同功能但不同api 的方法及变量

Api 中的两个文件同上的功能，对于同一个功能对微信小程序和Vue 分别封装对应的方法

### 运行打包
接下来 npm run devH5 就是H5的页面啦，可以用浏览器打开，npm run dev 就是小程序代码，可以用微信开发者工具浏览，build 打包同上
