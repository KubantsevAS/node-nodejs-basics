const parseArgs = () => {
    const PREFIX = '--';

    const parsedArguments = process.argv
        .map((value, index, array) => {
            if (!value.startsWith(PREFIX)) {
                return;
            }

            const argValue = !array[index + 1]?.startsWith(PREFIX) ? array[index + 1] : undefined;

            return `${value.replace(PREFIX, '')} is ${argValue}`;
        })
        .filter(Boolean)
        .join(', ');

    console.log(parsedArguments);
};

parseArgs();
