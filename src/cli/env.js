const parseEnv = () => {
    const PREFIX = 'RSS_';
    const envVariables = process.env;

    const parsedVariables = Object.entries(envVariables)
        .filter(([key]) => key.startsWith(PREFIX))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    if (parsedVariables.length) {
        console.log(parsedVariables);
    }
};

parseEnv();
