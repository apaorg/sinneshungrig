const parseP2 = require('./restaurants/p2');

const parseRestaurants = async () => {
    await parseP2();
    console.log('Done parsing');
};

module.exports = {
    parseRestaurants
};
