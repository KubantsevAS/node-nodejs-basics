// implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream

import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import path from 'path';
import fs from 'fs';
import assert from 'assert';

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
