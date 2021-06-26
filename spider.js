const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

axios.get('https://www.imdb.com/chart/top/')
    .catch(function(error) {
        throw error;
    })
    .then(function(res) {
        let $ = cheerio.load(res.data);
        $('.lister-list tr').each(function() {
            let title = $(this).find('.titleColumn a').text().trim();
            let rating = $(this).find('.imdbRating strong').text().trim();

            fs.appendFile('imdb.txt', title + ' - ' + rating + '\n', function(err) {
                if (err) throw err;
            });
        })
    });