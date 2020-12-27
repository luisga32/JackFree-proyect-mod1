class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.fps = 1000 / 60;
    this.board = new Board(this.ctx);
    this.player = new Player(this.ctx, POSX_INI_PLAYER, POSY_INI_PLAYER)
    this.objects = []
    this.ghosts = []
    this.numMaxGhosts = 5
    this.addGhostTimeoutID = undefined;
    this.drawInterval = undefined;
    this.objCountDraw = 0
    this.numMaxobjects = 5;
    this.points = 0
    this.numghosts = 0
    this.ghostY = 0;
    this.ghostX = 0;
    this.newGroupGhosts = true;
    this.newGhost = undefined;
    this.ghostimgWidth = 33.64;

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



        if (this.numghosts < this.numMaxGhosts) {
          this.addGhost();

        }
        else {
          this.addGhostTimeoutID = setTimeout(() => {
            this.numghosts = 0;
            this.ghostY = 0;
            this.newGroupGhosts = true;
          }
            , GHOST_FRAME)
        }




        this.objCountDraw++
        if (this.objCountDraw % OBJECTS_FRAME === 0 && this.objects.length < this.numMaxobjects) {
          this.addObject();
          this.objCountDraw = 0
        }

        //      this.obstDrawCount++
        // add obstacles  
        //      if (this.obstDrawCount % OBSTACLES_FRAMES === 0) {
        //           this.addObstacle()

        //          this.obstDrawCount = 0
        //        }
        //check collitions
        this.checkCollisions();
      }, this.fps)
    }
  }


  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.clearGhosts();
  }




  draw() {
    this.board.draw();
    this.player.draw();
    this.objects.forEach(object => object.draw());
    this.ghosts.forEach(ghost => ghost.draw());



  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);

  }

  move() {
    this.player.move();
    this.ghosts.forEach(ghost => ghost.move())
  }

  addObject() {
    // select one object ramdomly from IMAGES array
    const index = Math.floor(Math.random() * IMAGES.length);
    // calculate position in board.

    let newObject = new Object(this.ctx, IMAGES[index]);
    // checks if there is some object in the coordenates calculates for the new object. In that case recalculate the coordenates
    while (this.objects.some(object => newObject.collideWith(object))) {
      newObject = new Object(this.ctx, IMAGES[index]);
    }


    //add object to objects array
    this.objects.push(newObject);

  }

  addGhost() {

    if (this.newGroupGhosts) {
      this.ghostX =Math.floor(Math.random() * (this.width - this.ghostimgWidth))
      this.newGhost = new Ghost(this.ctx, this.ghostX, this.ghostY);
      this.newGroupGhosts = false;
    } else {
      if (this.newGhost.isReady()) {
        this.ghosts.unshift(this.newGhost);
        this.numghosts++;
        if (this.numghosts < this.numMaxGhosts) {

          this.newGhost = new Ghost(this.ctx, this.ghostX, Math.floor(this.newGhost.y - this.newGhost.height));
        }

      }
    }

  }



  clearGhosts(){
    this.ghosts = this.ghosts.filter(ghost => ghost.y  <= this.height);
   }
  
  // check collitions between playes and the others elements of the screen 
  checkCollisions() {
    // collitions with ghosts
    const ghostCollided = this.ghosts.some(ghost => this.player.collidesWith(ghost));

    if (ghostCollided){
   /*   console.log(`object collidewith x :${this.x} y:  ${this.y} 
              width ${this.width}
              heigh ${this.height}
              element x :${element.x} element y:  ${element.y} 
              width ${element.width}
              heigh ${lement.height}
            
              `)
     */
              this.pause();
    }
      // collition with and object 
      const objCollided = this.objects.filter(object => this.player.collidesWith(object));
      let index;
      if (objCollided.length > 0) {
        for (let i = 0; i < objCollided.length; i++) {
  
          this.points += objCollided[i].object.points;
          //    console.log(this.points) 
  
          objCollided[i].pointsDraw();
          index = this.objects.indexOf(objCollided[i]);
          this.objects.splice(index, 1);
        }
  
  
      }

  }
  pause(){
    clearInterval(this.drawInterval)
  }

  // class end
}