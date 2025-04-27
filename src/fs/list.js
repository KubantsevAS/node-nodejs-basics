import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesDir = path.join(__dirname, 'files');

const list = async () => {
    if (!fs.existsSync(filesDir)) {
        throw new Error('FS operation failed');
    }

    const files = await fs.promises.readdir(filesDir);
    console.log(files);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await list();
