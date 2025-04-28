import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

function createWorker(index) {
    const MIN_INITIAL_NUMBER = 10;

    return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
            workerData: { incrementalNumber: MIN_INITIAL_NUMBER + index },
        });
        worker.on('message', data => resolve(data));
        worker.on('error', error => reject(error.message));
    });
}

async function getPromisesStatus(arrayOfPromises) {
    const FULFILLED = 'fulfilled';
    const result = [];

    await Promise.allSettled(arrayOfPromises).then(results => {
        results.forEach(workerData => {
            result.push({
                status: workerData.status === FULFILLED ? 'resolved' : 'error',
                data: workerData.value || null,
            });
        });
    });

    return result;
}

const performCalculations = async () => {
    const coreCount = os.availableParallelism();
    const workerPromises = [];

    for (let index = 0; index < coreCount; index++) {
        workerPromises.push(createWorker(index));
    }

    console.log(await getPromisesStatus(workerPromises));
};

await performCalculations();
