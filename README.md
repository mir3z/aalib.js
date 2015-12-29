# aalib.js

This library allows to automatically convert images and movies to [ASCII art](https://en.wikipedia.org/wiki/ASCII_art).

It is written entirely in JavaScript and is intended to use in web browsers.

## Examples

* [Mona](https://cdn.rawgit.com/mir3z/aalib.js/master/examples/mona.html)
* [Lenna](https://cdn.rawgit.com/mir3z/aalib.js/master/examples/lenna.html)
* [Marylin](https://cdn.rawgit.com/mir3z/aalib.js/master/examples/marylin.html)
* [Big Buck Bunny](https://cdn.rawgit.com/mir3z/aalib.js/master/examples/bbb.html)

If you have any troubles seeing examples, just clone the repository and browse them locally. 

## Usage

The library uses streams to process images. This means that an image is firstly read and then passed through a stream.
A stream consists of processors which can read data from its input, process, and write to output. Chaining processors 
together makes a series of transformations which eventually lead to ASCII art. 

In general the stream has the following form:

`Reader` >> `Filter` >> `AA` >> `Filter` >> `Renderer`

This means what follows:

1. `Reader` reads image (static or moving) and converts it to internal representation.
2. (Optional) `Filter` (e.g. brightness or contrast) can be applied to the image from 1st step.
3. `AA` transforms image from 2nd step to ASCII art.
4. (Optional) Another `Filter` can be applied but in this step it is applied to ASCII art image.
5. `Renderer` renders image from 4th step to given output.

That is how it looks expressed in a code:

```javascript
aalib.read.image.fromURL("marylin.jpg")
    .pipe(aalib.filter.contrast(0.9))
    .pipe(aalib.aa({ width: 530, height: 160 }))
    .pipe(aalib.filter.brightness(10))
    .pipe(aalib.render.html({ el: document.querySelector(".aa-image") }))
    .end();
```

See [API](#api) section for more details on how processors work. 

## API

### Readers

These are objects which allow to read from various sources and write to a stream.  

#### ImageReader
 
Exposed in `aalib.read.image`
 
It has two handy factory methods:

* <code>fromURL(<i>url:string</i>)</code> - creates `ImageReader` which reads from given URL and returns stream.
* <code>fromImg(<i>img:HTMLImageElement</i>)</code> - creates `ImageReader` which reads from given `HTMLImageElement` 
and returns stream.

#### VideoReader

Exposed in `aalib.read.video`
 
It has two handy factory methods:

* <code>fromURL(<i>url:string</i>, <i>options:object</i>)</code> - creates `VideoReader` which reads from given URL 
and returns stream/
* <code>fromVideoElement(<i>video:HTMLVideoElement</i>, <i>options:object</i>)</code> - creates `VideoReader` which 
reads from given `HTMLVideoElement` and returns stream.

Both methods accepts the following options:

* `autoplay:boolean` - If `true`, start playing video automatically, default: `false`

`aalib.read.video`

### Filters

Filters are processors which changes every component of an image. When a filter is applied to a regular image it 
changes a RGB value. When a filter is applied to ASCII art image it changes the only component the image
has - intensity. Intensity is a value which tells whether part of an image should be rendered as a "dark" or "light" 
character.

#### inverse

<code>aalib.filter.inverse()</code>

This filter inverses each component of an image. By inversion I mean the following function: `f(x) = 255 - x` 

#### linear

<code>aalib.filter.linear(<i>a:number</i>, <i>b:number</i>)</code>

It applies linear transformation to every image component. The linear transformation is a function: `f(x) = ax + b`

#### brightness

<code>aalib.filter.brightness(<i>value:number</i>)</code>

It changes brightness of an image. This is a special case of linear filter where `a = 1`.

#### contrast

<code>aalib.filter.contrast(<i>value:number</i>)</code>

It changes contrast of an image. This is a special case of linear filter where `b = 0`.

### AA

This processor handles actual conversion to ASCII art image.

<code>aalib.aa(<i>options:object</i>)</code>

It accepts the following options:

* `width:number` - width (in characters) of target ASCII art image.
* `height:number` - height (in characters) of target ASCII art image.
* `colorful:boolean` - if `true`, colors of an original image are preserved. Every character in target image has a
mean color of area it represents in an original image.

### Renderers

Renderers are used to output ASCII art image. They can render using different characters set. 
By default two charsets are defined and exposed under `CHARSET` property of every renderer:

* `ASCII` - printable ASCII characters - range: <32, 127>. This is the default one.
* `SIMPLE` - characters from list `['.', ':', '*', 'I', '$', 'V', 'F', 'N', 'M']`.

#### HTMLRenderer

<code>aalib.render.html(<i>options:object</i>)</code>

Renders ASCII art image as HTML element.

Options:

* `tagName:string` - use this tag to render HTML element, default: `pre`.
* `el:HTMLElement` - if defined, use this element as render target. Otherwise create a new element defined in `tagName`.
* `fontFamily:string` - font used in rendering, default: `monospace`.
* `charset:string[]` - alphabet used in rendering, default: printable ASCII characters (range <32, 127>)

#### CanvasRenderer

<code>aalib.render.canvas(<i>options:object</i>)</code>

Renders ASCII art image as Canvas element.

Options:

* `fontSize:number` - defines font size, default: 7.
* `lineHeight:number` - defines line height, default: 7.
* `width:number` - defines canvas width in pixels, default: 400.
* `height:number` - defines canvas height in pixels, default: 300.
* `el:HTMLElement` - if defined, use this element as render target. Otherwise create a new one.
* `fontFamily:string` - font used in rendering, default: `monospace`.
* `charset:string[]` - alphabet used in rendering, default: `ASCII` charset.

## License
The MIT License (MIT). Copyright (c) 2015 mirz (mirz.hq@gmail.com)