class Object {
    constructor(ctx, object) {
        this.ctx = ctx;



        this.object = object;

        this.image = new Image();
        this.image.src = this.object.imagePath;
        this.image.isReady = false;
        this.scale = this.object.scale;

        this.image.onload = () => {
            this.image.isReady = true;
            this.width = Math.floor(this.image.width / this.scale);
            this.height = Math.floor(this.image.height / this.scale);
            this.x = Math.floor(Math.random() * (this.ctx.canvas.width - this.width))
            this.y = Math.floor(Math.random() * (this.ctx.canvas.height - this.height))
          //  console.log(`image onload `)
        }
        this.pointsCountDraw = 0;
        this.timePointsDraw = 80;
        this.pointsDrawFrames= 0;
  

   
   //     console.log(`object ${this.x} ${this.y}`)


        // end constructor
    }

    //methods
    draw() {

        //   console.log(object)
        // console.log(`object draw ${this.x} ${this.y}`)
        if (this.image.isReady){
        this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height)
    }

    }
   isReady() {
       return this.image.isReady;
   }

   
  
    collideWith(element) {
        // if the four conditions are true there is a collition
        //      console.log(`object collidewith ${this.x} ${this.y} ${this.image.complete}`)

        return this.x < element.x + element.width  // collition by right side
            && this.x + this.width > element.x              // collition by left side
            && this.y < element.y + element.height   // frontal collition
            && this.y + this.height > element.y       // back collition
    }

    pointsDraw() {
        const pointsDrawInterval = setInterval(() => {


            this.ctx.save();
            this.ctx.font = '18px Arial'
            this.ctx.fillStyle ='white'
            this.ctx.fillText(`${this.object.points} points`, this.x, this.y);
            this.ctx.restore();

            this.pointsCountDraw++;
            if (this.pointsCountDraw > this.timePointsDraw) {
                clearInterval(pointsDrawInterval);
            }

        }, this.pointsDrawFrames)
    }
    //end class
}

