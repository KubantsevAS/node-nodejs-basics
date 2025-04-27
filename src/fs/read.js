import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    if (!fs.existsSync(filePath)) {
        throw new Error('FS operation failed');
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    console.log(fileContent);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await read();
