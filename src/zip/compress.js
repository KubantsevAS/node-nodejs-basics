import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const compressFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzip = createGzip();

    const sourceFile = await fs.promises.open(sourceFilePath);
    const sourceFileStream = sourceFile.createReadStream();
    const compressFileStream = fs.createWriteStream(compressFilePath);

    sourceFileStream.pipe(gzip).pipe(compressFileStream);
};

await compress();
