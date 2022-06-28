//引入轮播图js文件逻辑
import './banner'
// 引入tab栏切换js文件的逻辑
import './tabs'

// 引入css文件
import './style/index.css'

// 引入less文件
import './style/index.less'

// 引入字体图标文件
import './assets/fonts/iconfont.css'

//引入图片
import imgUrl from './assets/1.gif';

// 引入vue文件
import './index.vue'

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

class App {
    static a = 123
}

console.log(App.a)