import { existsSync, writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    if (existsSync(filePath)) {
        throw new Error('FS operation failed');
    }

    writeFile(filePath, 'I am fresh and young', error => {
        if (error) {
            throw error;
        }
    });
};

await create();
