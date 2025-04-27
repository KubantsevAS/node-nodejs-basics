import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wrongFileDir = path.join(__dirname, 'files/wrongFilename.txt');
const properFileDir = path.join(__dirname, 'files/properFilename.md');

const rename = async () => {
    if (!fs.existsSync(wrongFileDir) || fs.existsSync(properFileDir)) {
        throw new Error('FS operation failed');
    }

    await fs.promises.rename(wrongFileDir, properFileDir);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await rename();
