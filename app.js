// app.js
App({
    onLaunch() {
        //云开发初始化
        wx.cloud.init({
            //把env替换成你自己的云开发环境id
            env: 'cloud1-7gds59rg89b83774',
        })
    }
})