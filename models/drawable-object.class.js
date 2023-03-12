/**
 * This class loads function to draw different objects in the world.
 */
class DrawableObject {

    x = 100;
    y = 330;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Is loaded in the Constructor to add new images.
     * @param {string} path - path to the picture
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Adds the corresponding values ​​to the ctx.
     * @param {object} ctx - canvas variable
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Passes the paths of the images that are loaded in the constructor.
     * @param {object} arr - Images Arrays
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function draws a frame around the moving objects so that the Collison can clearly be seen.
     * 
     * @param {object} ctx - canvas variable
     */
    drawFrame(ctx) {
        if (keyboard.S) {
            if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Finalboss) { // 
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
    }
}