const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://www.restaurangp2.se/lunch';

rp(url)
    .then(function(html) {
        //success!

        const monday = $('tr', '#monday', html);

        console.log(monday.length);
        console.log(monday[0]);
        // console.log(monday[0].html());
        // monday.forEach(course => {
        //     console.log(course);
        // });
    })
    .catch(function(err) {
        //handle error
        console.error(err);
    });
