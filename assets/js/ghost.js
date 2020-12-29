class Ghost {
    constructor(ctx,x,y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;


  

        this.ghostImg = new Image();
        this.ghostImg.src = "./assets/img/ghost/16056_Spooky_Cute_Ghost.png";
        this.ghostImg.isReady = false;
        this.scale = 30;

        this.ghostImg.onload = () => {
            this.ghostImg.isReady = true;
            this.width = Math.floor(this.ghostImg.width / this.scale);
            this.height = Math.floor(this.ghostImg.height / this.scale);
    //        this.x = Math.floor(Math.random() * (this.ctx.canvas.width - this.width))
  
          //  console.log(`image onload `)
        }
 

   
   //     console.log(`object ${this.x} ${this.y}`)


        // end constructor
    }

    //methods
    // draw ghost
    draw() {

        //   console.log(object)
        // console.log(`object draw ${this.x} ${this.y}`)
        if (this.isReady()){
        this.ctx.drawImage(
            this.ghostImg,
            this.x,
            this.y,
            this.width,
            this.height)

    }




    }
    //move ghost
    move () {
        this.y++;

    }
    
    isReady ()
    {
        return this.ghostImg.isReady
    }

    // collides ghost with player
    collidesWith(element) {
        // if the four conditions are true there is a collition
              
          
        return this.x < element.x + element.width  // collition by right side
            && this.x + this.width > element.x              // collition by left side
            && this.y < element.y + element.height   // frontal collition
            && this.y + this.height > element.y       // back collition
    }

 
    //end class
}

