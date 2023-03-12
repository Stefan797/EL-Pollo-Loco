/**
 * This class constructs the winner image.
 */
class WinnnerObject extends DrawableObject {
    height = 480;
    width = 720;
    y = 0;
    x = 0;

    constructor() {
        super().loadImage('img/gamestatus/gamewon.png');
    }
}