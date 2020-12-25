class Object {
    constructor(ctx,x,y,object) {
       this.x = x;
       this.y = y;
       
        this.object = object;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = this.object.imagePath;
   //     this.image.src = "./assets/img/objects/pumpkin.png"
        this.image.isReady = false;
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



        // end constructor
    }

    //methods
    draw() {
    
     //   console.log(object)
       
        this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.image.width/this.object.scale,
            this.image.height/this.object.scale


        )






    }
    //end class
}

