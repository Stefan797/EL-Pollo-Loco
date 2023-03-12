/**
 * This class connects objects from the level one js with the world class.
 */
class Level {
    enemies;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 6550;

    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }

    /**
     * Filters the final boss out of the enemies.
     * @returns - final boss Class
     */
    getFinalboss() {
        return this.enemies.find(e => e instanceof Finalboss);
    }
}