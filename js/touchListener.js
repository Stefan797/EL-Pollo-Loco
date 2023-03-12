/**
 * Sets the codes for the window event for the touch use.
 */
function setTouchListener() {
    let events = [
        { 'id': 'move-right-btn', 'key': 'RIGHT' },
        { 'id': 'move-left-btn', 'key': 'LEFT' },
        { 'id': 'jump-btn', 'key': 'SPACE' },
        { 'id': 'throw-bottle-btn', 'key': 'D' },
    ];
    touchListener(events, 'touchstart');
    touchListener(events, 'touchend');
}

/**
 * Checks the codes of the json with the events of addEventListerner to set variables to true.
 * @param {*} events - json with codes for the use of keys
 * @param {*} eventState - type of window event registration
 */
function touchListener(events, eventState) {
    let event;
    for (let i = 0; i < events.length; i++) {
        if (eventState === 'touchstart' ? event = true : false);
        document.getElementById(events[i].id).addEventListener(eventState, (e) => {
            e.preventDefault();
            keyboard[events[i].key] = event;
        });
    }
}

/**
 * Makes the container with the touch elements visible and always sets the time when the touch event would be triggered last.
 */
function showMovebarByTouch() {
    addOrRemoveCSSClass('move-bar', 'remove', 'd-none');
    lastTouched = new Date().getTime();
}

/**
 * Checks the current time with the time of the last touch to make the container for the touch elements disappear.
 */
function removeMovebarAfterTime() {
    let currentTime = new Date().getTime();
    if (currentTime - lastTouched > 2000) addOrRemoveCSSClass('move-bar', "add", 'd-none');
}