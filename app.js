// Define JSON File
const access_token = require("./access_token").token;

const fs = require("fs");
const fetch = require("node-fetch");
// Get content from file
let contents = fs.readFileSync("users.json");
let writeStream = fs.createWriteStream('users.txt');
// the finish event is emitted when all data has been flushed from the stream
writeStream.write(`*** START OF FILE *** \n\n`, 'utf-8');
writeStream.on('finish', () => {
    console.log('file created');
});
// close the stream
writeStream.end();
// Define to JSON type
let jsonContent = JSON.parse(contents);
// Get Value from JSON
jsonContent.forEach((user, index) => {
        const url = `https://api.github.com/repos/${user}/front-end-lab-8`;
        const getForks = async url => {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `token ${access_token}`
                    }
                });
                const accountInfo = await response.json();
                if (accountInfo.forks > 0) {
                    console.log(accountInfo.owner.login);
                    fs.appendFileSync('users.txt', `https://github.com/${accountInfo.owner.login}/front-end-lab-8 \n`, 'utf-8');
                }
                if (index === 0) {
                }
            } catch (error) {
                console.log(error);
            }
        };
        getForks(url);
});