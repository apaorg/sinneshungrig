const rp = require('request-promise');
const $ = require('cheerio');
const moment = require('moment');

moment.locale('sv');

const NAME = 'P2';
const URL = 'https://www.restaurangp2.se/lunch';

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

console.log(
    moment()
        .day('monday')
        .day()
);

const parseP2 = () => {
    return rp(URL)
        .then(html => {
            const currentWeek = +$('.week_number', html)
                .text()
                .match(/\d+/)[0];
            console.log(typeof currentWeek);
            console.log('currentWeek', currentWeek);
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

            // console.log('data', JSON.stringify(restaurant, null, 4));
        })
        .catch(err => {
            //handle error
            console.error(err);
        });
};

module.exports = parseP2;
