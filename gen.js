const gen = require('@faker-js/faker');
const fs = require("fs");

const faker = gen.faker;

faker.locale = 'ru';

let arrBook = [];

for(let i = 0; i < 10; i++) {
    arrBook[i] = {
        id: i,
        name: faker.music.songName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear()
    }
}

// console.log(arrUser)
fs.writeFileSync('db.json', JSON.stringify(arrBook));
