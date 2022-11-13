const path = require('path');

const notFound = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'assets', 'not-found.html'));
}

module.exports = {
    notFound
}