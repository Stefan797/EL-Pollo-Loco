/**
 * This class performs functions that have objects to be thrown.
 */
class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.widht = 50;
        this.trow();

    }

    /**
     * animated how the bottle flies.
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 25);
    }
}