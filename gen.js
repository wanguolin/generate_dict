const fs = require('fs')

fs.readFile('dict/Websters/websters_dict_compact.json', (err, data) => {
    if (err) throw err;
    let dict = JSON.parse(data);

    let start_with = {}, suffix = { '-': {}};
    for(let i = 97; i <= 122; i++) {
        start_with[String.fromCharCode(i)] = {};
    }

    for (let word in dict) {
        word[0] == '-' ? suffix[word] = dict[word] : start_with[word[0]][word] = dict[word];
    }
    for(let i = 97; i <= 122; i++) {
        const filename = 'dict/Websters/gen/start_with_' + String.fromCharCode(i) + '.json';
        fs.writeFileSync(filename, JSON.stringify(start_with[String.fromCharCode(i)]));
    }
    fs.writeFileSync('dict/Websters/gen/suffix.json', JSON.stringify(suffix));
    });

