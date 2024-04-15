//  修改文章路由 替换网址路径 例如将 http://127.0.0.1:8081/#/home/list ==》  http://127.0.0.1:8081/#/editor
// 文章列表配置 


window.g = {
    dataList: [
        {
            "title": "vue nextTick 和 promise().then() 执行顺序",
            "content": "```language\nnextTick(() => {\n  console.log(1);\n});\nconst p = new Promise((resolve, reject) => {\n  console.log(2);\n  resolve(3);\n});\np.then((res) => {\n  console.log(res, \"res\");\n});\n\nnextTick(() => {\n  console.log(4);\n});\n\n// 2 ==>3 \"res\" ==> 1 ==>s 4 \n```\n",
            "articleDM": 89,
            "createAt": "2023-09-19T02:38:30.000Z",
            "updateAt": "2023-09-19T02:38:28.000Z",
            "userID": 6,
            "fixedTop": 0,
            "fileDM": 154,
            "intro": "undefined"
        },
        {
            "title": "使用md-editor-v3在线编辑器 版本4.2.0",
            "content": "\nmd-editor-v3 官网地址： [md-editor-v3官网](https://imzbf.github.io/md-editor-v3/en-US/index)\n\n安装 ：md-editor-v3\nyarn\n```\nyarn add md-editor-v3\n```\nnpm\n```\nnpm install md-editor-v3\n```\n\n版本：4.2.0\n**一 、编辑模式：引入编辑组件**\n![](http://127.0.0.1:5001/fileApi/imgUrl?imgDM=47)\n用法:\n```\n          <!-- md 编辑器 -->\n          <el-tab-pane :lazy=\"true\" label=\"markdown\" name=\"first\">\n            <MdEditor v-model=\"form.content\" style=\"width: 100%\" @onUploadImg=\"onUploadImg\" />\n          </el-tab-pane>\n```\n// 引入样式和 组件\n```\n// 引入markDown 编辑器\nimport { MdEditor } from \"md-editor-v3\";\nimport \"md-editor-v3/lib/style.css\";\n```\n```\n    // md编辑器\n    const mdEditorEL = ref(\"\");\n      return {\n      mdEditorEL,\n    };\n```\n\n\n\n**二 、预览模式：引入预览组件**\n![](http://127.0.0.1:5001/fileApi/imgUrl?imgDM=49)\n\n\n```\n<template>\n              <MdPreview v-model=\"data.content\" :previewOnly=\"true\" style=\"width: 100%\" />\n</template>\n<script lang=\"ts\">\n// 引入md 预览组件\nimport { MdPreview } from \"md-editor-v3\";\nimport \"md-editor-v3/lib/style.css\";\nexport default defineComponent({\n  components: {\n    MdPreview,\n  },\n  setup(props, ctx) {\n    return {\n      ...toRefs(state),\n      ...methods,\n      formatDate\n    };\n  }\n});\n</script>\n```\n**三、关于md-editor-v3: 图片上传**\nMdEditor 编辑组件为我们暴露了onUploadImg方法，通过这个方法进行图片的上传以及获取\n```language\n<MdEditor v-model=\"form.content\" style=\"width: 100%\" @onUploadImg=\"onUploadImg\" />\n\n\n// js \n// md  图片上传\nconst onUploadImg = async (files, callback) => {\n  const res = await Promise.all(\n    files.map((file) => {\n      return new Promise(async (rev, rej) => {\n        // 获取图片url\n        const result: any = await fileApi.upload(file)\n        if (result.status === \"success\") {\n          rev(result.data.fileNetPath)\n        }\n      });\n    })\n  );\n  callback(res.map((item) => item));\n};\n\n```\n\n\n\n",
            "articleDM": 72,
            "createAt": "2022-05-08T13:09:03.000Z",
            "updateAt": "2023-09-05T14:29:05.000Z",
            "userID": 6,
            "fixedTop": 0,
            "fileDM": 146,
            "intro": "null"
        },
        {
            "title": "在vue3中添加动态路由",
            "content": "添加动态路由代码\n```\nexport const addAsyncRouters = (paretName, routers, routerIns) => {\n    routers.forEach(_r => {\n        if (!_r.isTitle) {\n            const _config = {\n                path: _r.routerPath,\n                component: () => import(`../views/${_r.componentPath}`),\n                name: _r.title,\n                children: []\n            }\n            routerIns.addRoute(paretName, _config)\n            if (_r.childrens.length) {\n                addAsyncRouters(_r.title, _r.childrens, routerIns)\n            }\n        } else {\n            if (_r.childrens.length) {\n                addAsyncRouters(paretName, _r.childrens, routerIns)\n            }\n        }\n    });\n}\n\n```\n\n在router/index.ts中调用addAsyncRouters\n```\n\n// 添加异步路由\nconst _asyncRouters = async () => {\n  getAsyncRouters().then(res => {\n    addAsyncRouters(\"index\", res, router)\n  })\n}\n_asyncRouters()\n```\n\n解决页面刷新 动态路由丢失导致404问题\n```\n//  动态路由 防止刷新页面404\nlet flag = 0\nexport const guard = (router: Router) => {\n    router.beforeEach((to, from, next) => {\n        if (to.path !== \"/login\") {\n            // if (cookie.get(\"token\")) {\n            //  动态路由 防止刷新页面404\n            if (flag == 0) {\n                // 如果flag === 0 则重新加载动态路由\n                getAsyncRouters().then(res => {\n                    addAsyncRouters(\"index\", res, router)\n                })\n                flag++\n                next({ ...to, replace: true })\n            } else {\n                next()\n            }\n            // } else {\n            //     ElMessage({\n            //         message: \"登入失效,请登入\",\n            //         type: \"warning\"\n            //     })\n            // next({ path: \"/login\" })\n            // }\n        } else {\n            next()\n        }\n    })\n}\n```\n",
            "articleDM": 71,
            "createAt": "2022-05-08T13:09:03.000Z",
            "updateAt": "2023-09-05T14:29:09.000Z",
            "userID": 6,
            "fixedTop": 0,
            "fileDM": 145,
            "intro": "null"
        },
        {
            "title": "⚪ ",
            "content": "```vue\n<template>\n  <div class=\"warp\">\n    <canvas\n      class=\"canvasStyle\"\n      ref=\"canvasEl\"\n      width=\"800\"\n      height=\"800\"\n    ></canvas>\n    <canvas\n      class=\"canvasStyle\"\n      ref=\"canvasEl2\"\n      width=\"800\"\n      height=\"800\"\n    ></canvas>\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, reactive, toRefs, onMounted } from \"vue\";\nconst canvasEl = ref(null);\nconst outR = 400;\nlet ctx = null;\n\nconst canvasEl2 = ref(null);\nlet ctx2 = null;\n\nconst arcOne = function (ctx) {\n  ctx.save();\n  ctx.strokeStyle = \"#000\";\n\n  ctx.translate(outR, outR);\n  var time = new Date();\n  ctx.rotate(\n    ((2 * Math.PI) / 60) * time.getSeconds() +\n      ((2 * Math.PI) / 60000) * time.getMilliseconds()\n  );\n  ctx.beginPath();\n  ctx.arc(0, -outR / 2, outR / 2, 0, Math.PI * 2, true); // 绘制 内圆1\n\n  //  内圆2 起点\n  ctx.moveTo(outR / 4, -(outR * 3) / 4);\n  ctx.arc(0, (-outR * 3) / 4, outR / 4, 0, Math.PI * 2, true); // 绘制 内圆2\n\n  //  内圆3 起点\n  ctx.moveTo(outR / 8, -(outR * 7) / 8);\n  ctx.arc(0, (-outR * 7) / 8, outR / 8, 0, Math.PI * 2, true); // 绘制 内圆3\n\n  //  内圆4 起点\n  ctx.moveTo(outR / 16, -(outR * 15) / 16);\n  ctx.arc(0, (-outR * 15) / 16, outR / 16, 0, Math.PI * 2, true); // 绘制 内圆4\n\n  //  内圆5起点\n  ctx.moveTo(outR / 32, -(outR * 31) / 32);\n  ctx.arc(0, (-outR * 31) / 32, outR / 32, 0, Math.PI * 2, true); // 绘制 内圆5\n  // 闭环\n  ctx.stroke();\n  drawDiameter(time, 1, 5, ctx);\n  ctx.restore();\n};\n\n// 直径旋转(自转)\nconst drawDiameter = function (time, grade, max, ctx) {\n  ctx.strokeStyle = \"#409eff\";\n  const correctionTimeLine = Math.pow(2, grade);\n  const backTimeLine = Math.pow(2, grade + 1);\n  // ctx.save();\n  if (grade === 1) {\n    ctx.rotate(\n      (0 / 60) * time.getSeconds() + (0 / 60000) * time.getMilliseconds()\n    );\n  } else {\n    ctx.rotate(\n      ((correctionTimeLine * Math.PI) / 60) * time.getSeconds() +\n        ((correctionTimeLine * Math.PI) / 60000) * time.getMilliseconds()\n    );\n  }\n\n  ctx.translate(0, -outR / correctionTimeLine);\n  ctx.rotate(\n    -((backTimeLine * Math.PI) / 60) * time.getSeconds() -\n      ((backTimeLine * Math.PI) / 60000) * time.getMilliseconds()\n  );\n  ctx.beginPath();\n  //  内圆内半径\n  ctx.moveTo(0, 0);\n  ctx.lineTo(0, outR / correctionTimeLine);\n  //  内圆外半径\n  ctx.moveTo(0, 0);\n  ctx.lineTo(0, -outR / correctionTimeLine);\n  ctx.stroke();\n\n  ctx.beginPath();\n  ctx.strokeStyle = \"red\";\n  ctx.arc(0, -outR / correctionTimeLine, 3, 0, Math.PI * 2, true); // 绘制 内圆5\n  ctx.stroke();\n\n  // 栈弹出\n  grade++;\n  max--;\n  if (max) {\n    drawDiameter(time, grade, max, ctx);\n  }\n  // ctx.restore();\n};\n\nconst init1 = function () {\n  ctx = canvasEl.value.getContext(\"2d\");\n  if (!canvasEl.value) {\n    requestAnimationFrame(init1);\n    return;\n  }\n  ctx.clearRect(0, 0, 2 * outR, 2 * outR);\n  ctx.beginPath();\n  ctx.strokeStyle = \"#000\";\n\n  ctx.arc(outR, outR, outR, 0, Math.PI * 2, true); // 绘制\n  ctx.stroke();\n  // 直径\n  ctx.save();\n  ctx.strokeStyle = \"#eee\";\n  ctx.moveTo(0, outR);\n  ctx.lineTo(2 * outR, outR);\n  ctx.moveTo(outR, 0);\n  ctx.lineTo(outR, 2 * outR);\n  ctx.stroke();\n  ctx.restore();\n\n  // 圆\n  arcOne(ctx);\n  requestAnimationFrame(init1);\n};\n\n// 曲线 直径端部轨迹\nconst drawCurve = function (time, grade, max, ctx) {\n  ctx.strokeStyle = \"#00ff00\";\n  const correctionTimeLine = Math.pow(2, grade);\n  const backTimeLine = Math.pow(2, grade + 1);\n  ctx.save();\n  if (grade === 1) {\n    ctx.rotate(\n      (0 / 60) * time.getSeconds() + (0 / 60000) * time.getMilliseconds()\n    );\n  } else {\n    ctx.rotate(\n      ((correctionTimeLine * Math.PI) / 60) * time.getSeconds() +\n        ((correctionTimeLine * Math.PI) / 60000) * time.getMilliseconds()\n    );\n  }\n  ctx.translate(0, -outR / correctionTimeLine);\n  ctx.rotate(\n    -((backTimeLine * Math.PI) / 60) * time.getSeconds() -\n      ((backTimeLine * Math.PI) / 60000) * time.getMilliseconds()\n  );\n  ctx.beginPath();\n  //  端 轨迹\n  ctx.moveTo(0, -outR / correctionTimeLine + 1);\n  ctx.lineTo(0, -outR / correctionTimeLine);\n  ctx.lineWidth = 1;\n  ctx.stroke();\n  grade++;\n  max--;\n  if (max) {\n    drawCurve(time, grade, max, ctx);\n  }\n  ctx.restore();\n};\n\nconst init2 = function () {\n  ctx2 = canvasEl2.value.getContext(\"2d\");\n  if (!canvasEl2.value) {\n    requestAnimationFrame(init2);\n    return;\n  }\n  ctx2.save();\n  ctx2.translate(outR, outR);\n  var time = new Date();\n  ctx2.rotate(\n    ((2 * Math.PI) / 60) * time.getSeconds() +\n      ((2 * Math.PI) / 60000) * time.getMilliseconds()\n  );\n  drawCurve(time, 1, 5, ctx2);\n  requestAnimationFrame(init2);\n  ctx2.restore();\n};\nonMounted(() => {\n  try {\n    requestAnimationFrame(init1);\n    requestAnimationFrame(init2);\n  } catch (error) {\n    console.log(error);\n  }\n});\n\n// 线\n// lineTO(x,y)   moveTo(x,y)\n// 圆弧\n// arc(x, y, radius, startAngle, endAngle, anticlockwise)\n// 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。\n// arcTo(x1, y1, x2, y2, radius)\n// var ctx = canvas.getContext(\"2d\");\n// ctx.beginPath();\n// ctx.moveTo(75, 50);\n// ctx.lineTo(100, 75);\n// ctx.lineTo(100, 25);\n// ctx.fill();\n</script>\n<style scoped lang=\"scss\">\n.warp {\n  width: 850px;\n  height: 1650px;\n  margin: 40px auto;\n  // background-color: azure;\n  position: relative;\n  .canvasStyle {\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    border: 1px solid #eee;\n  }\n}\n</style>\n\n\n```\n",
            "articleDM": 90,
            "createAt": "2023-09-22T09:58:47.000Z",
            "updateAt": "2023-09-22T09:58:50.000Z",
            "userID": 6,
            "fixedTop": 1,
            "fileDM": 155,
            "intro": "undefined"
        },
        {
            "title": "原型",
            "content": " ① 所有实例对象都有一个__proto__(隐式原型)属性，属性值是一个普通的对象\n ② 所有函数都有一个prototype(原型)属性，属性值是一个普通的对象\n ③ 所有实例对象的__proto__属性指向它构造函数的prototype\n\n\n\n**构造函数**：通过构造函数创建的每一个实例都会自动将构造函数的 prototype 属性作为其 [[Prototype]]，prototype 默认具有一个自有属性：constructor，它引用了构造函数本身。\n\n```\nconst obj = new Object()\n// 可以看出obj 的[[prototype]]指向 构造函数Object的原型【prototype对象】\n// 而Object就是obj的构造函数\nobj.__proto__ === Object.prototype\nobj.__proto__.constructor === Object\n\n```\n\n<hr/>\n\n**原型**：原型是 JavaScript 对象相互继承特性的机制\nJavaScript 中所有的实例对象都有一个内置属性[[prototype]]，通过__proto__指向实例对象的构造函数的prototype（原型，称为它的 prototype（原型）。它本身是一个实例对象，故原型对象也会有它自己的[[prototype]]，逐渐构成了原型链。原型链终止于拥有 null 作为其原型的对象上。\n&emsp;&emsp;**当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾**。\n```\nObject.prototype.age = 18\nconst Mike = {\n  name:\"Mike\",\n  age:16\n}\n\nconst Nila = {\n  name:\"Nila\"\n}\n\nconsole.log(Mike.age)  // 16\nconsole.log(Nila.age)  // 18\n```\n\n**关于构造函数Object和Function**：\n1. 所有构造函数都是构造函数Function的实例对象,一次Object也是Function的实例对象\n```\nconsole.log(Object.__proto__.constructor)   // ƒ Function() { [native code] }\nObject instanceof Function                  // true\n可以看出构造函数Object 就是Function的实例对象\n\n```\n2. 构造函数Function的原型对象【Function.prototype】是Object的实例对象\n```\nFunction.prototype.constructor             // Object\nFunction.prototype  instanceof Object      // Object\n```\n\n3. Function的构造函数\n```\nFunction.__proto__.constructor           // Function\nFunction.constructor                     // Function\nFunction.prototype.__proto__.constructor // Object\n```\n首先：js中先创建的是Object.prototype这个原型对象。\n然后：在这个原型对象的基础之上创建了Function.prototype这个原型对象。\n其次：通过这个原型对象创建出来Function这个函数。\n最后: 又通过Function这个函数创建出来之后，Object（）这个对象。\n\nnull -> Object.prototype -> Function.prototype  -> Function -> Object\n\n4. 特例\n```\nFunction instanceof Object === true // true\nObject instanceof Function === true // true\n```\n原因是：instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。[【instanceof】](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)\n```\n      function Person(age) {\n        this.age = age;\n      }\n      const Mike = new Person(18);\n\n      console.log(Mike instanceof Person);\n      // expected output: true\n\n      console.log(Mike instanceof Object);\n      // expected output: true\n```\n\n\n\n\n",
            "articleDM": 86,
            "createAt": "2023-09-06T01:29:33.000Z",
            "updateAt": "2023-09-06T01:29:31.000Z",
            "userID": 6,
            "fixedTop": 1,
            "fileDM": 147,
            "intro": "null"
        },
        {
            "title": "vu111e",
            "content": "##  一. keep-alive \n##  二. vue3 组件通信\n    - 父传子\n      1) Prop 是 逐级透传\n         父 ===> 子\n\n          另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop。若你这么做了，Vue 会在控制台上向你抛出警告\n         \n           当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失。\n      2) provide【inject】 可越级传值\n     \n    - 子传父\n      1）emits:[\"evevt1\",\"evevt2\"], emit(\"evevt1\",data),emit(\"evevt2\",data)\n      2) 父组件通过 **ref** 访问子组件\n         - vue3 非语法糖模式只能访问 setup return的方法和数据\n         - vue3 语法糖模式需要通过 defineExpose({ sonData,}); 导出能被外部访问的方法和数据\n         \n            const sonData = ref(0);\n            defineExpose({\n              sonData,\n            });\n##  三. vue3 插槽（未完成）\n##  四. vue3 状态管理（未完成）\n##  五. vue3 路由守卫（未完成）\n    1) 全局守卫\n    2) 组件守卫\n   \n##  六. ### 计算属性\n\n```language\n<template>\n  <div>\n    <h3>computed</h3>\n    <hr />\n    <el-input v-model=\"sx1\"></el-input>\n    <el-input v-model=\"sx2\"></el-input>\n    <el-input v-model=\"sx3\"></el-input>\n  </div>\n</template>\n\n<script setup>\nimport { computed, ref, nextTick } from \"vue\";\nconst sx1 = ref(\"\");\n// 基础用法【只读】\n// const sx2 = computed((a, b)=> sx1.value + \" \" + sx3.value;);\n\n\n// 可写【get, set】\nconst sx2 = computed({\n  get(a, b) {\n    console.log(\"get\", a, b);\n    return sx1.value + \" \" + sx3.value;\n  },\n  set(newValue) {\n    [sx1.value, sx3.value] = newValue.split(\" \");\n  },\n});\nconst sx3 = ref(\"\");\n</script>\n<style scoped lang=\"less\"></style>\n```\n## 七. 自定义指令\n    全局定义指令\n   ```language\n   const directives = function (app) {\n    app.directive(\"test\", {\n        // 在绑定元素的 attribute 前\n        // 或事件监听器应用前调用\n        created(el, binding, vnode, prevVnode) {\n            console.log(\"created\", el, binding, vnode, prevVnode);\n            // 下面会介绍各个参数的细节\n        },\n        // 在元素被插入到 DOM 前调用\n        beforeMount(el, binding, vnode, prevVnode) {\n            console.log(\"beforeMount\");\n        },\n        // 在绑定元素的父组件\n        // 及他自己的所有子节点都挂载完成后调用\n        mounted(el, binding, vnode, prevVnode) {\n            console.log(\"mounted\", el, binding, vnode, prevVnode);\n        },\n        // 绑定元素的父组件更新前调用\n        beforeUpdate(el, binding, vnode, prevVnode) {\n            console.log(\"beforeUpdate\");\n        },\n        // 在绑定元素的父组件\n        // 及他自己的所有子节点都更新后调用\n        updated(el, binding, vnode, prevVnode) {\n            console.log(\"updated\");\n        },\n        // 绑定元素的父组件卸载前调用\n        beforeUnmount(el, binding, vnode, prevVnode) {\n            console.log(\"beforeUnmount\");\n        },\n        // 绑定元素的父组件卸载后调用\n        unmounted(el, binding, vnode, prevVnode) {\n            console.log(\"unmounted\");\n        }\n      })\n    }\n    \n    ```\n\n   全局注册指令\n   ```language\n   import directives from \"@/utils/directives\";\n    // import \"nprogress/nprogress.css\"\n    \n    const _App = createApp(App);\n    _App.use(store).use(ElementPlus).use(router).mount(\"#app\");\n    \n    directives(_App)\n   ```\n",
            "articleDM": 88,
            "createAt": "2023-09-12T02:32:53.000Z",
            "updateAt": "2023-09-12T02:32:54.000Z",
            "userID": 6,
            "fixedTop": 0,
            "fileDM": 144,
            "intro": "undefined"
        },
    ],
    // 个人信息配置 
    userInfo: [
        {
            type: '基本信息',
            fields: [
                {
                    label: '姓名',
                    value: 'zzj'
                },
                {
                    label: '年龄',
                    value: '24'
                },
                {
                    label: '性别',
                    value: '男'
                },
                {
                    label: 'github地址',
                    value: 'https://github.com/xiangCaiOne'
                },
            ]
        },
        {
            type: '联系方式',
            fields: [
                {
                    label: 'qq',
                    value: '2683726933'
                },
                {
                    label: '邮箱',
                    value: '2683726933@qq.com'
                },
            ]
        },
        {
            type: '免责说明',
            fields: [
                {
                    label: 'qq',
                    type: 'p',
                    value: '本站以分享互联网经验、学习知识为目的，所有文章所涉及使用的工具、资源等均来自互联网，仅供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请来信告知。本站将在第一时间删除！另外，本站内的文章多为博主原创，大部分是由CSDN平台搬迁过来，仅供学习交流之用，不参与商业用途。'
                },
            ]
        }
    ],
    // 导航栏 github 链接配置
    githubLink: 'https://github.com/xiangCaiOne'
}
