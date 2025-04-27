import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    if (fs.existsSync(filePath)) {
        throw new Error('FS operation failed');
    }

    await fs.promises.writeFile(filePath, 'I am fresh and young');
};

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

await create();
