//全局变量
var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    len = pics.length,
    prev = byId("prev"),
    next = byId("next"),
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuItems = menu.getElementsByClassName("menu-item");
//封装一个代替getElementById的方法
function byId(id) {
    return typeof(id) ==="string"?document.getElementById(id):id;
}

function slideImg() {
    var main = byId("main");
    //划过清除定时器，离开继续
    main.onmouseover = function () {
        if(timer) clearInterval(timer);
    }
    //调用事件
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;   //len=3
            if(index>=len){
                index = 0;
            }
            //切换图片
            changeImg();
            //console.log(index);
        },2000);
        
    }
    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //点击原点切换图片
    for(var d=0;d<len;d++){
        //给所有span添加一个id的属性，值为d
        dots[d].id = d;
        dots[d].onclick = function () {
            //改变index为当前span索引
            index = this.id;
            //this.className = "active";
            //实现切换图片
            changeImg();
        }
    }

    //下一张
    next.onclick = function () {
        index++;
        if(index >=len) index=0;
        changeImg();
    }
    prev.onclick = function () {
        index--;
        if(index <0) index=len-1;
        changeImg();
    }
    //导航菜单
    //遍历主菜单，且绑定事件
    for(var m = 0;m<menuItems.length;m++) {
        //给每一个menuitem定义data-index属性，作为索引
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover = function () {
            //alert("hello");
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            //遍历所有子菜单，将每一个都隐藏
            for(var j = 0;j<innerBox.length;j++){
                innerBox[j].style.display = 'none';
                menuItems[j].style.background = 'none';
            }
            console.log(idx);
            innerBox[idx].style.display = 'block';
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        }
    }
    menu.onmouseout = function () {
        subMenu.className = "sub-menu hide";

    }
    subMenu.onmouseover = function () {
        this.className = "sub-menu";
    }
    subMenu.onmouseout = function () {
        subMenu.className = "sub-menu hide";

    }
    
}
//切换图片
function changeImg() {
    //遍历banner下多有的div及dots所有的span,将其隐藏
    for(var i = 0;i<len;i++){
        pics[i].style.display="none";
        dots[i].className = "";
    }
    //根据index找到当前div和span
    pics[index].style.display="block";
    dots[index].className = "active";

}
slideImg();