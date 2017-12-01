import Vue from "vue";
import App from "./view/App.vue";

import ImageReader from "../../lib/readers/ImageReader";
import VideoReader from "../../lib/readers/VideoReader";
import html from "../../lib/renderers/HTMLRenderer";
import canvas from "../../lib/renderers/CanvasRenderer";
import aa from "../../lib/aa";
import inverse from "../../lib/filters/inverse";
import desaturate from "../../lib/filters/desaturate";
import contrast from "../../lib/filters/contrast";
import brightness from "../../lib/filters/brightness";

import { READERS, RENDERERS, FILTERS } from "./consts";
import presets from "./presets";

export default function main(el) {
    const p = Object.values(presets);
    const randomPreset = p[Math.floor(Math.random() * p.length)];

    new Vue({
        el,
        render: h => h(App, {
            props: { initialData: randomPreset() },
            on: { updated: createPipelineUpdater() }
        })
    });
};

function createPipelineUpdater() {
    const drawing = createDrawing(".screen");
    let subscription;

    return (data) => {
        subscription && subscription.unsubscribe();

        const renderer = resolveRenderer(data.renderer, drawing);
        const reader = resolveReader(data.reader);
        const preFilters = resolveFilters(data.preFilters);
        const postFilters = resolveFilters(data.postFilters);

        subscription = reader()
            .map(preFilters())
            .map(aa(data.aa))
            .map(postFilters())
            .map(renderer())
            .subscribe();
    }
}

function resolveFilters(filters) {
    return () => compose(...Object.entries(filters).map(resolveFilter));
}

function resolveFilter([ type, { enabled, value }]) {
    const id = (a) => a;
    const ifEnabled = (filterFn) => enabled ? filterFn() : id;

    return {
        [ FILTERS.INVERSE_FILTER ]: ifEnabled(inverse),
        [ FILTERS.DESATURATE_FILTER ]: ifEnabled(desaturate),
        [ FILTERS.BRIGHTNESS_FILTER ]: ifEnabled(() => brightness(value)),
        [ FILTERS.CONTRAST_FILTER ]: ifEnabled(() => contrast(value))
    }[type];
}

function resolveReader({ type, url }) {
    return {
        [ READERS.IMAGE_READER ]: () => ImageReader.fromURL(url),
        [ READERS.VIDEO_READER ]: () => VideoReader.fromVideoElement(
            document.querySelector((".preview-video")),
            { autoplay: true }
        )
    }[type];
}

function resolveRenderer({ type, ...options }, drawing) {
    const el = drawing(type);

    return {
        [ RENDERERS.HTML_RENDERER ]: () => html({ ...options, el }),
        [ RENDERERS.CANVAS_RENDERER ]: () => canvas({ ...options, el })
    }[type];
}

function createDrawing(screenSelector) {
    const prepareDrawingArea = (parent, tagName) => {
        const el = document.createElement(tagName);
        parent.appendChild(el);
        return el;
    };

    const drawingTagMap = {
        [RENDERERS.CANVAS_RENDERER]: "canvas",
        [RENDERERS.HTML_RENDERER]: "pre"
    };

    return (type) => {
        const screen = document.querySelector(screenSelector);
        screen.innerHTML = "";

        return prepareDrawingArea(screen, drawingTagMap[type]);
    }
}

function compose(...fnArgs) {
    const [first, ...funcs] = fnArgs.reverse();
    return (...args) => funcs.reduce((acc, fn) => fn(acc), first(...args));
}
