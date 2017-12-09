# aalib.js

This library converts images and movies to [ASCII art](https://en.wikipedia.org/wiki/ASCII_art).

It is written entirely in JavaScript and is intended to use in web browsers.

## Examples

* [Mona](http://mir3z.github.io/aalib.js/examples/mona.html) ([original](http://mir3z.github.io/aalib.js/resources/mona.png))
* [Lenna](http://mir3z.github.io/aalib.js/examples/lenna.html) ([original](http://mir3z.github.io/aalib.js/resources/lenna.png))
* [Marylin](http://mir3z.github.io/aalib.js/examples/marylin.html) ([original](http://mir3z.github.io/aalib.js/resources/marylin.jpg))
* [Evangeline](http://mir3z.github.io/aalib.js/examples/evangeline.html) ([original](http://mir3z.github.io/aalib.js/resources/evangeline.jpg))
* [Monica](http://mir3z.github.io/aalib.js/examples/monica.html) ([original](http://mir3z.github.io/aalib.js/resources/monica.jpg))
* [Big Buck Bunny](http://mir3z.github.io/aalib.js/examples/bbb.html)

## Interactive demo

[Click here](http://mir3z.github.io/aalib.js/playground/www/)

## Usage

Converting to ASCII art is performed by reading an image (or a video)
then processing it by a series of processors and finally rendering the output.

In general it has the following form:

`Reader` >> `Pre-Filter` >> `AA` >> `Post-Filter` >> `Renderer`

This means what follows:

1. `Reader` reads image (static or moving) and converts it to internal representation.
2. (Optional) `Pre-Filter` (e.g. brightness or contrast) can be applied to the image from the 1st step.
3. `AA` transforms image from the 2nd step to ASCII art.
4. (Optional) Another `Post-Filter` can be applied but in this step it is applied to ASCII art image.
5. `Renderer` renders image from the 4th step to a given output.

That is how it looks expressed in a code:

```javascript
aalib.read.image.fromURL("marylin.jpg")
    .map(aalib.filter.contrast(0.9))
    .map(aalib.aa({ width: 530, height: 160 }))
    .map(aalib.filter.brightness(10))
    .map(aalib.render.html({ el: document.querySelector(".aa-image") }))
    .subscribe();
```

See [API](#api) section for more details on how the processors work.

The library is using [RxJS](https://github.com/Reactive-Extensions/RxJS) under the hood.
Every reader actually returns an [Observable](http://reactivex.io/documentation/observable.html) so processing
is not started until `subscribe` method is called. Data emitted by observables may be
transformed by [map](http://reactivex.io/documentation/operators/map.html) operator, or you are allowed
to perform any operation (like logging or side-effects) by using [do](http://reactivex.io/documentation/operators/do.html) operator.

The library is distributed as:
* a standalone UMD library (see `dist` directory) - exposed as a global `aalib` namespace. Dedicated for use in browsers.

```
<script type="text/javascript" src="dist/aalib.js"></script>
```

* ES6 modules (see `lib` directory) - for node.js

```
const aalib = require("aalib.js");

// or

import aalib from "aalib.js";
```

You may also want to load separate files by importing/requiring directly from `aalib.js/lib`:

## API

### Readers

These are objects which read from various sources and write to a processing stream.

#### ImageReader
 
Exposed in `aalib.read.image` and as a default export in `aalib.js/lib/readers/ImageReader`.
 
Factory methods:

* <code>fromURL(<i>url:string</i>)</code> - creates `ImageReader` reading from given URL and returns observable.
* <code>fromHTMLImage(<i>img:HTMLImageElement</i>)</code> - creates `ImageReader` reading given `HTMLImageElement`
and returns observable.

#### VideoReader

Exposed in `aalib.read.video` and as a default export in `aalib.js/lib/readers/VideoReader`.
 
Factory methods:

* <code>fromVideoElement(<i>video:HTMLVideoElement</i>, <i>options:object</i>)</code> - creates `VideoReader` reading
from given `HTMLVideoElement` and returns observable.

`options` accepts the following options:

* `autoplay:boolean` - If `true`, starts playing video automatically, default: `false`

#### ImageDataReader

Exposed as `aalib.read.imageData` or as a default export in `aalib.js/lib/readers/ImageDataReader`.

Use the `fromImageData` factory method to create observable from an image data object.
An image data object contains three mandatory fields; `width`, `height`, and `data`.
The first two describe the dimensions of the image data, while the third is an array
of _width * height * 4_ elements, where each pixels is represented as r, g, b, alpha.
ImageData object are returned for example when getting pixel data from a canvas, or
when rendering to an offscreen buffer using WebGL.

### Filters

Filters are processors changing each component of an image. When a filter is applied to a regular image it
changes a RGB value. When a filter is applied to ASCII art image it changes the only component the image
has - intensity. Intensity is a value which tells whether part of an image should be rendered as a "dark"
or "light" character.

#### inverse

Exposed as `aalib.filter.inverse` or as a default export in `aalib.js/lib/filters/inverse`.

<code>aalib.filter.inverse()</code>

This filter inverses each component of an image. By inversion I mean the function: `f(x) = 255 - x`

#### linear

Exposed as `aalib.filter.linear` or as a default export in `aalib.js/lib/filters/linear`.

<code>aalib.filter.linear(<i>a:number</i>, <i>b:number</i>)</code>

It applies the linear transformation: `f(x) = ax + b`

#### brightness

Exposed as `aalib.filter.brightness` or as a default export in `aalib.js/lib/filters/brightness`.

<code>aalib.filter.brightness(<i>value:number</i>)</code>

It changes the brightness of an image. This is the special case of the linear filter where `a = 1`.

#### contrast

Exposed as `aalib.filter.contrast` or as a default export in `aalib.js/lib/filters/contrast`.

<code>aalib.filter.contrast(<i>value:number</i>)</code>

It changes the contrast of an image. This is the special case of the linear filter where `b = 0`.


#### desaturate

Exposed as `aalib.filter.desaturate` or as a default export in `aalib.js/lib/filters/desaturate`.

<code>aalib.filter.desaturate()</code>

It desaturates (converts to a grayscale) an image.

### AA

This processor handles actual conversion to ASCII art image.

Exposed as `aalib.aa` or as a default export in `lib/aa`.

<code>aalib.aa(<i>options:object</i>)</code>

It accepts the following options:

* `width:number` - width (in characters) of target ASCII art image.
* `height:number` - height (in characters) of target ASCII art image.
* `colored:boolean` - if `true`, the colors of the original image are preserved. Every character in a target image has a
mean color of area it represents in the original image.

### Renderers

Renderers outputs ASCII art image. They can render using different characters set.
By default two charsets are defined are defined:

* `ASCII_CHARSET` - printable ASCII characters - range: <32, 127>. This is the default one.
* `SIMPLE_CHARSET` - characters from list `['.', ':', '*', 'I', '$', 'V', 'F', 'N', 'M']`.

They are exposed in each renderer as named export:

`import { ASCII_CHARSET, SIMPLE_CHARSET } from "lib/renderers/HTMLRenderer";`

or as

`aalib.charset`

#### HTMLRenderer

Exposed as `aalib.render.html` or as a default export in `aalib.js/lib/renderers/HTMLRenderer`.

<code>aalib.render.html(<i>options:object</i>)</code>

Renders ASCII art image as HTML element.

Options:

* `tagName:string` - tag name of the rendered HTML element, default: `pre`.
* `el:HTMLElement` - if defined, use this element as render target. Otherwise create a new element defined by `tagName`.
* `fontFamily:string` - font being used while rendering, default: `monospace`.
* `fontSize:number` - font size of the rendered text, default: `7px`.
* `charset:string[]` - a list of characters being used while rendering, default: printable ASCII characters (range <32, 127>).
* `background:string` - background color of target HTML element, default `#FFF`.
* `color:string` - color of the text. Ignored if output image is not monochrome (see `colored` in AA options), default: `#000`.

#### CanvasRenderer

Exposed as `aalib.render.canvas` or as a default export in `aalib.js/lib/renderers/CanvasRenderer`.

<code>aalib.render.canvas(<i>options:object</i>)</code>

Renders ASCII art image as Canvas element.

Options:

* `fontSize:number` - font size of the rendered text, default: `7px`.
* `fontFamily:string` - font being used while rendering, default: `monospace`.
* `lineHeight:number` - defines line height, default: 7px.
* `charWidth:number` - defines the width of the characters, default: 4.2px.
* `width:number` - defines canvas width in pixels, default: 400.
* `height:number` - defines canvas height in pixels, default: 300.
* `el:HTMLElement` - if defined, use this element as render target. Otherwise create a new canvas.
* `charset:string[]` - a list of characters being used while rendering, default: printable ASCII characters (range <32, 127>).
* `background:string` - background color of canvas, default `#FFF`.
* `color:string` - color of the text. Ignored if output image is not monochrome (see `colored` in AA options), default: `#000`.

## License
The MIT License (MIT). Copyright (c) 2017 mirz (that.mirz@gmail.com)