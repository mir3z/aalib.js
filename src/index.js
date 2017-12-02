import ImageReader from "./readers/ImageReader";
import VideoReader from "./readers/VideoReader";
import ImageDataReader from "./readers/ImageDataReader";

import linear from "./filters/linear";
import brightness from "./filters/brightness";
import contrast from "./filters/contrast";
import inverse from "./filters/inverse";
import desaturate from "./filters/desaturate";

import html from "./renderers/HTMLRenderer";
import canvas from "./renderers/CanvasRenderer";
import { SIMPLE_CHARSET, ASCII_CHARSET } from "./renderers/BaseRenderer";

import aa from "./aa";

export { aa };

export const read = {
    image: {
        fromHTMLImage: ImageReader.fromHTMLImage,
        fromURL: ImageReader.fromURL
    },

    imageData: {
        fromImageData: ImageDataReader.fromImageData,
        fromCanvas: ImageDataReader.fromCanvas
    },

    video: {
        fromVideoElement: VideoReader.fromVideoElement
    }
};

export const filter = {
    linear,
    brightness,
    contrast,
    inverse,
    desaturate
};

export const render = {
    html,
    canvas
};

export const charset = {
    SIMPLE_CHARSET,
    ASCII_CHARSET
};

export default {
    aa,
    read,
    filter,
    render,
    charset
};