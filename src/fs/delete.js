import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRemoveDir = path.join(__dirname, 'files/fileToRemove.txt');

const remove = async () => {
    if (!fs.existsSync(fileToRemoveDir)) {
        throw new Error('FS operation failed');
    }

    await fs.promises.unlink(fileToRemoveDir);
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await remove();
