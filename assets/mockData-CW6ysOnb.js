const n=[{title:"vue nextTick 和 promise().then() 执行顺序",content:`\`\`\`language
nextTick(() => {
  console.log(1);
});
const p = new Promise((resolve, reject) => {
  console.log(2);
  resolve(3);
});
p.then((res) => {
  console.log(res, "res");
});

nextTick(() => {
  console.log(4);
});

// 2 ==>3 "res" ==> 1 ==>s 4 
\`\`\`
`,articleDM:89,createAt:"2023-09-19T02:38:30.000Z",updateAt:"2023-09-19T02:38:28.000Z",userID:6,fixedTop:0,fileDM:154,intro:"undefined"},{title:"使用md-editor-v3在线编辑器 版本4.2.0",content:`
md-editor-v3 官网地址： [md-editor-v3官网](https://imzbf.github.io/md-editor-v3/en-US/index)

安装 ：md-editor-v3
yarn
\`\`\`
yarn add md-editor-v3
\`\`\`
npm
\`\`\`
npm install md-editor-v3
\`\`\`

版本：4.2.0
**一 、编辑模式：引入编辑组件**
![](http://127.0.0.1:5001/fileApi/imgUrl?imgDM=47)
用法:
\`\`\`
          <!-- md 编辑器 -->
          <el-tab-pane :lazy="true" label="markdown" name="first">
            <MdEditor v-model="form.content" style="width: 100%" @onUploadImg="onUploadImg" />
          </el-tab-pane>
\`\`\`
// 引入样式和 组件
\`\`\`
// 引入markDown 编辑器
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
\`\`\`
\`\`\`
    // md编辑器
    const mdEditorEL = ref("");
      return {
      mdEditorEL,
    };
\`\`\`



**二 、预览模式：引入预览组件**
![](http://127.0.0.1:5001/fileApi/imgUrl?imgDM=49)


\`\`\`
<template>
              <MdPreview v-model="data.content" :previewOnly="true" style="width: 100%" />
</template>
<script lang="ts">
// 引入md 预览组件
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
export default defineComponent({
  components: {
    MdPreview,
  },
  setup(props, ctx) {
    return {
      ...toRefs(state),
      ...methods,
      formatDate
    };
  }
});
<\/script>
\`\`\`
**三、关于md-editor-v3: 图片上传**
MdEditor 编辑组件为我们暴露了onUploadImg方法，通过这个方法进行图片的上传以及获取
\`\`\`language
<MdEditor v-model="form.content" style="width: 100%" @onUploadImg="onUploadImg" />


// js 
// md  图片上传
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise(async (rev, rej) => {
        // 获取图片url
        const result: any = await fileApi.upload(file)
        if (result.status === "success") {
          rev(result.data.fileNetPath)
        }
      });
    })
  );
  callback(res.map((item) => item));
};

\`\`\`



`,articleDM:72,createAt:"2022-05-08T13:09:03.000Z",updateAt:"2023-09-05T14:29:05.000Z",userID:6,fixedTop:0,fileDM:146,intro:"null"},{title:"在vue3中添加动态路由",content:`添加动态路由代码
\`\`\`
export const addAsyncRouters = (paretName, routers, routerIns) => {
    routers.forEach(_r => {
        if (!_r.isTitle) {
            const _config = {
                path: _r.routerPath,
                component: () => import(\`../views/\${_r.componentPath}\`),
                name: _r.title,
                children: []
            }
            routerIns.addRoute(paretName, _config)
            if (_r.childrens.length) {
                addAsyncRouters(_r.title, _r.childrens, routerIns)
            }
        } else {
            if (_r.childrens.length) {
                addAsyncRouters(paretName, _r.childrens, routerIns)
            }
        }
    });
}

\`\`\`

在router/index.ts中调用addAsyncRouters
\`\`\`

// 添加异步路由
const _asyncRouters = async () => {
  getAsyncRouters().then(res => {
    addAsyncRouters("index", res, router)
  })
}
_asyncRouters()
\`\`\`

解决页面刷新 动态路由丢失导致404问题
\`\`\`
//  动态路由 防止刷新页面404
let flag = 0
export const guard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        if (to.path !== "/login") {
            // if (cookie.get("token")) {
            //  动态路由 防止刷新页面404
            if (flag == 0) {
                // 如果flag === 0 则重新加载动态路由
                getAsyncRouters().then(res => {
                    addAsyncRouters("index", res, router)
                })
                flag++
                next({ ...to, replace: true })
            } else {
                next()
            }
            // } else {
            //     ElMessage({
            //         message: "登入失效,请登入",
            //         type: "warning"
            //     })
            // next({ path: "/login" })
            // }
        } else {
            next()
        }
    })
}
\`\`\`
`,articleDM:71,createAt:"2022-05-08T13:09:03.000Z",updateAt:"2023-09-05T14:29:09.000Z",userID:6,fixedTop:0,fileDM:145,intro:"null"},{title:"⚪ ",content:`\`\`\`vue
<template>
  <div class="warp">
    <canvas
      class="canvasStyle"
      ref="canvasEl"
      width="800"
      height="800"
    ></canvas>
    <canvas
      class="canvasStyle"
      ref="canvasEl2"
      width="800"
      height="800"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
const canvasEl = ref(null);
const outR = 400;
let ctx = null;

const canvasEl2 = ref(null);
let ctx2 = null;

const arcOne = function (ctx) {
  ctx.save();
  ctx.strokeStyle = "#000";

  ctx.translate(outR, outR);
  var time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.beginPath();
  ctx.arc(0, -outR / 2, outR / 2, 0, Math.PI * 2, true); // 绘制 内圆1

  //  内圆2 起点
  ctx.moveTo(outR / 4, -(outR * 3) / 4);
  ctx.arc(0, (-outR * 3) / 4, outR / 4, 0, Math.PI * 2, true); // 绘制 内圆2

  //  内圆3 起点
  ctx.moveTo(outR / 8, -(outR * 7) / 8);
  ctx.arc(0, (-outR * 7) / 8, outR / 8, 0, Math.PI * 2, true); // 绘制 内圆3

  //  内圆4 起点
  ctx.moveTo(outR / 16, -(outR * 15) / 16);
  ctx.arc(0, (-outR * 15) / 16, outR / 16, 0, Math.PI * 2, true); // 绘制 内圆4

  //  内圆5起点
  ctx.moveTo(outR / 32, -(outR * 31) / 32);
  ctx.arc(0, (-outR * 31) / 32, outR / 32, 0, Math.PI * 2, true); // 绘制 内圆5
  // 闭环
  ctx.stroke();
  drawDiameter(time, 1, 5, ctx);
  ctx.restore();
};

// 直径旋转(自转)
const drawDiameter = function (time, grade, max, ctx) {
  ctx.strokeStyle = "#409eff";
  const correctionTimeLine = Math.pow(2, grade);
  const backTimeLine = Math.pow(2, grade + 1);
  // ctx.save();
  if (grade === 1) {
    ctx.rotate(
      (0 / 60) * time.getSeconds() + (0 / 60000) * time.getMilliseconds()
    );
  } else {
    ctx.rotate(
      ((correctionTimeLine * Math.PI) / 60) * time.getSeconds() +
        ((correctionTimeLine * Math.PI) / 60000) * time.getMilliseconds()
    );
  }

  ctx.translate(0, -outR / correctionTimeLine);
  ctx.rotate(
    -((backTimeLine * Math.PI) / 60) * time.getSeconds() -
      ((backTimeLine * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.beginPath();
  //  内圆内半径
  ctx.moveTo(0, 0);
  ctx.lineTo(0, outR / correctionTimeLine);
  //  内圆外半径
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -outR / correctionTimeLine);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.arc(0, -outR / correctionTimeLine, 3, 0, Math.PI * 2, true); // 绘制 内圆5
  ctx.stroke();

  // 栈弹出
  grade++;
  max--;
  if (max) {
    drawDiameter(time, grade, max, ctx);
  }
  // ctx.restore();
};

const init1 = function () {
  ctx = canvasEl.value.getContext("2d");
  if (!canvasEl.value) {
    requestAnimationFrame(init1);
    return;
  }
  ctx.clearRect(0, 0, 2 * outR, 2 * outR);
  ctx.beginPath();
  ctx.strokeStyle = "#000";

  ctx.arc(outR, outR, outR, 0, Math.PI * 2, true); // 绘制
  ctx.stroke();
  // 直径
  ctx.save();
  ctx.strokeStyle = "#eee";
  ctx.moveTo(0, outR);
  ctx.lineTo(2 * outR, outR);
  ctx.moveTo(outR, 0);
  ctx.lineTo(outR, 2 * outR);
  ctx.stroke();
  ctx.restore();

  // 圆
  arcOne(ctx);
  requestAnimationFrame(init1);
};

// 曲线 直径端部轨迹
const drawCurve = function (time, grade, max, ctx) {
  ctx.strokeStyle = "#00ff00";
  const correctionTimeLine = Math.pow(2, grade);
  const backTimeLine = Math.pow(2, grade + 1);
  ctx.save();
  if (grade === 1) {
    ctx.rotate(
      (0 / 60) * time.getSeconds() + (0 / 60000) * time.getMilliseconds()
    );
  } else {
    ctx.rotate(
      ((correctionTimeLine * Math.PI) / 60) * time.getSeconds() +
        ((correctionTimeLine * Math.PI) / 60000) * time.getMilliseconds()
    );
  }
  ctx.translate(0, -outR / correctionTimeLine);
  ctx.rotate(
    -((backTimeLine * Math.PI) / 60) * time.getSeconds() -
      ((backTimeLine * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.beginPath();
  //  端 轨迹
  ctx.moveTo(0, -outR / correctionTimeLine + 1);
  ctx.lineTo(0, -outR / correctionTimeLine);
  ctx.lineWidth = 1;
  ctx.stroke();
  grade++;
  max--;
  if (max) {
    drawCurve(time, grade, max, ctx);
  }
  ctx.restore();
};

const init2 = function () {
  ctx2 = canvasEl2.value.getContext("2d");
  if (!canvasEl2.value) {
    requestAnimationFrame(init2);
    return;
  }
  ctx2.save();
  ctx2.translate(outR, outR);
  var time = new Date();
  ctx2.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  drawCurve(time, 1, 5, ctx2);
  requestAnimationFrame(init2);
  ctx2.restore();
};
onMounted(() => {
  try {
    requestAnimationFrame(init1);
    requestAnimationFrame(init2);
  } catch (error) {
    console.log(error);
  }
});

// 线
// lineTO(x,y)   moveTo(x,y)
// 圆弧
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
// 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
// arcTo(x1, y1, x2, y2, radius)
// var ctx = canvas.getContext("2d");
// ctx.beginPath();
// ctx.moveTo(75, 50);
// ctx.lineTo(100, 75);
// ctx.lineTo(100, 25);
// ctx.fill();
<\/script>
<style scoped lang="scss">
.warp {
  width: 850px;
  height: 1650px;
  margin: 40px auto;
  // background-color: azure;
  position: relative;
  .canvasStyle {
    position: absolute;
    top: 20px;
    left: 20px;
    border: 1px solid #eee;
  }
}
</style>


\`\`\`
`,articleDM:90,createAt:"2023-09-22T09:58:47.000Z",updateAt:"2023-09-22T09:58:50.000Z",userID:6,fixedTop:1,fileDM:155,intro:"undefined"},{title:"原型",content:` ① 所有实例对象都有一个__proto__(隐式原型)属性，属性值是一个普通的对象
 ② 所有函数都有一个prototype(原型)属性，属性值是一个普通的对象
 ③ 所有实例对象的__proto__属性指向它构造函数的prototype



**构造函数**：通过构造函数创建的每一个实例都会自动将构造函数的 prototype 属性作为其 [[Prototype]]，prototype 默认具有一个自有属性：constructor，它引用了构造函数本身。

\`\`\`
const obj = new Object()
// 可以看出obj 的[[prototype]]指向 构造函数Object的原型【prototype对象】
// 而Object就是obj的构造函数
obj.__proto__ === Object.prototype
obj.__proto__.constructor === Object

\`\`\`

<hr/>

**原型**：原型是 JavaScript 对象相互继承特性的机制
JavaScript 中所有的实例对象都有一个内置属性[[prototype]]，通过__proto__指向实例对象的构造函数的prototype（原型，称为它的 prototype（原型）。它本身是一个实例对象，故原型对象也会有它自己的[[prototype]]，逐渐构成了原型链。原型链终止于拥有 null 作为其原型的对象上。
&emsp;&emsp;**当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾**。
\`\`\`
Object.prototype.age = 18
const Mike = {
  name:"Mike",
  age:16
}

const Nila = {
  name:"Nila"
}

console.log(Mike.age)  // 16
console.log(Nila.age)  // 18
\`\`\`

**关于构造函数Object和Function**：
1. 所有构造函数都是构造函数Function的实例对象,一次Object也是Function的实例对象
\`\`\`
console.log(Object.__proto__.constructor)   // ƒ Function() { [native code] }
Object instanceof Function                  // true
可以看出构造函数Object 就是Function的实例对象

\`\`\`
2. 构造函数Function的原型对象【Function.prototype】是Object的实例对象
\`\`\`
Function.prototype.constructor             // Object
Function.prototype  instanceof Object      // Object
\`\`\`

3. Function的构造函数
\`\`\`
Function.__proto__.constructor           // Function
Function.constructor                     // Function
Function.prototype.__proto__.constructor // Object
\`\`\`
首先：js中先创建的是Object.prototype这个原型对象。
然后：在这个原型对象的基础之上创建了Function.prototype这个原型对象。
其次：通过这个原型对象创建出来Function这个函数。
最后: 又通过Function这个函数创建出来之后，Object（）这个对象。

null -> Object.prototype -> Function.prototype  -> Function -> Object

4. 特例
\`\`\`
Function instanceof Object === true // true
Object instanceof Function === true // true
\`\`\`
原因是：instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。[【instanceof】](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
\`\`\`
      function Person(age) {
        this.age = age;
      }
      const Mike = new Person(18);

      console.log(Mike instanceof Person);
      // expected output: true

      console.log(Mike instanceof Object);
      // expected output: true
\`\`\`




`,articleDM:86,createAt:"2023-09-06T01:29:33.000Z",updateAt:"2023-09-06T01:29:31.000Z",userID:6,fixedTop:1,fileDM:147,intro:"null"},{title:"vue",content:`##  一. keep-alive 
##  二. vue3 组件通信
    - 父传子
      1) Prop 是 逐级透传
         父 ===> 子

          另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop。若你这么做了，Vue 会在控制台上向你抛出警告
         
           当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失。
      2) provide【inject】 可越级传值
     
    - 子传父
      1）emits:["evevt1","evevt2"], emit("evevt1",data),emit("evevt2",data)
      2) 父组件通过 **ref** 访问子组件
         - vue3 非语法糖模式只能访问 setup return的方法和数据
         - vue3 语法糖模式需要通过 defineExpose({ sonData,}); 导出能被外部访问的方法和数据
         
            const sonData = ref(0);
            defineExpose({
              sonData,
            });
##  三. vue3 插槽（未完成）
##  四. vue3 状态管理（未完成）
##  五. vue3 路由守卫（未完成）
    1) 全局守卫
    2) 组件守卫
   
##  六. ### 计算属性

\`\`\`language
<template>
  <div>
    <h3>computed</h3>
    <hr />
    <el-input v-model="sx1"></el-input>
    <el-input v-model="sx2"></el-input>
    <el-input v-model="sx3"></el-input>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
const sx1 = ref("");
// 基础用法【只读】
// const sx2 = computed((a, b)=> sx1.value + " " + sx3.value;);


// 可写【get, set】
const sx2 = computed({
  get(a, b) {
    console.log("get", a, b);
    return sx1.value + " " + sx3.value;
  },
  set(newValue) {
    [sx1.value, sx3.value] = newValue.split(" ");
  },
});
const sx3 = ref("");
<\/script>
<style scoped lang="less"></style>
\`\`\`
## 七. 自定义指令
    全局定义指令
   \`\`\`language
   const directives = function (app) {
    app.directive("test", {
        // 在绑定元素的 attribute 前
        // 或事件监听器应用前调用
        created(el, binding, vnode, prevVnode) {
            console.log("created", el, binding, vnode, prevVnode);
            // 下面会介绍各个参数的细节
        },
        // 在元素被插入到 DOM 前调用
        beforeMount(el, binding, vnode, prevVnode) {
            console.log("beforeMount");
        },
        // 在绑定元素的父组件
        // 及他自己的所有子节点都挂载完成后调用
        mounted(el, binding, vnode, prevVnode) {
            console.log("mounted", el, binding, vnode, prevVnode);
        },
        // 绑定元素的父组件更新前调用
        beforeUpdate(el, binding, vnode, prevVnode) {
            console.log("beforeUpdate");
        },
        // 在绑定元素的父组件
        // 及他自己的所有子节点都更新后调用
        updated(el, binding, vnode, prevVnode) {
            console.log("updated");
        },
        // 绑定元素的父组件卸载前调用
        beforeUnmount(el, binding, vnode, prevVnode) {
            console.log("beforeUnmount");
        },
        // 绑定元素的父组件卸载后调用
        unmounted(el, binding, vnode, prevVnode) {
            console.log("unmounted");
        }
      })
    }
    
    \`\`\`

   全局注册指令
   \`\`\`language
   import directives from "@/utils/directives";
    // import "nprogress/nprogress.css"
    
    const _App = createApp(App);
    _App.use(store).use(ElementPlus).use(router).mount("#app");
    
    directives(_App)
   \`\`\`
`,articleDM:88,createAt:"2023-09-12T02:32:53.000Z",updateAt:"2023-09-12T02:32:54.000Z",userID:6,fixedTop:0,fileDM:144,intro:"undefined"},{articleDM:1713102959809,content:"撒旦发射点法发",createAt:"2024-04-14 21:55:58",title:"d'sa'f",intro:"dsafs'd'fa'f'sa'd'f"}],e=[{type:"基本信息",fields:[{label:"姓名",value:"zzj"},{label:"年龄",value:"24"},{label:"性别",value:"男"},{label:"github地址",value:"https://github.com/xiangCaiOne"}]},{type:"联系方式",fields:[{label:"qq",value:"2683726933"},{label:"邮箱",value:"2683726933@qq.com"}]},{type:"免责说明",fields:[{label:"qq",type:"p",value:"本站以分享互联网经验、学习知识为目的，所有文章所涉及使用的工具、资源等均来自互联网，仅供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请来信告知。本站将在第一时间删除！另外，本站内的文章多为博主原创，大部分是由CSDN平台搬迁过来，仅供学习交流之用，不参与商业用途。"}]}],t="https://github.com/xiangCaiOne";export{n as d,t as g,e as u};
