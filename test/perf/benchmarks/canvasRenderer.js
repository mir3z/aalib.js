import aa from "../../../src/aa";
import ImageReader from "../../../src/readers/ImageReader";

import canvas from "../../../src/renderers/CanvasRenderer";

export default function benchmark({ test, run }) {
    loadTestImage("resources/marylin.jpg", (aaImage) => {
        test("CanvasRenderer 840x1120 monochrome", () => {
            aaImage.meta.colored = false;
            canvas({ width: 840, height: 1120 })(aaImage);
        });

        test("CanvasRenderer 840x1120 colored", () => {
            aaImage.meta.colored = true;
            canvas({ width: 840, height: 1120 })(aaImage);
        });

        run();
    });
}

function loadTestImage(url, callback) {
    ImageReader.fromURL(url)
        .map(aa({ width: 200, height: 160 }))
        .subscribe(callback);
}
