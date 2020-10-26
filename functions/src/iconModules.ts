// ICON MODULES ARE HANDLED DIFFERENTLY THAN REGULAR MODULES
// IMPORTS
import { Archiver } from "archiver";
import * as path from 'path';

// Image merging
import { createCanvas, Image } from 'canvas';

// Figure out which modules to add
export async function addIconModules(modules: string[], archive: Archiver){
    // Set all modes to default
    const crosshairMode = 0;
    let hungerMode = 0;
    let pingMode = 0;
    let witherHeartsMode = 0;
    let xpMode = 0;

    // Image buffer variables
    const defaultIcons = new Image; // Default
    const crosshairIcons = new Image; // Crosshair
    const hungerIcons = new Image; // Hunger
    const pingIcons = new Image; // Ping
    const witherIcons = new Image;  // Wither
    const xpIcons = new Image; // XP
    
    /*
    ----- KEY FOR ICON MODULE MODES -----
    0 = default
    
    Crosshair:

    Hunger:
        1 = Melons
        2 = Bread

    Ping:
        1 = Rainbow
    
    WitherHearts:
        1 = Blue
    
    XP:
        1 = Rainbow

    */

    // Interpret modules so it can be used to make the icon.png file later
    modules.forEach((modName) => {
        if (modName === "MelonHunger") {
            hungerMode = 1;
        } if (modName === "BreadHunger") {
            hungerMode = 2;
        } else if (modName === "ColoredPing") {
            pingMode = 1;
        } else if (modName === "BlueWitherHearts") {
            witherHeartsMode = 1;
        } else if (modName === "RainbowXP") {
            xpMode = 1;
        } else {
            console.log(modName + " is not a valid icon mod");
        }
    });

    // If nothings set, return.
    if (crosshairMode === 0 && hungerMode === 0 && pingMode === 0 && witherHeartsMode === 0 && xpMode === 0) {
        return;
    } else {
    // If something is set then create an icons.png file

        // Get defualt icons.png
        defaultIcons.src = path.join("images", "modules/hud", "default.png");

        // Get crosshair icons
        if (crosshairMode === 0) {
            crosshairIcons.src = path.join("images", "modules/hud", "crosshair", "default.png");
        }

        // Get hunger icons
        if (hungerMode === 0) {
            hungerIcons.src = path.join("images", "modules/hud", "hunger", "default.png");
        } else if (hungerMode === 1) {
            hungerIcons.src = path.join("images", "modules/hud", "hunger", "melons.png");
        } else if (hungerMode === 2) {
            hungerIcons.src = path.join("images", "modules/hud", "hunger", "bread.png");
        }

        // Get ping icons
        if (pingMode === 0) {
            pingIcons.src = path.join("images", "modules/hud", "ping", "default.png");
        } else if (pingMode === 1) {
            pingIcons.src = path.join("images", "modules/hud", "ping", "colored.png");
        }

        // Get wither icons
        if (witherHeartsMode === 0) {
            witherIcons.src = path.join("images", "modules/hud", "witherhearts", "default.png");
        } else if (witherHeartsMode === 1) {
            witherIcons.src = path.join("images", "modules/hud", "witherhearts", "blue.png");
        }

        // Get XP icons
        if (xpMode === 0) {
            xpIcons.src = path.join("images", "modules/hud", "xp", "default.png");
        } else if (xpMode === 1) {
            xpIcons.src = path.join("images", "modules/hud", "xp", "rainbow.png");
        }

        // Mix the images together
        const canvas = createCanvas(512, 512); // Make canvas
        const ctx = canvas.getContext('2d'); // Canvas context

        // Specify settings
        ctx.antialias = 'none';

        // Draw icons
        ctx.drawImage(defaultIcons, 0, 0);
        ctx.drawImage(crosshairIcons, 0, 0);
        ctx.drawImage(hungerIcons, 0, 0);
        ctx.drawImage(pingIcons, 0, 0);
        ctx.drawImage(witherIcons, 0, 0);
        ctx.drawImage(xpIcons, 0, 0);
        //
        // Add image to zip archive
        const iconsPng = canvas.toBuffer(
            'image/png', 
            {
                compressionLevel: 9,
            }
        );
        archive.append(iconsPng, {name: path.join("assets/minecraft/textures/gui", "icons.png")});

        return;
    }

    
}