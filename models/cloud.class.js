/**
 * This class constructs the clouds and performs functions that represent their movement.
 */
class Cloud extends MovableObject {

    width = 500;
    height = 250;
    y = 10;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = Math.floor(Math.random() * 6000) + 100;
        this.animate();
    }

    /**
     * This function causes clouds to move to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
    }


}