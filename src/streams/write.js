import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

console.log(filePath);

const write = async () => {
    if (!fs.existsSync(filePath)) {
        throw new Error('FS operation failed');
    }

    const fileToWrite = await fs.promises.open(filePath, 'w');
    const writeStream = fileToWrite.createWriteStream();
    process.stdin.pipe(writeStream);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await write();
