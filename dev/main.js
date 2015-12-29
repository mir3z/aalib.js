(function () {
    var ImageReader = require('readers/ImageReader');
    var VideoReader = require('readers/VideoReader');

    var inverse = require('filters/inverse');
    var contrast = require('filters/contrast');
    var brightness = require('filters/brightness');
    var linear = require('filters/linear');

    var aa = require('aa');

    var html = require('renderers/HTMLRenderer');
    var canvas = require('renderers/CanvasRenderer');
    var charset = html.CHARSET.ASCII;

    var RES = {
        MONA: '../resources/mona.png',
        LENNA: '../resources/lenna.png',
        BBB: '../resources/bbb_720x480_30mb.mp4'
    };

    ImageReader.fromURL(RES.MONA)
        .pipe(aa({ width: 200, height: 160, colorful: false }))
        .pipe(html({ charset: charset }))
        .pipe(appendToBody)
        .end();

    ImageReader.fromURL(RES.LENNA)
        .pipe(aa({ width: 210, height: 105, colorful: true }))
        .pipe(html({ fontset: charset }))
        .pipe(appendToBody)
        .end();

    VideoReader.fromVideoElement(document.querySelector('video'), { autoplay: false })
        .pipe(aa({ width: 165, height: 68, colorful: false }))
        .pipe(canvas({
            charset: charset,
            width: 696,
            height: 476,
            el: document.querySelector("#video-scene canvas")
        }))
        .end();

    function appendToBody(el) {
        el.className = 'aa';
        document.body.appendChild(el);
    }

    function fps(callback) {
        if (!fps.timestamp) {
            fps.timestamp = Date.now();
            fps.value = 0;
            setInterval(() => {
                callback(fps.value.toFixed(0));
            }, 300);
            return;
        }
        var delta = (new Date().getTime() - fps.timestamp)/1000;
        fps.timestamp = Date.now();

        fps.value = 1 / delta;
    }

    function fpsMeter(data) {
        fps(function (val) {
            console.log(val + ' FPS');
        });
        return data;
    }
})();