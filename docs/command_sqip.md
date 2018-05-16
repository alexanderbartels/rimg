## Usage

The `rimg sqip <files>` command creates thumbnails with a given size. 

```
// Create svg placeholder images using sqip from all png images inside the pictures folder
$ rimg sqip pictures/*.png
```


## Parameter 
### Quiet

```
  -q, --quiet       In quiet mode only successfully processed images are printed
                    to std out.
```

* Option type: `boolean`
* Default: `false`
* Required: `optional`


### Output

```
  -o, --output      Output directory to store the processed images.
```

* Option type: `string`
* Default: `out`
* Required: `optional`

### Width

```
  -w, --width       Width for the resulting image. 
```

* Option type: `number`
* Default: `none`
* Required: `required`

### Height

```
  -h, --height      height for the resulting image.
```

* Option type: `number`
* Default: `none`
* Required: `required`


### Backends

```
    -b, --backends    Which Backend or Backends should be used to process the images
```

* Option type: `array` of strings see the list of [available Backends](#available-backends) for backends that can be used to compress images.
* Default: `["tinify"]`
* Required: `optional`

## Available Backends 

* [primitive](#primitive) - Uses the pritive library through the sqip npm module to generate svg placeholder images. 
* ... more to come. Create an Issue or PullRequest if you want to include a new Backend.

### Primitive
Uses the pritive library through the sqip npm module to generate svg placeholder images. 

#### Mode
```
    --primitive-mode   Mode (default=0) 0=combo, 1=triangle, 2=rect, 3=ellipse,
                     4=circle, 5=rotatedrect, 6=beziers, 7=rotatedellipse,
                     8=polygon
```

* Option type: `number`
* Default: `0`
* Required: `optional`

#### Count
```
    --primitive-count  Customize the number of primitive SVG shapes (default=8) to
                     influence bytesize or level of detail
```

* Option type: `number`
* Default: `8`
* Required: `optional`

#### Blur
```
    --primitive-blur   Set the gaussian blur (default=12)
```

* Option type: `number`
* Default: `12`
* Required: `optional`
