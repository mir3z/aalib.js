function startRecording(canvas, video) {
    const stream = canvas.captureStream(30); // Capture at 30 fps
    let recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
    let data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.onstop = () => exportVideo(new Blob(data, { type: 'video/mp4' }));

    recorder.start();

    // Example: stop recording after 5 seconds
    setTimeout(() => {
        recorder.stop();
    }, 5000);
}

function exportVideo(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Assuming you have a canvas and a video element
const video = document.querySelector('video');


document.getElementById('screen').addEventListener('click', () => {
    startRecording(canvas, video);
});

