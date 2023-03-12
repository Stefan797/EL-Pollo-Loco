/**
 * This class defines functions that can be applied to all movable objects. 
 */
class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * This function checks whether the value of the function or the y coordinate value is greater than zero and deducts from the y values ​​until the bottom value is reached.
     * Function is checked by the setInterval twenty-five times per second.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * This function returns the value true if the y-coordinate of the character is less than 180. This means that he is on the ground and ready to jump again. Theoretically, other objects are also possible, with the exception of throwable objects.
     * @returns - character coordinate y less than one hundred eighty is true back
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks the corner points and dimensions of the x and y coordinates of the object (image) of the canvas for matches.
     * @param {object} mo - can be any object such as the character, the chicken, bottels or coins.
     * @returns - that the function is true
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    /**
     * Subtracts five from the variable energy of an object and checks whether it comes to zero.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

   
    /**
     * Controls the period in which the collision can take place.
     * @returns - Time until the next collision
     */
    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = Math.round(timepassed) / 1000; 
        return timepassed < 1;
    }

    /**
     * Returns the value true if the energy from an Object is at zero.
     * @returns - whether the function is true 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Binds to a variable i the number of the current image divided by the number of all images in the corresponding array.
     * binds the string from image to a variable path.
     * @param {string} images - path to images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * The value for the movement is added to the x-axis of an object
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * On the X-axis of an object, the displacement value is subtracted to move it to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Increases the y value and makes the character jump.
     */
    jump() {
        this.speedY = 30;
    }
}