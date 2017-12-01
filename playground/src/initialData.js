import { READERS, RENDERERS, FILTERS } from "./consts";
import { SIMPLE_CHARSET, ASCII_CHARSET } from "../../lib/renderers/BaseRenderer";

export default {
    readers: [
        { type: READERS.IMAGE_READER, name: "Image" },
        { type: READERS.VIDEO_READER, name: "Video" }
    ],

    renderers: [
        { type: RENDERERS.HTML_RENDERER, name: "HTML" },
        { type: RENDERERS.CANVAS_RENDERER, name: "Canvas" }
    ],

    predefinedVideos: [
        { value: "assets/bbb_720x480.mp4", text: "Big Buck Bunny 480p" },
        { value: "assets/cat-1280x720.mp4", text: "Cat 720p" }
    ],

    predefinedImages: [
        { value: "assets/mona.png", text: "Mona" },
        { value: "assets/marylin.jpg", text: "Marylin" },
        { value: "assets/lenna.png", text: "Lenna" },
        { value: "assets/evangeline.jpg", text: "Evangeline" },
        { value: "assets/monica.jpg", text: "Monica" }
    ],

    reader: {
        type: READERS.IMAGE_READER,
        url: "assets/marylin.jpg"
    },

    preFilters: {
        [FILTERS.INVERSE_FILTER]: { title: "Inverse", widget: "checkbox", enabled: false },
        [FILTERS.DESATURATE_FILTER]: { title: "Desaturate", widget: "checkbox", enabled: false },
        [FILTERS.BRIGHTNESS_FILTER]: { title: "Brightness", widget: "number", enabled: false, value: 0 },
        [FILTERS.CONTRAST_FILTER]: { title: "Contrast", widget: "number", enabled: false, value: 1 }
    },

    aa: {
        width: 350,
        height: 110,
        colored: false
    },

    postFilters: {
        [FILTERS.INVERSE_FILTER]: { title: "Inverse", widget: "checkbox", enabled: false },
        [FILTERS.DESATURATE_FILTER]: { title: "Desaturate", widget: "checkbox", enabled: false },
        [FILTERS.BRIGHTNESS_FILTER]: { title: "Brightness", widget: "number", enabled: false, value: 0 },
        [FILTERS.CONTRAST_FILTER]: { title: "Contrast", widget: "number", enabled: false, value: 1 }
    },

    renderer: {
        type: RENDERERS.HTML_RENDERER,
        background: "#FFFFFF",
        color: "#000000",
        charset: ASCII_CHARSET.join(""),
        fontSize: 7,
        fontFamily: "Ubuntu Mono",
        lineHeight: 7,
        charWidth: 4.2,
        width: 1400,
        height: 800
    },

    charsets: [
        { value: ASCII_CHARSET.join(""), title: "ASCII" },
        { value: SIMPLE_CHARSET.join(""), title: "Simple" }
    ],

    fonts: ["Inconsolata", "Ubuntu Mono", "Roboto Mono", "Source Code Pro", "Cutive Mono", "monospace"]
};
