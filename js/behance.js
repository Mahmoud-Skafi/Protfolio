'use strict';
const db = require("./database.js").db;
const fs = require('fs');
const https = require('https');
const puppeteer = require('puppeteer');

//https://stackoverflow.com/questions/52542149/how-can-i-download-images-on-a-page-using-puppeteer thanks Grant Miller

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });
    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });
});

/** 
 * Download All Images
 */
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let result;

    await page.goto('https://www.behance.net/mahmoudska068a');

    const images = await page.evaluate(() => Array.from(document.querySelectorAll('.Cover-content-2R2 img'), e => e.src));
    const titles = await page.evaluate(() => Array.from(document.querySelectorAll('.ProjectCoverNeue-details-yQ_ >div>span>a'), e => e.innerText));
    const likes = await page.evaluate(() => Array.from(document.querySelectorAll('.Stats-stats-1iI span:nth-child(2)'), e => e.innerText));
    const views = await page.evaluate(() => Array.from(document.querySelectorAll('.Stats-stats-1iI span:nth-child(4)'), e => e.innerText));

    for (let i = 0; i < images.length; i++) {
        result = await download(images[i], `image-${i}.png`);
        let data = {
            "imgeurl": `image-${i}.png`,
            "title": titles[i],
            "likes": likes[i],
            "views": views[i]
        }
        db.getConnection(function (err, connection) {
            connection.release();
            if (err)
                return console.log(err);
            connection.query('INSERT INTO tblbehance SET ? ', data, function (error, results, fields) {
                if (error) throw error;
                else
                    console.log(results);
            })


        });
        if (result === true) {
            console.log('Success:', images[i], 'has been downloaded successfully.');
        } else {
            console.log('Error:', images[i], 'was not downloaded.');
            console.error(result);
        }
    }

    await browser.close();
})();

