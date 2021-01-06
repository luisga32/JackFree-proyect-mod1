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

    this.theme = new Audio('./assets/sound/ghost02.mp3')
    this.theme.volume = 0.2
    this.captureSound = new Audio('./assets/sound/shooting_star-Mike_Koenig-1132888100.mp3')
    this.captureSound.volume = 0.2
    this.state = {
      new: true,
      pause: false,
      ended: false

    }

  }



  startGame() {


    if (!this.drawInterval) {

      this.drawInterval = setInterval(() => {
        //console.log('start game')
 
  
        this.theme.play();
        this.clear();
        this.move();
        this.draw();
        //check collitions
        this.checkCollisions();
        // add Ghost
        this.validateAddGhost();
        // add object to capture
        this.validateAddObject(); 




      }, this.fps)
    }
  }


  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.clearGhosts();
  }




  draw() {
    this.board.draw();
    this.drawScore();
    this.objects.forEach(object => object.draw());
    this.ghosts.forEach(ghost => ghost.draw());
    if (this.player.isPlayerDead()) {
  

      this.player.drawDead();

      this.pause()
    } else {
      this.player.draw();

    }




  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);

  }

  move() {
    this.player.move();
    this.ghosts.forEach(ghost => ghost.move())
  }
  validateAddObject() {
    this.objCountDraw++
    if (this.objCountDraw % OBJECTS_FRAME === 0 && this.objects.length <= this.numMaxobjects) {
      if (this.objects.length < this.numMaxobjects) {
        this.addObject();
      } else {
        this.removeObject();
      }
      this.objCountDraw = 0
    }

  }

  addObject() {
    // select one object ramdomly from IMAGES array
    const index = Math.floor(Math.random() * IMAGES.length);
    // create a new object

    const newObject = new Object(this.ctx, IMAGES[index]);


    // checks if there is some object in the coordenates calculates for the new object. In that case create a new object
    const objIntervalId = setInterval(() => {
      if (newObject.isReady()) {
        if (this.objects.some(object => newObject.collideWith(object))) {
          this.addObject();
        } else {
          this.objects.push(newObject);

        }

        clearInterval(objIntervalId);
      }
    })
 

  }
  removeObject() {
    this.objects.shift();
  }

  validateAddGhost() {
    if (this.numghosts < this.numMaxGhosts) {
      this.addGhost();

    }
    else if (!this.addGhostTimeoutID) {

      this.addGhostTimeoutID = setTimeout(() => {
        this.numghosts = 0;
        this.ghostY = 0;
        this.newGroupGhosts = true;
        this.addGhostTimeoutID = undefined;
      }
        , GHOST_FRAME)
    }
  }


  addGhost() {

    if (this.newGroupGhosts) {
      this.ghostX = Math.floor(Math.random() * (this.width - this.ghostimgWidth))
      this.newGhost = new Ghost(this.ctx, this.ghostX, this.ghostY);
      if (!this.ghosts.some(ghost => this.newGhost.collidesWith(ghost))) {
        this.newGroupGhosts = false;
      }
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



  clearGhosts() {
    this.ghosts = this.ghosts.filter(ghost => ghost.y <= this.height);
  }

  // check collitions between playes and the others elements of the screen 
  checkCollisions() {
    // collitions with ghosts
    const ghostCollided = this.ghosts.some(ghost => this.player.collidesWith(ghost));

    if (ghostCollided) {
      this.state.ended = true
      this.player.CreateplayerDead();

    }
    // collition with and object 
    const objCollided = this.objects.filter(object => this.player.collidesWith(object));
    let index;
    if (objCollided.length > 0) {
      this.captureSound.play();
      for (let i = 0; i < objCollided.length; i++) {

        this.points += objCollided[i].object.points;
        //    console.log(this.points) 

        objCollided[i].pointsDraw();
        index = this.objects.indexOf(objCollided[i]);
        this.objects.splice(index, 1);
      }


    }

  }
  pause() {

    this.state.pause = true;
    const startButton = document.getElementById("start-button");
    startButton.disabled = false;
    this.theme.pause();

    clearInterval(this.drawInterval)

  }
  initialice() {
    const startButton = document.getElementById("start-button");
    startButton.disabled = true;

    if (this.state.ended) {
      this.theme.load();

      this.objects = []
      this.ghosts = []
      this.numMaxGhosts = 5
      this.addGhostTimeoutID = undefined;

      this.objCountDraw = 0
      this.numMaxobjects = 5;
      this.points = 0
      this.numghosts = 0
      this.ghostY = 0;
      this.ghostX = 0;
      this.newGroupGhosts = true;
      this.newGhost = undefined;

      this.player.initialice();
    }


    this.drawInterval = undefined;
    this.state.pause = false;
    this.state.ended = false;

  }

  drawScore() {
    document.querySelector('#score').innerHTML = 'SCORE: ' + this.points

  }

  // class end
}