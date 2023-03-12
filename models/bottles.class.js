/**
 * This class constructs all the bottles objects.
 */
class Bottle extends MovableObject {

    width = 80;
    height = 80;
    y = 365;

    constructor() {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = Math.floor(Math.random() * 6000) + 500;
    }
}