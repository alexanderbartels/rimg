## Usage

The `rimg compress <files>` command tries to minimize the file size.

```bash
// Compress all png images inside the pictures folder
$ rimg compress pictures/*.png
```

## Parameter

### Quiet

```bash
  -q, --quiet       In quiet mode only successfully processed images are printed
                    to std out.
```

* Option type: `boolean`
* Default: `false`
* Required: `optional`

### Output

```bash
  -o, --output      Output directory to store the processed images.
```

* Option type: `string`
* Default: `out`
* Required: `optional`

### Backends

```bash
    -b, --backends    Which Backend or Backends should be used to process the images
```

* Option type: `array` of strings see the list of [available Backends](#available-backends) for backends that can be used to compress images.
* Default: `["tinify", "svgo"]`
* Required: `optional`

## Available Backends

* [tinify](#tinify) - Uses the tinify (tinyPNG / tinyJPG) API to compress the images.
* [svgo](#svgo) - Uses the svgo library to compress svg images
* ... more to come. Create an Issue or PullRequest if you want to include a new Backend.

### Tinify

 Uses the tinify (tinyPNG / tinyJPG) API to compress the images.

#### Proxy

```bash
    --tinify-proxy    Proxy to use, to connect to the tinify services
```

* Option type: `string`
* Default: `none`
* Required: `optional`

#### API Key

```bash
    --tinify-api-key  API Key to get access to the tinify services
```

* Option type: `string`
* Default: `none`
* Required: `required`

### Svgo

Uses the svgo library to compress svg images.

!> The SVGO Backend has no custom options that can be specified. The Module uses the svgo default configuration. That configuration should provide the best results. 
