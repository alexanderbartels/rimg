
## About

This Backend uses the [Tinify NodeJS API](https://tinypng.com/developers/reference/nodejs) to process the images. 

!> Note that you need an API Key to use this Backend. It has to be defined via the `--tinify-api-key` option for every command that uses the tinify backend. Have a Look at the [Tinify Developer Site](https://tinypng.com/developers) to get your API key.


## Supported Commands
* `compress` - It uses the tinify compression api.
* `thumb` - Creates thumbnails using the tinify resize API with the thumb method. 
* `srcset` - Creates an 1x image from an 2x input file using the tinify resize API with the scale method.
 
