const db = require("../db/connection");
const Student = require("./Student");

const House = {};

House.all = () => {
    return db.any('SELECT * FROM houses');
}

House.find = id => {
    return db.one('SELECT * FROM houses WHERE id = ${id}', { id: id });
};


module.exports = House;