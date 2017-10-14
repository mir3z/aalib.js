import ImageReader from "../src/readers/ImageReader";
import VideoReader from "../src/readers/VideoReader";
import ImageDataReader from "../src/readers/ImageDataReader";

import inverse from "../src/filters/inverse";
import contrast from "../src/filters/contrast";
import brightness from "../src/filters/brightness";
import linear from "../src/filters/linear";

import aa from "../src/aa";

import html from "../src/renderers/HTMLRenderer";
import canvas from "../src/renderers/CanvasRenderer";

import { appendToBody } from "./utils";

const charset = html.CHARSET.ASCII;
const resource = filename => `../resources/${ filename }`;

const RES = {
    MONA: resource("mona.png"),
    LENNA: resource("lenna.png"),
    BBB: resource("bbb_720x480_30mb.mp4")
};

function mona() {
    ImageReader.fromURL(RES.MONA)
        .pipe(aa({ width: 200, height: 160, colorful: false }))
        .pipe(html({ charset }))
        .pipe(appendToBody)
        .end();
}

function lenna() {
    ImageReader.fromURL(RES.LENNA)
        .pipe(aa({ width: 210, height: 105, colorful: true }))
        .pipe(html({ charset }))
        .pipe(appendToBody)
        .end();
}

function bbb() {
    VideoReader.fromVideoElement(document.querySelector("video"), { autoplay: false })
        .pipe(aa({ width: 165, height: 68, colorful: false }))
        .pipe(canvas({
            charset: charset,
            width: 696,
            height: 476,
            el: document.querySelector("#video-scene canvas")
        }))
        .end();
}

function idata() {
    const drawingCanvas = document.createElement("canvas");
    drawingCanvas.width = "320";
    drawingCanvas.height = "240";
    appendToBody(drawingCanvas);

    const ctx = drawingCanvas.getContext("2d");
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 160, 240);
    ctx.fillStyle = "#eee";
    ctx.fillRect(160, 0, 160, 240);
    ctx.fillStyle = "#999";
    ctx.fillRect(160-40, 120-40, 80, 80);

    const idata = ctx.getImageData(0, 0, 320, 240);

    ImageDataReader.fromImageData(idata)
        .pipe(aa({ width: 80, height: 25, colorful: false }))
        .pipe(html({ charset }))
        .pipe(appendToBody)
        .end();
}

mona();
lenna();
bbb();
idata();


