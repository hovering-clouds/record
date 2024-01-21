import * as myrdm from "./say.js";

const imglist = document.querySelectorAll("img");
reload_exclude();
for(var ind=0;ind<imglist.length;ind++){
    let img = imglist[ind];
    if(img.getAttribute("reload-exclude")==1){continue;}//注意js中==会尝试将字符串转化为数字再进行比较
    img.setAttribute("retry",0);
    img.onerror=(e)=>{reloadimg(img);};
}

function reloadimg(img) {
  let retry = parseInt(img.getAttribute("retry"));
  // 开启一个定时器,这里每1500ms执行一次
  let timer = setTimeout(() => {
    // 如果重试次数大于2
    if (retry > 1) {
      console.log("连接失败");
      // 图片使用占位图片url
      img.src =
        "https://www.wetools.com/imgplaceholder/800x400?text=图片太帅，无法显示"; // 存在的图片地址
      img.onerror = null; //防止占位图片也失效，从而无限循环
      // 清除定时器
      clearTimeout(timer);
    } else {
      // 重试次数在规定内
      console.log("重试次数", retry+1);
      // 计数器+1
      retry += 1;
      img.setAttribute("retry", retry);
      img.setAttribute("src",img.src); //重新加载
    }
  }, 500*myrdm.randomNum(2,5));//随机等待1~2.5s之后重新加载，避免扎堆集中加载导致再次429
}

//添加一些排除标记
function reload_exclude(){
  let excld = document.querySelectorAll(".link-avatar img");
  for(var i = 0;i<excld.length;++i){
    excld[i].setAttribute("reload-exclude",1);
  }
}

/*
//头图用的是background,之前的img选择器无法选取，需要额外工作
function reload_banner() {
  let bnr_lst = document.querySelectorAll(".banner");
  for(var i = 0;i<bnr_lst.length;++i){
    let bnr = bnr_lst[i];
    bnr.setAttribute("retry",0);
    bnr.onerror = (e)=>{banner_handler(bnr);}
  }
}

function banner_handler(bnr) {
  let retry = parseInt(bnr.getAttribute("retry"));
  // 开启一个定时器,这里每1500ms执行一次
  let timer = setTimeout(() => {
    // 如果重试次数大于2
    if (retry > 2) {
      console.log("连接失败");
      // 图片使用占位图片url
      bnr.style.background = "" // 存在的图片地址
      // 清除定时器
      clearTimeout(timer);
    } else {
      // 重试次数在规定内
      console.log("重试次数", retry+1);
      // 计数器+1
      retry += 1;
      bnr.setAttribute("retry", retry);
      bnr.style.background = bnr.style.background; //重新加载
    }
  }, 1500);  
}*/