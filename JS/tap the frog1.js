var frog;
var leaf=[];
var q=0;
var leafDistance=window.innerWidth/4;
var count=1;
var score1=0;

canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth-20;
canvas.height=window.innerHeight-10;
context=canvas.getContext("2d");

frog = new component(window.innerWidth/4,window.innerHeight/2,"../images/frog.png",80,80,"image");
background = new component(0,0,"../images/background2.png",1608,300,"background");
backgroundwater = new component(0,300,"../images/water4.png",1608,455,"background");
wave = new component(0,300,"../images/wave.png",400,100,"background");
wave1 = new component(500,600,"../images/wave.png",400,100,"background");
score = new component(window.innerWidth-300,100,"black","50px","Consolas","text");
gameOver = new component(window.innerWidth/2,window.innerHeight/2,"black","50px","Consolas","text");
// splash = new sound("../music/Video_Game_Splash-Ploor-699235037.mp3");
// backgroundsound = new sound("../music/melodyloops-preview-cheerful-background-2m30s.mp3");
jumpSound= new sound("../music/Jump-SoundBible.com-1007297584.mp3");


for(a=0;a<100;a++){
leaf[a] = new component(leafDistance,window.innerHeight/2+60,"../images/leave.png",100,40,"image");
if(Math.round(Math.random())==0){
    leafDistance+=200;
}
else if(Math.round(Math.random())==1){
    leafDistance+=100;
}
}


var startGame={

    jumping:false,
    
    frameNo:0,
    
    
    jump:function(){
        window.addEventListener('keydown',function(e){
        startGame.key=e.keyCode;    
    })
    window.addEventListener('keyup',function(e){
        startGame.key=false;
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
    
    function sound(src){
        this.sound=document.getElementById("track1");
        this.sound.src=src;
    
        this.play=function(){
            this.sound.play();

        }
        this.stop=function(){
            this.sound.pause();
            this.sound.currentTime=0;
        }
    }
    


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
        if(type=="text"){
        context.font=this.width+" "+this.height;
            context.fillStyle=this.color;
            context.fillText(this.text,this.x,this.y);
        }
    
        
        
    }
    this.backgroundUpdate=function(){
        if(type == "background"){
            context.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
        
        }
        
    }
        this.newPosition=function(){
            this.gravitySpeed+=this.gravity;
            this.y+=this.gravitySpeed;
            this.gravity+=1;
         }
        this.backgroundNewPosition=function(){
            this.x+=this.speedX;
            if(type=="background" && this.x<=-this.width){
                this.x=0;
            }
        }
    
        this.collisionDetection=function(){

            this.top=this.x;
            this.bottom=this.x+this.height;
            
            var collision = leaf[0].y-60;
            if(this.y>collision){
                this.y=collision;
                startGame.jumping=false;
                this.gravity=0.5;
                this.gravitySpeed=0;
                backgroundwater.speedX=0;
                background.speedX=0;
                jumpSound.stop();
            }
        }
        
    }


  var d = setInterval(update,30);


   function update(){

    startGame.clear();
    

    background.backgroundNewPosition();
    
    background.update();
    background.backgroundUpdate();


    


backgroundwater.backgroundNewPosition();

    backgroundwater.update();
    backgroundwater.backgroundUpdate();
    
    wave.speedX=-5;
    wave1.speedX=-4;
    wave.backgroundNewPosition();
    wave1.backgroundNewPosition();

    frog.newPosition();
    frog.collisionDetection();
    startGame.frameNo+=1;
    score.text="SCORE: "+ score1;
    score.update();
    
    if(startGame.key == 37 && startGame.jumping==false ){
        count=0;
        score1++;
        jumpSound.play();
        
        frog.gravity-=5.5;
        startGame.jumping=true;
        for(var q=0;q<100;q+=1){
        leaf[q].x-=100; 
        if(leaf[q].x==frog.x){
            count=1;
            backgroundwater.speedX=-5;
            background.speedX=-1;
        
        }
            
    }
    
    }
    
    if( startGame.key == 39 && startGame.jumping==false){
        count=0;
        score1++;
        
        jumpSound.play();
    frog.gravity-=5.5;
    startGame.jumping=true;
    for(var q=0;q<100;q+=1){
        leaf[q].x-=200;
        if(leaf[q].x==frog.x){
            count=1;
            backgroundwater.speedX=-5;
            background.speedX=-1;
            
        }
        
    }
    
}
    



    if(count==0){
        
        startGame.stop();
        gameOver.text="gameover"+" "+ "Score: "+ --score1;
        gameOver.update();
    }
    for(var w=0;w<100;w++){
    leaf[w].update();
    }
    if(frog.y<window.innerHeight/2-100){
        frog.image.src="../images/no29.png";
        frog.width=100;
        frog.height=100;
    }
    else if(frog.y>window.innerHeight/2-200 && frog.y<window.innerHeight/2-20 ){
        frog.image.src="../images/no14.png";
        frog.width=160;
        frog.height=130;
    }
    else{
        frog.image.src="../images/frog.png";
        frog.width=80;
        frog.height=80;
    }

    frog.update();
}


