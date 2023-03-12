let canvas;
let world;
let keyboard = new Keyboard();
let screenWidth;
let lastTouched = new Date().getTime();

/**
 * Is loaded with onload via the Index.html file.
 * Binds the canvas to a variable in order to be able to work with it.
 * binds the world to one object.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setEventListener();
    document.getElementById('background').addEventListener('touchstart', showMovebarByTouch);
}

/**
 * calls the functions to start the window events
 */
function setEventListener() {
    setKeyListener();
    setTouchListener();
}

/**
 * Changes the visibility of onclick on the html element by adding or removing the property display: none;
 */
function showGameNotes() {
    document.getElementById('gameNotes').classList.toggle('d-none');
}

/**
 * Adds or removes CSS classes.
 * @param {string} htmlId - id value of the html element
 * @param {string} state - method for classlist command
 * @param {string} cssClass - name of the css class
 */
function addOrRemoveCSSClass(htmlId, state, cssClass) {
    document.getElementById(htmlId).classList[state](cssClass);
}

/**
 * reload the game.
 */
function startgameagain() {
    location.reload();
}