//封装函数
//1.获取页面中指定的classname的元素

function getClassName(classname,obj){//确定函数中的形参；两个 一个为指定的classname，另一个为调用方法的对象
      var obj=obj||document;        //可以指定对象 若没有指定 则默认为document
      if(obj.getElementsByClassName){                         //考虑浏览器的兼容性问题 判断浏览器是否支持该方法（有没有这个属性）
            return obj.getElementsByClassName(classname);   //如果浏览器支持则直接返回调用方法输出的值
      }else{                                             //如果浏览器不支持则调节兼容性问题
            var arr=[];       //   定义一个空数组 存储页面中的classname
            var alls=document.getElementsByTagName("*");//获取页面中所有的元素
            for(var i=0;i<alls.length;i++){                 //将获取的元素与指定的classname一一比较
                   if(checkClass(alls[i].className,classname)){  //如果满足 则把它放入定义的空
                             arr.push(alls[i]);                //数组中调用check函数即往数组中添加新元素
                   }
            }
            return arr;                                   
      }
}


 
function checkClass(search,match){      //确定两个参数
    var brr=search.split(" ");          //多个classname输出来为字符串 将它转化为数组 与指定classnam比较
       for(var i=0;i<brr.length;i++){          //将转化的数组一一与其比较 如果符合则输出true
           if(brr[i]==match){
                 return true;
           }
       }
       return false;
}
//2.对文本内容进行操作

function getInner(obj,value){   //确认函数的两个参数 一个是对象 一个是要设置的参数
     if(obj.textContent){
           if(value==undefined){
                return obj.textContent; //判断vlaue是否有值
           }else{
                 obj.textContent=value;
           }
     }else{
          if(value==undefined){
                return obj.innerText;
           }else{
                 obj.innerText=value;
           }
     }
}
// 3.嵌入样式和外部样式通用的获取方法
  function getStyle(obj,style){
      if(obj.currentStyle){
         return obj.currentStyle[style];
      }else{
        return getComputedStyle(obj,null)[style]
      }




  }
//4.$函数"#one"".one""div"
function $(search,obj){      //确认函数的两个参数 
    var obj=obj||document;  
    if(search.charAt(0)=="#"){    //通过比较第一个字符判断它属于哪一种类型
          return document.getElementById(search.substr(1)); //输出截取的字符
    }else if(search.charAt(0)=="."){
         return getClassName(search.substr(1),obj);
    }else{
      return obj.getElementsByTagName(search)
    }

}
//5.获取子节点
// 思路：通过父节点获取字节点，所以要先给一个父节点(即调用相关属性的对象)
//       (对象.childNodes 获得子节点的集合.)
//       分析需求：1.只获取元素节点  '"a".2.获取元素节点和文字节点(清除的空格节点)"b"
function getChild(obj,type){
     var type=type||"a";       //定义type的初始值
     var all=obj.childNodes;   //获取父子点中的所有子节点
     // 用循环将所有子节点一一拿出来。
     var arr=[];
     for(var i=0;i<all.length;i++){
            // 判断每一个子节点是否符合需求
            if(type=="a"){
                if(all[i].nodeType==1){
                    arr.push(all[i]);
                }
            }else if(type=="b"){
                if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,""))){ 
                    arr.push(all[i]);
                }
            }
            
     }
     return arr;
}
// 6.获取第一个子节点
// 对象.firstChild 获得第一个子节点的引用
function getFirst(obj){
      return getChild(obj)[0];
}
// 7..获取最后一个子节点
function getLast(obj){
      var nub=getChild(obj)
      return  nub[nub.length-1];
}
// 8.获得下一个兄弟节点  对象.nextSibling 获得下一个兄弟节点的引用
function getNext(obj,type){
    var type=type||"a";
    var next=obj.nextSibling;
    if(type=="a"){
          while(next.nodeType==3||next.nodeType==8){
              next=next.nextSibling     //将下一个节点赋值给next
              if(next==null){
              return false;
              }
          }
    }else if(type=="b"){
            while((next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,""))||next.nodeType==8){
                    next=next.nextSibling     //将下一个节点赋值给next
                    if(next==null){ 
                    return false;
                    }
            }
    }
    
    return next;
}
// 9.获得上一个兄弟节点         对象.previousSibling 获得上一个兄弟节点的引用
// function getPrevious(obj){
//     var previous=obj.previousSibling;
//     if(previous==null){
//        return false;
//     }
//     while(previous.nodeType==3||previous.nodeType==8){
//        previous=previous.previousSibling;     //将下一个节点赋值给next
//        if(previous==null){
//            return false;
//        }
//     }
//     return previous;
// }
// 10.追加到页面当中父对象.insertBefore(要插入的对象,之前的对象) 插入到某
// 个对象之前
function insertBefore(obj,before){
     var parent = before.parentNode;
     parent.insertBefore(obj,before);
}
// 11.插入到某个对象之后  即某个对象的后一个的前一个
function insertAfter(obj,after){
     var next = getNext(obj,"b");
     var parent=after.parentNode;
     if(next){       //真
      insertBefore(obj,next);
     }else{
      parent.appendChild(obj);  //没有下一个兄弟节点；直接添加在父节点下
     }

}