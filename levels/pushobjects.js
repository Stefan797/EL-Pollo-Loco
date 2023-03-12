/**
 * This function creates an array and adds the objects (new coin) to it by looping it through.
 * @param {number} size - worth of added coins
 * @returns { Array } A collection of Coin Class Objects
 */
function getCoins(size) {
    let array = [];
    for (let index = 0; index < size; index++) {
        array.push(new Coin());
    }
    return array;
}

/**
 * This function creates an array and adds the objects (new bottle) to it by looping it through.
 * @param {number} size - worth of added bottles
 * @returns { Array } A collection of Coin Class Objects
 */
function getBottles(size) {
    let array = [];
    for (let index = 0; index < size; index++) {
        array.push(new Bottle());
    }
    return array;
}