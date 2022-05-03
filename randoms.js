const getRandoms = (number) => {
    let randomNumbers = [];

    for (let i = 0; i < number; i++) {
        randomNumbers.push(Math.floor(Math.random() * 1000) + 1);
    }

    let repeatedNumbers = {};

    for (let number in randomNumbers) {
        let repetitions = randomNumbers.filter(num => num == randomNumbers[number]);

        let numberExists = repeatedNumbers.hasOwnProperty(randomNumbers[number]);

        if (!numberExists) {
            repeatedNumbers[randomNumbers[number]] = repetitions.length;
        }
    }

    let result = JSON.stringify(repeatedNumbers, null, '...');

    return result;
}

process.on('message', () => {
    const randoms = getRandoms(process.argv[2]);
    process.send(randoms);
})