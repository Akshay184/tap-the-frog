var frog;
 

canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
context=canvas.getContext("2d");

frog = new component(window.innerWidth/4,window.innerHeight/2,"../images/frog.png",80,80,"image");
water = new component(0,window.innerHeight/3,"blue",window.innerWidth-10,window.innerHeight-10);
leave = new component(window.innerWidth/4,window.innerHeight/2+60,"../images/leave.png",100,40,"image");


var startGame={

    jumping:false,
    
     jump:function(){
        console.log("sj")
         window.addEventListener('keydown',function(e){
           startGame.key=e.keyCode;
           console.log("down")
       })
       window.addEventListener('keyup',function(e){
        startGame.key=false;
        // console.log("up")
       
    })
 },
 clear:function(){
    
    context.clearRect(0,0,canvas.width,canvas.height);
}
}
var a = (function game(){
    startGame.jump();
    })();
    

function component(x,y,color,width,height,type){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.speedY=0;
    this.gravity=0.5;
    this.gravitySpeed=0;
    if(type == "image"){
        this.image=new Image();
        this.image.src=color;
    }
    this.update=function(){
   
        if(type == "image"){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
         
        }
        else{
          context.fillStyle=color;
          context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
        this.newPosition=function(){
            // this.gravity+=.1;
            this.gravitySpeed+=this.gravity;
            this.y+=this.gravitySpeed;
            this.gravity+=1;

        }
        this.leaveOnStay=function(){
            
            var collision = window.innerHeight/2;
            if(this.y>collision){
                // console.log("dchu")
                this.y=collision;
                startGame.jumping=false;
                this.gravity=0;
            }
        }
        
}


setInterval(update,20);


function update(){
   
    startGame.clear();
    water.update();
    leave.update();
    frog.newPosition();
    frog.leaveOnStay();
    frog.update();
    
    
   
    if(startGame.key == 37 && startGame.jumping==false){
        frog.gravity-=5;
        startGame.jumping=true;
    }
}

