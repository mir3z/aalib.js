export function appendToBody(el) {
    el.className = "aa";
    document.body.appendChild(el);
}

export function fps(callback) {
    if (!fps.timestamp) {
        fps.timestamp = Date.now();
        fps.value = 0;
        setInterval(() => {
            callback(fps.value.toFixed(0));
        }, 300);
        return;
    }
    const delta = (new Date().getTime() - fps.timestamp)/1000;
    fps.timestamp = Date.now();

    fps.value = 1 / delta;
}

export function fpsMeter(data) {
    fps((val) => console.log(val + " FPS"));
    return data;
}