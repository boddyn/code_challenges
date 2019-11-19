const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query.word) {
        console.log(query.word);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            'result': isPyramidWord(query.word)
        }));
        res.end();
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Please supply a word as a query.');
    }
}).listen(8080);

function isPyramidWord(word) {
    frequencies = [];
    var cur;
    var count = 0;
    var letters = word.split('');
    letters.sort();
    for (var i = 0; i < letters.length; i++) {
        if (cur == null) {
            cur = letters[i];
            count = 1;
        }
        else {
            if (letters[i] == cur) {
                count++;
            }
            else {
                frequencies.push(count);
                cur = letters[i];
                count = 1;
            }
        }
        if (i == letters.length - 1) {
            frequencies.push(count);
        }
    }
    frequencies.sort();
    for (var i = 0; i < frequencies.length; i++) {
        if (frequencies[i] != i + 1) {
            return false;
        }
    }
    return true;
}
