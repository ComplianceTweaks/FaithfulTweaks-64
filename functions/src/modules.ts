import { Archiver } from "archiver";
import * as path from 'path';
import * as fs from 'fs';

// ----- MODULES -----
const modulesData: Record<string, any> = {
//  ModuleID               : './path/to/moduleid.json',
    TestModule             : 'testModule.json',

    // Aesthetic
    AlternateDestruction   : '/aesthetic/AlternateDestruction.json',
    AlternateEntities      : '/aesthetic/AlternateEntities.json',
    AnimatedCampfire       : '/aesthetic/AnimatedCampfire.json',
    BedIcons               : '/aesthetic/BedIcons.json',
    BlackNetherBricks      : '/aesthetic/BlackNetherBricks.json',
    CherryPicking          : '/aesthetic/CherryPicking.json',
    CodeCraftedWool        : '/aesthetic/CodeCraftedWool.json',
    ColorParticle          : '/aesthetic/ColorParticle.json',
    DesatPurpur            : '/aesthetic/DesatPurpur.json',
    DifferentStems         : '/aesthetic/DifferentStems.json',
    EndlessRod             : '/aesthetic/EndlessRod.json',
    FlintArrow             : '/aesthetic/FlintArrow.json',
    GlassDoors             : '/aesthetic/GlassDoors.json',
    GreenJungle            : '/aesthetic/GreenJungle.json',
    JappaSpectralArrow     : '/aesthetic/JappaSpectralArrow.json',
    OldNetherite           : '/aesthetic/OldNetherite.json',
    PinkRod                : '/aesthetic/PinkRod.json',
    PlainLeather           : '/aesthetic/PlainLeather.json',
    RedCrimson             : '/aesthetic/RedCrimson.json',
    RedGolemFlowers        : '/aesthetic/RedGolemFlowers.json',
    SidewaysNuggets        : '/aesthetic/SidewaysNuggets.json',
    SofterWool             : '/aesthetic/SofterWool.json',
    SmoothWarped           : '/aesthetic/SmoothWarped.json',
    SolidHoney             : '/aesthetic/SolidHoney.json',
    SolidSlime             : '/aesthetic/SolidSlime.json',
    SplashEnchanting       : '/aesthetic/SplashEnchanting.json',
    UnbundledHayBales      : '/aesthetic/UnbundledHayBales.json',
    UniqueDyes             : '/aesthetic/UniqueDyes.json',

    // Terrain
    BetterBedrock          : '/terrain/BetterBedrock.json',
    BrighterNether         : '/terrain/BrighterNether.json',
    CircularSnM            : '/terrain/CircularSnM.json',
    PebblelessCoarseDirt   : '/terrain/PebblelessCoarseDirt.json',
    PebblelessDirt         : '/terrain/PebblelessDirt.json',
    SmoothOak              : '/terrain/SmoothOak.json',
    UniformOres            : '/terrain/UniformOres.json',
    WhiterSnow             : '/terrain/WhiterSnow.json',
    
    // Lower and Sides
    LowerCrimson           : '/sides/LowerCrimson.json',
    LowerGrass             : '/sides/LowerGrass.json',
    LowerMycelium          : '/sides/LowerMycelium.json',
    LowerPaths             : '/sides/LowerPaths.json',
    LowerPodzol            : '/sides/LowerPodzol.json',
    LowerSnow              : '/sides/LowerSnow.json',
    LowerWarped            : '/sides/LowerWarped.json',
    SidesCrimson           : '/sides/SidesCrimson.json',
    SidesGrass             : '/sides/SidesGrass.json',
    SidesMycelium          : '/sides/SidesMycelium.json',
    SidesSnow              : '/sides/SidesSnow.json',
    SidesPaths             : '/sides/SidesPaths.json',
    SidesPodzol            : '/sides/SidesPodzol.json',
    SidesWarped            : '/sides/SidesWarped.json',
    ShorterGrass           : '/sides/ShorterGrass.json',
    ShorterTallGrass       : '/sides/ShorterTallGrass.json',

    // Utility
    AgedKelp               : '/utility/AgedKelp.json',
    BetterObservers        : '/utility/BetterObservers.json',
    BrewingGuide           : '/utility/BrewingGuide.json',
    BrokenItems            : '/utility/BrokenItems.json',
    CleanRedstone          : '/utility/CleanRedstone.json',
    ClearPatterns          : '/utility/ClearPatterns.json',
    ColoredBows            : '/utility/ColoredBows.json',
    CropMarker             : '/utility/CropMarker.json',
    DirectionalHoppers     : '/utility/DirectionalHoppers.json',
    NetherwartGrowthStage  : '/utility/NetherwartGrowthStage.json',
    OreBorders             : '/utility/OreBorders.json',
    RedstonePower          : '/utility/RedstonePower.json',
    StackedItems           : '/utility/StackedItems.json',
    StickyPistonSides      : '/utility/StickyPistonSides.json',
    VisibleTripwires       : '/utility/VisibleTripwires.json',
    VisualHoney            : '/utility/VisualHoney.json',

    // Unobtrusive
    AlternateEnchantGlint  : '/unobtrusive/AlternateEnchantGlint.json',
    BorderlessGlass        : '/unobtrusive/BorderlessGlass.json',
    CleanBorderlessGlass   : '/unobtrusive/CleanBorderlessGlass.json',
    CleanGlass             : '/unobtrusive/CleanGlass.json',
    ClearPumpkinBlur       : '/unobtrusive/ClearPumpkinBlur.json',
    InvisibleTotem         : '/unobtrusive/InvisibleTotem.json',
    LowFire                : '/unobtrusive/LowFire.json',
    LowShield              : '/unobtrusive/LowShield.json',
    NoVignette             : '/unobtrusive/NoVignette.json',
    ReducedPumpkinBlur     : '/unobtrusive/ReducedPumpkinBlur.json',
    SlicedSwords           : '/unobtrusive/SlicedSwords.json',
    UnobtrusiveRain        : '/unobtrusive/UnobtrusiveRain.json',
    UnobtrusiveScaffolding : '/unobtrusive/UnobtrusiveScaffolding.json',
    UnobtrusiveWater       : '/unobtrusive/UnobtrusiveWater.json',

    // UI
    DarkUI                 : '/ui/DarkUI.json',
}

// Figure out which modules to add
export async function addModules(format: string, archive: Archiver, modules: string[]) {
    // For each module
    const promises = modules.map(async (modName) => {
        // If the module exists
        if (modulesData[modName] !== undefined && modulesData[modName] !== null) {
            const obj = JSON.parse(fs.readFileSync(path.join('./src/modules/', modulesData[modName]), 'utf8'));

            // Try to get module path
            let directory;
            try {
                directory = obj[format];
            } catch (e) {
                // If version has no path return
                console.log('Invalid Version: '+e);
                return;
            }
            
            // Make path to files
            const DLPath = path.join('images', directory);

            // List files
            archive.directory(DLPath, false);
        }
    });
    return Promise.all(promises);
}
