//  修改文章路由 替换网址路径 例如将 http://127.0.0.1:8081/#/home/list ==》  http://127.0.0.1:8081/#/editor
// 文章列表配置 
// https://zzj634870514.github.io/#/editor

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
        // 文章数据加在这
        {
          "articleDM": 1713172707003,
          "content": "fsdfsdfsdf",
          "createAt": "",
          "title": "asfdsadf",
          "intro": "sdfsdfsd"
        }
        
    ],
    // 个人信息配置 
    userInfo: [
        {
            type: '基本信息',
            fields: [
                {
                    label: '姓名',
                    value: 'zzzzz'
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
