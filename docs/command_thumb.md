## Usage

The `rimg thumb <files>` command creates thumbnails with a given size. 

```bash
// Create thumbnails from all png images inside the pictures folder
$ rimg thumb pictures/*.png
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

### Width

```bash
  -w, --width       Width for the resulting image. 
```

* Option type: `number`
* Default: `none`
* Required: `required`

### Height

```bash
  -h, --height      height for the resulting image.
```

* Option type: `number`
* Default: `none`
* Required: `required`

### Backends

```bash
    -b, --backends    Which Backend or Backends should be used to process the images
```

* Option type: `array` of strings see the list of [available Backends](#available-backends) for backends that can be used to compress images.
* Default: `["tinify"]`
* Required: `optional`

## Available Backends

* [tinify](#tinify) - Uses the tinify (tinyPNG / tinyJPG) API to compress the images.
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
