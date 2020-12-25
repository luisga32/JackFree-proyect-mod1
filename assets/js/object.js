class Object {
    constructor(ctx,object) {
        this.ctx = ctx;


       
        this.object = object;
       
        this.image = new Image();
        this.image.src = this.object.imagePath;
        this.image.isReady = false;
        this.scale = this.object.scale;
        this.image.onload = () => {
            this.image.isReady = true;
            this.width = this.image.width/this.scale;
            this.height= this.image.height/this.scale;
            this.x = Math.floor(Math.random()*(this.ctx.canvas.width - this.width) )
            this.y = Math.floor(Math.random()*(this.ctx.canvas.height - this.height) )
            console.log(`image onload `)
        }
  
 
   //     this.image.src = "./assets/img/objects/pumpkin.png"
        
        /*
        this.images = [
            {
                name: "pumpkin",
                imagePath: "./assets/img/objects/pumpkin.png",
                points: 50,
                scale:10
            },
            {
                name: "witch",
                imagePath: "./assets/img/objects/witch.png",
                points: 100,
                scale:15
            },

        ];
        */

       console.log(`object ${this.x} ${this.y}`)
    

        // end constructor
    }

    //methods
    draw() {
    
     //   console.log(object)
    // console.log(`object draw ${this.x} ${this.y}`)
        this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height 


        )






    }
    collideWith(element){
         // if the four conditions are true there is a collition
         console.log(`object collidewith ${this.x} ${this.y} ${this.image.complete}`)
         
 return this.x < element.x + element.width  // collition by right side
 &&  this.x + this.width > element.x              // collition by left side
 &&  this.y < element.y + element.height   // frontal collition
 && this.y + this.height > element.y       // back collition
    }
    //end class
}

