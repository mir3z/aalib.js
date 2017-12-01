import initialData from "./initialData";
import {
    IMAGE_READER,
    BRIGHTNESS_FILTER, INVERSE_FILTER, DESATURATE_FILTER,
    CANVAS_RENDERER, VIDEO_READER
} from "./consts";

import { SIMPLE_CHARSET } from "../../lib/renderers/BaseRenderer";

export default {
    marylin() {
        const preset = { ...initialData };

        preset.reader = {
            type: IMAGE_READER,
            url: "assets/marylin.jpg"
        };

        preset.aa = {
            width: 400,
            height: 120,
            colored: true
        };

        preset.postFilters[INVERSE_FILTER].enabled = true;

        preset.renderer.background = "#000";
        preset.renderer.fontFamily = "Ubuntu Mono";

        return preset;
    },

    evangeline() {
        const preset = { ...initialData };

        preset.reader = {
            type: IMAGE_READER,
            url: "assets/evangeline.jpg"
        };

        preset.aa = {
            width: 400,
            height: 123,
            colored: true
        };

        preset.postFilters[INVERSE_FILTER].enabled = true;
        preset.postFilters[DESATURATE_FILTER].enabled = true;
        preset.postFilters[BRIGHTNESS_FILTER].enabled = true;
        preset.postFilters[BRIGHTNESS_FILTER].value = 25;

        preset.renderer.background = "#000";
        preset.renderer.fontFamily = "Ubuntu Mono";

        return preset;
    },

    monica() {
        const preset = { ...initialData };

        preset.reader = {
            type: IMAGE_READER,
            url: "assets/monica.jpg"
        };

        preset.aa = {
            width: 330,
            height: 117,
            colored: true
        };

        preset.postFilters[INVERSE_FILTER].enabled = true;

        preset.renderer.type = CANVAS_RENDERER;
        preset.renderer.charset = SIMPLE_CHARSET.join("");
        preset.renderer.width = ~~preset.aa.width * preset.renderer.charWidth;
        preset.renderer.height = ~~preset.aa.height * preset.renderer.lineHeight;
        preset.renderer.background = "#000";
        preset.renderer.fontFamily = "Ubuntu Mono";

        return preset;
    },

    mona() {
        const preset = { ...initialData };

        preset.reader = {
            type: IMAGE_READER,
            url: "assets/mona.png"
        };

        preset.aa = {
            width: 170,
            height: 130,
            colored: false
        };

        preset.renderer.fontFamily = "Cutive Mono";
        preset.renderer.fontSize = 6;

        return preset;
    },

    cat() {
        const preset = { ...initialData };

        preset.reader = {
            type: VIDEO_READER,
            url: "assets/cat-1280x720.mp4"
        };

        preset.aa = {
            width: 260,
            height: 80,
            colored: false
        };

        preset.renderer.type = CANVAS_RENDERER;
        preset.renderer.width = 910;
        preset.renderer.height = 560;
        preset.renderer.fontFamily = "Ubuntu Mono";

        return preset;
    },

    bbb() {
        const preset = { ...initialData };

        preset.reader = {
            type: VIDEO_READER,
            url: "assets/bbb_720x480.mp4"
        };

        preset.aa = {
            width: 260,
            height: 85,
            colored: false
        };

        preset.renderer.type = CANVAS_RENDERER;
        preset.renderer.width = 910;
        preset.renderer.height = 600;
        preset.renderer.fontFamily = "Ubuntu Mono";

        return preset;
    }
}
