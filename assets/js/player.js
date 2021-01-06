class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;

        this.width = 0
        this.height = 0

        this.player = new Image();
  
        this.player.src = "./assets/img/jackfree/spritesheet3.png";
        this.playerDead = undefined;
        this.player.isReady = false;
        this.isplayerDead = false;
        this.playerDeadIsReady = false
        this.player.horizontalFrames = 9
        this.player.verticalFrames = 2
        this.player.horizontalFrameIndex = 0
        this.player.verticalFrameIndex = 0
        this.player.scale = 13
        this.player.drawCount = 0
        this.playerDeadSound = new Audio('./assets/sound/cackle3.mp3')
        this.playerDeadSound.volume= 0.5
        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.player.onload = () => {

            this.player.frameWidth = (this.player.width / this.player.horizontalFrames)
            this.player.frameHeight = (this.player.height / this.player.verticalFrames)
            this.width = Math.floor(this.player.frameWidth / this.player.scale)
            this.height = Math.floor(this.player.frameHeight / this.player.scale)
            this.player.isReady = true;


        }

        // End constructor
    }
    isReady() {
        return this.player.isReady;
    }
    draw() {

        if (this.isReady()) {



            this.ctx.drawImage(
                this.player,
                this.player.frameWidth * this.player.horizontalFrameIndex, //The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
                this.player.frameHeight * this.player.verticalFrameIndex, //The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
                this.player.frameWidth,  //The width of the sub-rectangle of the source image to draw into the destination context
                this.player.frameHeight, //The height of the sub-rectangle of the source image to draw into the destination context. 
                this.x,      // x coordinate destination
                this.y,      // y coordinate destination
                this.width,   // The width to draw the image in the destination canvas.
                this.height  //The height to draw the image in the destination canvas.

            )
            this.player.drawCount++;
            this.animate();

        }

    }
    drawDead() {

        this.ctx.drawImage(
            this.playerDead,
            this.x,      // x coordinate destination
            this.y,      // y coordinate destination
            this.playerDead.width / this.player.scale,   // The width to draw the image in the destination canvas.
            this.playerDead.height / this.player.scale  //The height to draw the image in the destination canvas.

        )

        this.playerDeadSound.play();
    }

    CreateplayerDead() {
        this.player.isplayerDead = true;
        this.playerDead = new Image()
        this.playerDead.src = "./assets/img/jackfree/Dead.png";





    }
    isPlayerDead() {
        return this.player.isplayerDead;
    }

    animate() {
        //  console.log(this.movements);
        if (this.movements.right || this.movements.left
            || this.movements.up || this.movements.down) {
            this.animatePlayer()
        } else {
            this.resetAnimation()
        }
    }

    resetAnimation() {
        if (this.lookRight()) {
        this.player.horizontalFrameIndex = 0
        this.player.verticalFrameIndex = 0
    } else {
        this.player.horizontalFrameIndex = 8
        this.player.verticalFrameIndex = 1
    }
    }


/*
    resetAnimation() {
  
        this.player.horizontalFrameIndex = 0
        this.player.verticalFrameIndex = 0
  
    }

    */
    animatePlayer() {
        if (this.player.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.lookRight()) {
            if ((this.player.horizontalFrameIndex === this.player.horizontalFrames - 1)
                || (this.movements.left && this.movements.right)
                || ( this.movements.up && this.movements.down)) {
                this.player.horizontalFrameIndex = 0;
            } else {
                this.player.horizontalFrameIndex++;
            }
        } else {
            if (this.player.horizontalFrameIndex === 0
                || ( this.movements.left && this.movements.right)
                || ( this.movements.up && this.movements.down)) {
                this.player.horizontalFrameIndex = this.player.horizontalFrames -1;
            } else {
                this.player.horizontalFrameIndex--;
            }

        }
            this.player.drawCount = 0;
        }




    }
    /*
    animatePlayer() {
        if (this.player.drawCount % MOVEMENT_FRAMES === 0) {
           
            if (this.player.horizontalFrameIndex === this.player.horizontalFrames - 1) {
                this.player.horizontalFrameIndex = 1;
            } else {
                this.player.horizontalFrameIndex++;
            }
       
            this.player.drawCount = 0;
        }




    }
*/
    lookRight(){
        return this.player.verticalFrameIndex === 0
    }
    onKeyEvent(event) {
        //     console.log (event.type)
        //     console.log(event.keyCode)
    
        switch (event.type) {
            case 'keydown':
               
                switch (event.keyCode) {
                    case KEY_UP:
                        this.movements.up = true
                        break;
                    case KEY_RIGHT:
                        this.movements.right = true
                        break;
                    case KEY_LEFT:
        
                        this.movements.left = true
                        break;
                    case KEY_DOWN:
                        this.movements.down = true
                        break;
        
                    default:
                        break;
                }
                break;
            case 'keyup':
                switch (event.keyCode) {
                    case KEY_UP:
                        this.movements.up = false
                        break;
                    case KEY_RIGHT:
                        this.movements.right = false
                        break;
                    case KEY_LEFT:
        
                        this.movements.left = false
                        break;
                    case KEY_DOWN:
                        this.movements.down = false
                        break;
        
                    default:
                        break;
                }
                break;                  
            default:
                break;
        }
        
    

    }
    move() {
        // si se ha pulsado izquierda cambiamos la coordenada x restando para que se dibuje mas a la izquierda. Si es la derecha sumamos
    
        console.log(`ANTES X: ${this.x} Y: ${this.y}`) 
        this.speedX = 0;
        this.speedY = 0;
       
        if (this.movements.left && !this.movements.right) {
            this.speedX = -SPEED
   
            this.player.verticalFrameIndex = 1
 
        } else  if (this.movements.right && !this.movements.left) {
            this.speedX = SPEED;
  
            this.player.verticalFrameIndex = 0
 
        }
        
    
        if (this.movements.up && !this.movements.down) {
            this.speedY = - SPEED;
  

        } else if (this.movements.down && !this.movements.up) {
            this.speedY = SPEED;
  
 
        }
        // asignamos las nuevas coordenadas al objeto
        this.x += this.speedX;
        this.y += this.speedY;
 
        // controlamos límites

        if (this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width
        } else if (this.x <= 0) {
            this.x = 0
        }
        if (this.y + this.height >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height
        } else if (this.y <= 0) {
            this.y = 0
        }
    }


    collidesWith(element) {
        // if the four conditions are true there is a collition
 
        return this.x < element.x + element.width  // collition by right side
            && this.x + this.width > element.x              // collition by left side
            && this.y < element.y + element.height   // frontal collition
            && this.y + this.height > element.y       // back collition
    }

    initialice(){
        this.x = POSX_INI_PLAYER;
        this.y = POSY_INI_PLAYER;
        this.player.isplayerDead=false;
        this.playerDeadIsReady = false;
        this.player.verticalFrameIndex = 0;
    }
    // End Class
}
