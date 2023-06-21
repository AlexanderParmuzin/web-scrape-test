import fetch from 'node-fetch';
import cheerio from 'cheerio';

async function scrapeTest() {
    const fetchParams = {
        method: 'GET',
        headers: {},
    };

    // const resp = await fetch('https://habr.com/ru/all/', fetchParams);
    const resp = await fetch('https://www.anekdot.ru/', fetchParams);

    // console.log(await resp.json());
    const data = await resp.text();

    const $ = cheerio.load(data);

    const postTitles = [];

    $('.topicbox').each((_idx, el) => {
        const postJSON = {
            postTitle: $(el).find('.text').text(),
            postAuthor: $(el).find('.auth').text(),
            postStars: $(el).find('.user-star').text()
        }
        postTitles.push(postJSON);
    });

    return postTitles;
}

console.log(await scrapeTest());
