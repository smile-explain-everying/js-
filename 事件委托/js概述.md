## js是一种程序语言（一种和计算机交流的语言）

## 计算机就是用来做计算的
  （程序语言就是一条条的人类可读的指令，告诉计算机怎么计算）

## 一门程序语言必须具备一些能力，才能和计算机交流明白。必须很清楚的告诉计算机怎么存储数据，
   必须很清楚的告诉计算机怎么做逻辑操作

### js中的逻辑操作（+ - / * && || ！===  !== >= <== < >  ）
    * if(){}  
    * if(){}else{}
    * if(){}else  if(){}else if(){}else{}
    * switch(val){}

 ## 数据存储
    var _v=1           Number
    var _v='ghh'       String
    var _v=[b,h,k]     Array
    var _v={d:1,h:2}   object
    var _v=undefined   undefined
    var _v=null        null
    var _v=true        Boolean
    var _v=function(){}

## console.dir(输出一个对象的内部结构)

## js中用类似于表的形式来存储数据(对象)

## 函数
	 var fn=function(){
	 console.log(1);
	 return 1;
	}
	(在控制台中输出函数时，函数内部的东西看不见)

## 函数对象会用一个不可见的属性' 调用'来存储函数体中的代码
   {'调用':'console.log(1);return 1'}
   函数这个对象相比其他对象的特殊之处在于它可以被调用；
   函数名+（）可以调用函数

## 定义函数的时候发生了？
   要把代表函数的那张表构建完全
   1，'调用'这个属性要赋值，函数体内部的字符串
   2，需要把当前可见范围内的所有变量，由近到远的记录到一个链条中，形成一条作用域链

## 调用函数的时候发生了？
   函数对象会去读取自己身上'调用'这个属性的值，取出来一些字符串，把这些字符串交给
   js解析器去当作js代码去执行，与此同时还会取出函数的作用域链，用来辅助代码的执行

## 函数中的this是什么？
   只有在函数中才有this
   函数在定义的时候 this什么都不是
   函数在调用的时候，根据调用的不同情况，来决定this变成什么

##有哪些不同的调用方式？
  //正常调用的一种方式
	  var fn=function(){
	  console.log(this)
	  }
	  fn();
> //正常的定义一个函数（不把函数作为某个对象的属性）
> //正常的调用一个函数（使用（）的方式调用函数）
> //this都是指向window对象

 ...javascript
   var obj={
   a:1;
   b:2;
   c:function（）｛
   console.log(this);
   }
}
obj(c);

var el=document.getElementById('aa');
el.onclick=function(){
	console.log(this);
}
el.onclick({clientX:183,clientY:11});

> //this指向obj对象 指向他的宿主对象

..javascript
>//如果我们需要把this换成任何我们想要的对象；
   我们需要借助函数对象身上的call和apply
   var obj={a:1,b:2};
   obj.c=function(){
   console.log(this)
}
	obj.c() this依然指向obj对象
	obj.c.call([1,2,3]);
	obj.c.apply([1,2,3],[2,3]),
	this指向call方法中的第一个参数；

## 用来展示信息的web页面中
## 用在 web app中去除一些数据

# localstorage.setItem("d",120)
  会在浏览器中存储一些数据（只能是字符串）
# localstorage.getItem('d')
  //会从本地存储中取出一些数据（只能是字符串）
# localstorage.removeItem
  从本地删除一条数据

# JSON.stringify()
  //把对象转换成字符串
# JSON.parse()
  //把字符串转换成对象或数组