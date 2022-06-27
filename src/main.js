//引入轮播图js文件逻辑
import './banner'
// 引入tab栏切换js文件的逻辑
import './tabs'

// 引入css文件
import './style/index.css'

// 引入less文件
import './style/index.less'

//引入图片
import imgUrl from './assets/1.gif';

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);