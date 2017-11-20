import "rxjs/add/operator/do";

import ImageReader from "../src/readers/ImageReader";
import VideoReader from "../src/readers/VideoReader";
import ImageDataReader from "../src/readers/ImageDataReader";

import inverse from "../src/filters/inverse";
import contrast from "../src/filters/contrast";
import brightness from "../src/filters/brightness";
import linear from "../src/filters/linear";

import aa from "../src/aa";

import html, { ASCII_CHARSET } from "../src/renderers/HTMLRenderer";
import canvas from "../src/renderers/CanvasRenderer";

import { appendToBody } from "./utils";

const charset = ASCII_CHARSET;
const resource = filename => `../resources/${ filename }`;

const RES = {
    MONA: resource("mona.png"),
    LENNA: resource("lenna.png"),
    MARYLIN: resource("marylin.jpg"),
    BBB: resource("bbb_720x480_30mb.mp4")
};

function pipeline(...args) {
    const src = args.shift();

    args
        .reduce((acc, it) => acc.map(it), src)
        .subscribe();
}

function mona() {
    pipeline(
        ImageReader.fromURL(RES.MONA),
        aa({ width: 200, height: 160, colored: false }),
        html({ charset }),
        appendToBody
    );
}

function lenna() {
    ImageReader.fromURL(RES.LENNA)
        .map(aa({ width: 210, height: 105, colored: true }))
        .map(inverse())
        .map(html({ charset, background: "#000" }))
        .do(appendToBody)
        .subscribe();
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

    ImageDataReader.fromCanvas(drawingCanvas)
        .map(aa({ width: 80, height: 25, colored: false }))
        .map(html({ charset }))
        .do(appendToBody)
        .subscribe();
}

function localImage() {
    const filePicker = document.createElement("input");
    filePicker.type = "file";
    filePicker.addEventListener("change", createFileHandler(createAA));

    appendToBody(filePicker);

    function createFileHandler(createAA) {
        return (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                createAA(e.target.result);
            };

            reader.readAsDataURL(file);
        };
    }

    function createAA(imageUrl) {
        ImageReader.fromURL(imageUrl)
            .map(aa({ width: 210, height: 105, colored: false }))
            .map(html({ charset }))
            .do((el) => {
                filePicker.parentNode.insertBefore(el, filePicker.nextSibling);
            })
            .subscribe();
    }
}

function bbb() {
    const scene = document.createElement("canvas");
    const video = document.createElement("video");
    video.src = "../resources/bbb_720x480_30mb.mp4";
    video.controls = true;

    appendToBody(video);
    appendToBody(scene);

    VideoReader.fromVideoElement(video, { autoplay: false })
        .map(aa({ width: 165, height: 68, colored: true }))
        .map(canvas({
            charset,
            width: 696,
            height: 476,
            el: scene
        }))
        .subscribe();
}

mona();
lenna();
bbb();
idata();
localImage();
