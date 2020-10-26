import * as path from 'path';
import { Archiver } from 'archiver';

const packFilesPath = "modules/panoramas";
const inPackPath = "assets/minecraft/textures/gui/title/background";
const folders: Record<string, string> = {
    ClassicPano: "ClassicPanorama",
    BastionPano: "PiglinBastion",
    EndPano: "TheEnd",
    SeirinsPano: "SeirinsSurvival",
};

export async function addMenuPanorama(moduleName: string, archive: Archiver){
    // If it exists
    if (folders[moduleName] !== undefined && folders[moduleName] !== null) {
        archive.file(path.join("images", packFilesPath, folders[moduleName], '0.png'), {name: path.join(inPackPath, 'panorama_0.png')}); // Image 0
        archive.file(path.join("images", packFilesPath, folders[moduleName], '1.png'), {name: path.join(inPackPath, 'panorama_1.png')}); // Image 1
        archive.file(path.join("images", packFilesPath, folders[moduleName], '2.png'), {name: path.join(inPackPath, 'panorama_2.png')}); // Image 2
        archive.file(path.join("images", packFilesPath, folders[moduleName], '3.png'), {name: path.join(inPackPath, 'panorama_3.png')}); // Image 3
        archive.file(path.join("images", packFilesPath, folders[moduleName], '4.png'), {name: path.join(inPackPath, 'panorama_4.png')}); // Image 4
        archive.file(path.join("images", packFilesPath, folders[moduleName], '5.png'), {name: path.join(inPackPath, 'panorama_5.png')}); // Image 5
    }
    return;
};