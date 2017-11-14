import aa from "../../../src/aa";
import ImageReader from "../../../src/readers/ImageReader";

import html from "../../../src/renderers/HTMLRenderer";

export default function benchmark({ test, run }) {
    loadTestImage("resources/marylin.jpg", (aaImage) => {
        test("HTMLRenderer 200x160 monochrome", () => {
            aaImage.meta.colored = false;
            html({ width: 200, height: 160 })(aaImage);
        });

        test("HTMLRenderer 200x160 colored", () => {
            aaImage.meta.colored = true;
            html({ width: 200, height: 160 })(aaImage);
        });

        run();
    });
}

function loadTestImage(url, callback) {
    ImageReader.fromURL(url)
        .map(aa({ width: 200, height: 160 }))
        .subscribe(callback);
}
