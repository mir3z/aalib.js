module.exports = {
    read: {
        image: require("./readers/ImageReader"),
        video: require("./readers/VideoReader"),
        imageData: require("./readers/ImageDataReader")
    },
    filter: {
        linear: require("./filters/linear"),
        brightness: require("./filters/brightness"),
        contrast: require("./filters/contrast"),
        inverse: require("./filters/inverse")
    },
    render: {
        html: require("./renderers/HTMLRenderer"),
        canvas: require("./renderers/CanvasRenderer")
    },
    aa: require("./aa")
};
