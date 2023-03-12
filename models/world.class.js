/**
 * This class constructs the world stores variables and tests various functions e.g. collisions, won, game over and things added to the canvas. 
 */
class World { 
    character = new Character(); 
    gameOverObject = new GameoverObject();
    winnerObjeject = new WinnnerObject();
    level = level1;
    
    canvas;
    ctx;
    keyboard;
    touchevents;

    finalbossdefeated = false;

    gameover = false;
    countedcoins = 0;
    countedbottles = 0;
    camera_x = 0;
    statusBarBottles = new BottleBar();
    statusBar = new StatusBar();
    statusBarcoins = new StatusBarCoins();
    throwableObjects = [];
    throw_sound = new Audio('audio/throw.mp3');
    requestDraw;

    constructor(canvas, keyboard, touchevents) { 
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.touchevents = touchevents;
        requestAnimationFrame(this.draw.bind(this));
        this.setWorld();
        this.testing();
    }

    /**
     * Submits the character and the final boss of the word class.
     */
    setWorld() {
        this.character.world = this;
        this.level.getFinalboss().world = this;
    }

    /**
     * This function executes several functions over the set interval five times per second.
     */
    testing() {
        setInterval(() => {
            this.checkforCollisionsBottleswithEndboss();
            this.checkforCollisionsCharacterwithBottles();
            this.checkforCollisionsCharacterwithCoins();
            this.checkforCollisions();
            this.checktheBottlesStatusBar();
            this.checkTrowObjects();
            this.checkforGameover();
            this.checkforFinishedLevel();
        }, 200);
    }

    /**
     * checks whether the variable finalbossdefeated is true, if so the canvas is stopped and the won function is called.
     */
    checkforFinishedLevel() {
        if (this.finalbossdefeated) {
            cancelAnimationFrame(this.requestDraw);
            this.drawWinner();
            document.getElementById('gamenewstartbutton').classList.remove('d-none');
        }
    }

    /**
     * This function deletes the content of the canvas and then inserts the Winner object (image) into the empty canvas.
     */
    drawWinner() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.winnerObjeject);
    }


    /**
     * Checks whether the variable gameover is true.
     */
    checkforGameover() {
        if (this.gameover) {
            cancelAnimationFrame(this.requestDraw);
            this.drawGameover();
            document.getElementById('gamenewstartbutton').classList.remove('d-none');
        }
    }

    /**
     * This function deletes the content of the canvas and then adds the game over object (picture) to the empty canvas. 
     */
    drawGameover() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.gameOverObject);
    }

    /**
     * Checks whether the D key on the keyboard is pressed. If the number of bottles is higher than one, a ThrowableObject is added to the canvas.
     */
    checkTrowObjects() {
        if (this.keyboard.D) {
            if (this.countedbottles >= 1) {
                this.countedbottles--;
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.throw_sound.play();
            }
        }
    }

    /**
     * Checks the collision of the enemies with the character.
     */
    checkforCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks the collision of the character with the coins.
     */
    checkforCollisionsCharacterwithCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let position = this.level.coins.indexOf(coin);
                this.level.coins.splice(position, 1);
                this.countedcoins += 1;
                this.statusBarcoins.setPercentage(this.countedcoins);
            }
        });
    }

    /**
     * Checks the collision of the character with the bottles.
     */
    checkforCollisionsCharacterwithBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let position = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(position, 1);
                this.countedbottles++;
                this.checktheBottlesStatusBar();
            }
        });
    }

    /**
     * Transfers the value of the current number of bottles and calls the setPercentage function.
     */
    checktheBottlesStatusBar() {
        this.statusBarBottles.setPercentage(this.countedbottles);
    }

    /**
     * Checks the collision of the bottles with the final boss.
     */
    checkforCollisionsBottleswithEndboss() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.level.getFinalboss().isColliding(throwableObject)) {
                // console.log('collision with Endboss, energy', this.level.getEndboss().energy);
                this.level.getFinalboss().hit();
            }
        });
    }

    /**
     * Draws running the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.updateCamara();

        this.addLevelObjectstoMap();
        
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.requestDraw = requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * Moves the camera along the x axis.
     */
    updateCamara() {
        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.statusBarcoins);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0); // Forwards
    }

    /**
     * Adds object from the level file.
     */
    addLevelObjectstoMap() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds the objects to the addToMap function using a forEach loop.
     * @param {Object} objects - the objects of the level
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds the values ​​to the other functions.
     * @param {Object} mo - the objects of the level
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Rotates a picture in the other direction in the canvas.
     * @param {Object} mo - the objects of the level
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Rotates the picture back again.
     * @param {Object} mo - the objects of the level
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}