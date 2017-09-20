# Dom 是什么？
 Document Object Model(文档对象模型)

 我们在页面中看到的div span p h 等等元素或文字，在js中都是一个对象

 #从一个web应用的开发说起

 > 从页面中选取一个元素出来
   当我们的代码在浏览器中运行时，浏览器已经帮我们创建了很多对象；对象中有很多方法，可供我们使用，这些东西都在叫做window的全局变量里
 
 > window对象中的属性，可以省略window. 去调用；
 
 > 选取元素，我们从window.document开始
 
 ## 快速从document中取出一些DOM对象的方法
    * document.body
    * document.head
    * document.title
    * document.documentElement  代表了整个HTML标签中的一个DOM对象

 ## 选取元素的方式
 
 > document.querySelector()
 > document.getElementById()

   返回结果是代表了页面中某个元素的对象，我们叫Dom对象

 > document.querySelectorAll()
 > document.getElementsByClassName()
 > document.getElementsByTagName() 
 > document.getElementsByName() 

   返回结果是一个类数组对象，我们叫Dom集合,对象中用
   ...javascript
   var obj={
   0:Dom对象;
   1:Dom对象;
   2:Dom对象;
   ...
   length:12;
   }

## Dom对象中常用的属性和方法

### object
	
	* toString()
	* valueOf()

## EventTarget
	
	* addEventListener()
	* removeEvent()
	* dispatchEvent()

## Node

> 所有的DOM对象都是一个节点，这三个节点用来描述节点

  * nodeName
	* nodeType
	* nodeValue

> 我们能从每个DOM对象身上取到自己的相邻或父或子节点

    * childNodes   DOM集合(NodeList)
    * firstChild   DOM对象
    * lastChild

	* parentElement
	* parentNode  

	* nextSibing
  * previousSibling

> 获取节点的文本内容

	* textContent

> 每个DOM对象中都提供了一些操作节点的方法

  采用 父DOM对象.***(DOM对象)这种方式的

	* appendChild()
	* insertBefore()

	* replaceChild()
	* removeChild()
	* hasChildNode()   //el.children.length
	* contains()  判断一个节点中包不包含另外一个节点

	* cloneNode()  (true,flase)

## Element

> 元素和节点的区别

 *带标签的都既是元素又是节点
 * 不带标签，如DIV里的文字等，注释 他们只是节点不是元素

> 从一个DOM对象开始，获取父、子、兄弟元素

	* children  取一个DOM对象的所有子元素  DOM集合
	* firstElementChild
	* lastElementChild

	* nextElementSibling
	* previousElementSibling

> 对元素属性的操作 (HTML元素的属性 就是头标签里的那些 K=""中的k)
	* classList  (add remove toggle contians)
	* className  (可读写)
	* id         (可读写)
	* getAttribute()   
	* setAttribute()        没有返回值，只是一个操作
	* hasAttribute()        判断头标签中有没有某个属性
  * removeAttribute()     没有返回值，只是一个操作

  * outerHTML
	* tagName

> 获取该元素的视窗坐标n或者其他与位置相关的信息

	* getBoundingClientRect()  返回值是一个对象{top:1,left:1,bottom:1,width:1,height:1}
  * scrollLeft  
	* scrollTop     可读写
	  document.body.scrollTop;
	* clientWidth    一般用来结合document.documentElement.clientWidth
	* clientHeight  

> 从某个DOM对象开始，可以缩小范围继续查找元素

	* getElementByClassName()
	* getElementByTagName()
	* querySelector()
	* querySelectorAll
	
## HTMLElement
    
  * innerHTML   可读写 能设置某个DOM对象内部的html结构
	              不要使用 el.innerHTML +='<div></div>'这种方式
	
	* innerText   直接获取文本

   //实时获取元素信息
	* offsetHeight
	* offsetLeft
	* offsetWidth
	* offsetTop
	* offsetParent    具有定位属性(非static)的祖先元素  返回值 一个DOM对象

> 操作元素行内样式

	* style   可读写  读的时候实时获取元素行内样式的值，不会计算css
	          文件中定义的属性

## HTML *** Elment

    * value
    * checked
    * src

# 添加事件的两种方式及其区别
  
  ...javascript

  
  我们给DOM对象的onclick属性赋值，值为一个函数
  这次赋值和普通对象的赋值不太一样
  js会告诉浏览器，密切关注这个元素，如果有人点击它
  帮我把这个函数运行一下
  运行函数的时候给我传一个参数，参数为一个对象
  对象中详细的记录这次点击的一些信息 这个对象被称为事件对象

 //1.使用 on***
  var el=document.getElementById('box');
  el.style.color='red';
  el.onclick=(function(e){
     return function(){

     }
  })();

 //2.使用 addEventListener
  el.addEventListener('click',function(e){
  console.log(e)
  },false)

> 区别
 * 一些H5事件并没有on**这个版本
 * on***再赋值一次，会覆盖上次赋值的那个函数，addEventListener 没有这个问题
   他可以给一个事件添加多个函数，事件触发的时候，按照添加顺序，逐个调用处理函数

## 自定义事件

click dblclick => threeclick

...javascript
 
 var threeclick =new Event('threeclick');
 var box = document.querySelector('.box');
 box.addEventListener('threeclick',function(){
   console.log(1);
})
 box.dispatchEvent(threeclick);

## 阻止事件冒泡和阻止事件默认行为

> 从页面结构上去调整 让元素之间不再是包含关系
> 使用事件对象身上的 stopPropagation() 这个函数
  e.stopPropagation();

> 不要给自定义事件调用

## 阻止事件默认行为
   要从事件根源去组织默认行为
   
   yi.addEventListener('onmousedown',function(e){
       e.preventDefault();
   })

## 回调函数

> 当我们把函数x作为参数传给函数y,函数y内部有对函数x的调用；
  我们把函数x叫做回调函数

> 如果是类数组对象的遍历，我们遍历的时候可以使用
 var arr = [];
 forEach = arr.forEach;
 filter = arr.filter;
 var els=document.querySelectorAll('div');
 forEach.call(els,function(v){
  console.log(v) v就是dom集合中的dom对象
})