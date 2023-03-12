/**
 * This class constructs the gameover image.
 */
class GameoverObject extends DrawableObject {
    height = 480;
    width = 720;
    y = 0;
    x = 0;

    constructor() {
        super().loadImage('img/gamestatus/gameover.png');
    }
}