import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const fileToRead = await fs.promises.open(filePath);
    const readStream = fileToRead.createReadStream();

    readStream.on('data', chunk => {
        process.stdout.write(chunk);
    });
    readStream.on('end', () => console.log(process.stdout));
    readStream.on('error', error => console.error(error));
};

await read();
