# It's a website

## Optimized images

Because browsers can use srcset/w+sizes to download images at a specific optimized size we use the [avif npm package](https://www.npmjs.com/package/avif) to optimize our jpg images. The original images are 2000x1333 or reversed depending on orientation. We server these as a fallback option for really old browsers. Besides the original we have a number of avif files for modern browsers, the total number of formats and sizes are listed here:

| Format | Size | Width | Resolution |
| jpeg | original | 2000w | 2000x1333 |
| avif | original | 2000w | 2000x1333 |
| avif | large | 1500w | 1500x1000 |
| avif | medium | 1000w | 1000x667 |
| avif | small | 500w | 500x333 |

The script to convert .jpg to .avif is in the `tools` folder, run it by utilizing npm as follows:

```bash
$ npm run convert

```
