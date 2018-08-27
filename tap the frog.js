 var frog;

function startGame(){
    gameArea.start();
    // frog.update();

    console.log("dghs")
     frog = new component(window.innerWidth/3,window.innerHeight/2,"green",20,20);
}
 var gameArea={
     canvas:document.createElement("canvas"),
     start:function(){
         this.canvas.width=window.innerWidth;
         this.canvas.height=window.innerHeight;
         this.context=this.canvas.getContext("2d");
         document.body.insertBefore(this.canvas,document.body.childNodes[0]);
         this.interval=setInterval(updateGame,50);
     },
     clear:function(){
         this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
     }
    
 }
  function component(x,y,color,width,height){ 
   
     this.width=width;
     this.height=height;
     this.x=x;
     this.y=y;
    //  window.onload=function(){
        this.update= function(){
         console.log("dh")
     ctx=gameArea.context;
     ctx.fillStyle=color;
     this.y+=-1;
     ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }

// window.onlaod=function(){
//     var img=document.getElementById("frogImage");
//     // frog.image.src="frog.png";
//     ctx=gameArea.context;
//     ctx.drawImage("frog.png",10,10);
// // }
// window.onload= frog.update();
function updateGame(){
    gameArea.clear();
    frog.update();
    console.log("4")
}