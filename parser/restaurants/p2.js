const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://www.restaurangp2.se/lunch';

const NAME = 'P2';
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const parseP2 = () => {
    return rp(url)
        .then(function(html) {
            const restaurant = {
                name: NAME,
                info: '',
                menu: []
            };

            weekdays.forEach(day => {
                const currentDayHTML = $('tr', '#' + day, html);

                let currentDay = {
                    day,
                    courses: []
                };

                for (let i = 0; i < currentDayHTML.length; i++) {
                    const type = $('.course_type', currentDayHTML[i]).text();
                    const description = $(
                        '.course_description',
                        currentDayHTML[i]
                    ).text();
                    const price = $('.course_price', currentDayHTML[i]).text();

                    let course = {
                        type,
                        description,
                        price
                    };

                    currentDay.courses.push(course);
                }

                restaurant.menu.push(currentDay);
            });

            console.log('data', JSON.stringify(restaurant, null, 4));
        })
        .catch(function(err) {
            //handle error
            console.error(err);
        });
};

module.exports = parseP2;
