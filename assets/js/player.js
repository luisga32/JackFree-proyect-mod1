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
        this.player.src = "./assets/img/jackfree/spritesheet.png";
        this.player.isReady = false;
        this.player.horizontalFrames = 9
        this.player.verticalFrames = 1
        this.player.horizontalFrameIndex = 0
        this.player.verticalFrameIndex = 0
        this.player.scale = 10
        this.player.drawCount = 0

        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.player.onload = () => {

            this.player.frameWidth = (this.player.width / this.player.horizontalFrames)
            this.player.frameHeight = (this.player.height / this.player.verticalFrames)
            this.width = this.player.frameWidth / this.player.scale
            this.height = this.player.frameHeight / this.player.scale
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
        this.player.horizontalFrameIndex = 0
        this.player.verticalFrameIndex = 0
    }



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

    onKeyEvent(event) {
   //     console.log (event.type)
   //     console.log(event.keyCode)
        const status = event.type === 'keydown'
        switch (event.keyCode) {
            case KEY_UP:
                this.movements.up = status
                break;
            case KEY_RIGHT:
                this.movements.right = status
                break;
            case KEY_LEFT:

                this.movements.left = status
                break;
            case KEY_DOWN:
                this.movements.down = status
                break;

            default:
                break;
        }
    }
    move() {
        // si se ha pulsado izquierda cambiamos la coordenada x restando para que se dibuje mas a la izquierda. Si es la derecha sumamos

        if (this.movements.left) {
            this.speedX = -SPEED
        } else if (this.movements.right) {
            this.speedX = SPEED;
        } else if (this.movements.up) {
            this.speedY = - SPEED;
        } else if (this.movements.down) {
            this.speedY = SPEED;

        }
        else {
            this.speedX = 0;
            this.speedY = 0;
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

    // End Class
}
