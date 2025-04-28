import { pipeline, Transform } from "stream";

const transform = async () => {
    const { stdin: readable, stdout: writable } = process;

    const transform = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, String(chunk).split('').reverse().join('') + '\n');
        }
    });

    pipeline(readable, transform, writable, error => { console.error(error) });
};

await transform();
