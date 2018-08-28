var frog;
var leave=[];
var q=0;
var leaveDistance=window.innerWidth/4;

canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth-10;
canvas.height=window.innerHeight-10;
context=canvas.getContext("2d");

frog = new component(window.innerWidth/4,window.innerHeight/2,"../images/frog.png",80,80,"image");
water = new component(0,window.innerHeight/3,"blue",window.innerWidth-10,window.innerHeight-10);

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


setInterval(update,20);


function update(){
   
    startGame.clear();
    water.update();
   
    frog.newPosition();
    frog.collisionDetection();
    // frog.update();
    
    startGame.frameNo+=1;

   
    if(startGame.key == 37 && startGame.jumping==false ){
        frog.gravity-=5;
        startGame.jumping=true;
        for(var q=0;q<100;q+=1){
          leave[q].x-=100;
          
          
     }
    }
    
     if(startGame.key == 37 && startGame.jumping==false ){
        frog.gravity-=5;
        startGame.jumping=true;
        for(var q=0;q<100;q+=1){
          leave[q].x-=100;
          
          
     }
    }
    if( startGame.key == 39 && startGame.jumping==false){
     frog.gravity-=5;
     startGame.jumping=true;
     for(var q=0;q<100;q+=1){
          leave[q].x-=200;
          console.log("s")
          
     }
 }
    for(var w=0;w<100;w++){
    leave[w].update();
//     leave[w].x-=5;
//     leave[i]+=20;
    }
    frog.update();


}


