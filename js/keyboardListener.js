/**
 * Sets the codes for the window event for the key use.
 */
function setKeyListener() {
    let events = [
        { 'code': 'ArrowRight', 'key': 'RIGHT' },
        { 'code': 'ArrowLeft', 'key': 'LEFT' },
        { 'code': 'ArrowDown', 'key': 'DOWN' },
        { 'code': 'ArrowUP', 'key': 'UP' },
        { 'code': 'Space', 'key': 'SPACE' },
        { 'code': 'KeyD', 'key': 'D' },
        { 'code': 'KeyF', 'key': 'F' },
        { 'code': 'KeyS', 'key': 'S' },
        { 'code': 'Enter', 'key': 'ENTER' },
    ];
    keyListener(events, 'keydown');
    keyListener(events, 'keyup');
}

/**
 * Checks the codes of the json with the events of addEventListerner to set variables to true for the keyboard object.
 * @param {object} events - json with codes for the use of keys
 * @param {*} eventState - type of window event registration
 */
function keyListener(events, eventState) {
    window.addEventListener(eventState, (e) => {
        for (let i = 0; i < events.length; i++) {
            if (e.code === events[i].code) {
                if (eventState === 'keyup') keyboard[events[i].key] = false;
                    else keyboard[events[i].key] = true;
            }
        }
    });
}