'use strict';
const db = require("./database.js").db;
const fs = require('fs');
const https = require('https');
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let result;

    await page.goto('https://github.com/Mahmoud-Skafi?tab=repositories');

    const repoTitles = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(1)>h3>a'), e => e.innerText));
    const repourl = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(1)>h3>a'), e => e.getAttribute('href')));
    const repoDescription = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(2)>p'), e => e.innerText));
    const repoColor = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(3)>span>span:nth-child(1)'), e => e.getAttribute('style')));
    const repoLanguage = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(3)>span>span:nth-child(2)'), e => e.innerText));
    const repoStar = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(3)>a:nth-child(2)'), e => e.innerText));
    const repoFork = await page.evaluate(() => Array.from(document.querySelectorAll('#user-repositories-list >ul>li>div:nth-child(1)>div:nth-child(3)>a:nth-child(3)'), e => e.innerText));

    for (let i = 0; i < repoTitles.length; i++) {

        let data = {
            "reop_name": repoTitles[i],
            "repo_url": 'https://github.com' + repourl[i],
            "repo_description": repoDescription[i],
            "repo_fork_count": repoFork[i],
            "reop_stargazers_count": repoStar[i],
            "repo_language": repoLanguage[i],
            "repo_color": repoColor[i]
        }
        db.getConnection(function (err, connection) {
            connection.release();
            if (err)
                return console.log(err);
            connection.query('INSERT INTO tblgithub SET ? ', data, function (error, results, fields) {
                if (error) throw error
                else console.log(results);
            });

        });

    }

    await browser.close();
})();

