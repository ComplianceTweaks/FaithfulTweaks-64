[wiki]: https://github.com/FaithfulTweaks/FaithfulTweaks/wiki
[node]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/

# Functions
This folder is the home of the firebase functions. One of the functions, called `deletePacks`, deletes all of the resource packs that have been generated, this runs once every 24 hours. Another function, called `makePack`, creates the new resource pack, this acts like a server.

## Testing and Building
The cloud functions, when testing, are run using the firebase emulator. Please first run `npm install` to install the required [NodeJS][node] packages.

- `npm run serve` - This will serve a local version of the `makePack` cloud function.

### Sending Requests To The Cloud Function
To test out pack creation, run the cloud function with `npm run serve` and then make a POST request to `http://localhost:5001/faithfultweaks-64/us-central1/makePack`.

#### Example Body Of POST Request
```json
{
    "format":  "1.16.2",
    "modules":  ["SlicedSwords", "ReducedPumpkinBlur", "ColoredBows", "OreBorders", "StickyPistonSides"],
    "iconModules": ["MelonHunger", "ColoredPing", "BlueWitherHearts", "RainbowXP"],
    "optionsBackground": "AcaciaPlanksBG",
    "panoOption": "ClassicPano"
}
```

#### Example Response From POST Request
```json
{
    "url": "https://firebasestorage.googleapis.com/v0/b/faithfultweaks-64.appspot.com/o/FaithfulTweaks%2FXXXXXXXXXX.zip?alt=media&token=XXXXXXXXXX"
}
```

## A Quick Rundown
Here's a quick rundown on what a few different folders do.

- `images/` - The textures for all of the modules.
- `src/modules/` - The JSON data for all of the modules.
- `src/` - The [TypeScript][typescript] code used for the cloud functions.

## Looking For More?
If you need some more help please refer to [the wiki][wiki].