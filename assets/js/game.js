class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.width= this.ctx.canvas.width;
        this.height = this.ctx.canvas.height; 
        this.fps = 1000 / 60;
        this.board= new Board(this.ctx);
        this.player= new Player(this.ctx,POSX_INI_PLAYER,POSY_INI_PLAYER)
        this.objects = []
        this.drawInterval =undefined;
   
    }
    startGame() {
     
       
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
              //console.log('start game')
               // control de pulsaciones del teclado
      //        this.setListeners()
              // limpio canvas
       //       this.clear()
              //muevo objetos
        //      this.move()
              // check collitions betwwen car and obstacles
              
              // dibujo objetos
              this.clear();
              this.move();
              this.draw();
              this.addObject();
        //      this.obstDrawCount++
              // add obstacles  
        //      if (this.obstDrawCount % OBSTACLES_FRAMES === 0) {
     //           this.addObstacle()
      
      //          this.obstDrawCount = 0
      //        }
              //check collitions
    //          this.checkCollisions();
            }, this.fps)
          }
    }
    

    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
  



 draw(){
     this.board.draw();
     this.player.draw();
     this.objects.forEach(object =>object.draw());  
    

     
 }

 onKeyEvent(event){
   this.player.onKeyEvent(event);

 }

 move (){
   this.player.move();
 }

 addObject (){
 // select one object ramdomly from IMAGES array
  const index = Math.floor(Math.random() * IMAGES.length);
 // calculate position in board.
 let objX = Math.floor(Math.random()*(this.width))
 let objY = Math.floor(Math.random()*(this.height))
 
  const object = new Object(this.ctx,objX,objY,IMAGES[index]);
  
 
  
  //add object to objects array
  this.objects.push(object);

 }
// class end
}