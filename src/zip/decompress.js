import { fileURLToPath } from 'url';
import { createUnzip } from 'zlib';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const archiveFilePath = path.join(__dirname, 'files', 'archive.gz');
const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    if (!fs.existsSync(archiveFilePath)) {
        throw new Error('FS operation failed');
    }

    const unzip = createUnzip();

    const archiveFile = await fs.promises.open(archiveFilePath);
    const archiveFileStream = archiveFile.createReadStream();
    const decompressFileStream = fs.createWriteStream(filePath);

    archiveFileStream.pipe(unzip).pipe(decompressFileStream);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await decompress();
