import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesDir = path.join(__dirname, 'files');
const filesCopyDir = path.join(__dirname, 'files_copy');

const copy = async () => {
    if (!fs.existsSync(filesDir) || fs.existsSync(filesCopyDir)) {
        throw new Error('FS operation failed');
    }

    await fs.promises.cp(filesDir, filesCopyDir, { recursive: true });
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await copy();
