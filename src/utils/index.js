const faker = require('faker');

const generateArray = (num) => {
    const array = [];
    
    for (let i = 1; i <= num; i++) {
        array.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    };

    return array;
}

module.exports = {
    generateArray
}