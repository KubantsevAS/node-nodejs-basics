import { fileURLToPath } from 'url';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const calcHashFile = await fs.promises.open(filePath);
    const readStream = calcHashFile.createReadStream();
    const hash = crypto.createHash('sha256');

    readStream.on('data', chunk => hash.update(chunk));
    readStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
    readStream.on('error', error => console.error(error));
};

await calculateHash();
