class Board{
    
    constructor(ctx){
        this.ctx=ctx;
        this.width=this.ctx.canvas.width;
        this.height=this.ctx.canvas.height;
        this.x=0
        this.y=0
     

    

        // End constructor

    }
/*
    clear(){
        this.ctx.clearRect(0,0,this.width,this.height);

    }
  */
    draw(){
     
        this.ctx.fillStyle ='green';
        
        this.ctx.fillRect(0,0,this.width,this.height);
        
    }



}