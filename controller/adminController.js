const { db } = require('../database')

module.exports = {
    tesDB: (req, res) => {
        const sql = `SELECT * FROM "admin"."admin"`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })      
    }
}