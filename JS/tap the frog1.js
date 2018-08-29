var frog;
var leave=[];
var q=0;
var leaveDistance=window.innerWidth/4;
var count=1;

canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
context=canvas.getContext("2d");

frog = new component(window.innerWidth/4,window.innerHeight/2,"../images/frog.png",80,80,"image");
water = new component(0,window.innerHeight/3+100,"blue",window.innerWidth-10,window.innerHeight-10);
background = new component(0,0,"../images/background1.png",1608,300,"background");
backgroundwater = new component(0,300,"../images/backgroundriver1.png",1608,455,"background");

for(a=0;a<100;a++){


leave[a] = new component(leaveDistance,window.innerHeight/2+60,"../images/leave.png",100,40,"image");
if(Math.round(Math.random())==0){
leaveDistance+=200;
}
else if(Math.round(Math.random())==1){
     leaveDistance+=100;
}
}


var startGame={

    jumping:false,
    
    frameNo:0,
    
    
     jump:function(){
        console.log("sj")
         window.addEventListener('keydown',function(e){
           startGame.key=e.keyCode;
           
       })
       window.addEventListener('keyup',function(e){
        startGame.key=false;
        // console.log("up")
       
    })
 },
 clear:function(){
    
    context.clearRect(0,0,canvas.width,canvas.height);
},
stop:function(){
    clearInterval(d);
}
}
var forJumping = (function game(){
    startGame.jump();
    })();
    

function component(x,y,color,width,height,type){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.speedY=0;
    this.speedX=0;
    this.gravity=0.5;
    this.gravitySpeed=0;
    if(type == "image" || type=="background"){
        this.image=new Image();
        this.image.src=color;
    }
    this.update=function(){
   
        if(type == "image" || type=="background"){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
         
        }
        
    }
        this.newPosition=function(){
           
            // this.x+=this.speedX;
            this.gravitySpeed+=this.gravity;
            this.y+=this.gravitySpeed;
            this.gravity+=1;
            

        }
        this.backgroundNewPosition=function(){
            this.x+=this.speedX;
        
        }
        this.backgroundUpdate=function(){
            if(type == "background"){
                this.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
            }
        }
        this.collisionDetection=function(){

            this.top=this.x;
            this.bottom=this.x+this.height;
            
            var collision = leave[0].y-60;
            if(this.y>collision){
                // console.log("dchu")
                this.y=collision;
                startGame.jumping=false;
                this.gravity=0;
                this.gravitySpeed=0;
                
            }
        }
        
}


var d = setInterval(update,20);


function update(){
   
    startGame.clear();
    background.update();
    
    backgroundwater.backgroundNewPosition();
    backgroundwater.update();
    background.backgroundNewPosition();
    // background.backgroundUpdate();
    
    // water.update();
   
    frog.newPosition();
    frog.collisionDetection();
    // frog.update();
    
    startGame.frameNo+=1;

    
   
     
    if(startGame.key == 37 && startGame.jumping==false ){
        count=0;
        // backgroundwater.speedX-=1;
        // background.speedX=-1;
        frog.gravity-=5;
        startGame.jumping=true;
        for(var q=0;q<100;q+=1){
          leave[q].x-=100; 
          if(leave[q].x==frog.x){
            count=1;
            
          }
            
     }
     console.log(count)
    }
    
    if( startGame.key == 39 && startGame.jumping==false){
        count=0;
     frog.gravity-=5;
     startGame.jumping=true;
     for(var q=0;q<100;q+=1){
          leave[q].x-=200;
          if(leave[q].x==frog.x){
              count=1;
              
          }
         
     }
     
 }
 console.log(count)

      if(count==0){
          startGame.stop();
        //   console.log("chal ja")

      }
      
 
    for(var w=0;w<100;w++){
       
        
    leave[w].update();
    
   
          
    }
    frog.update();


}


