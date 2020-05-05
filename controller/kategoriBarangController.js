const { db } = require('../database')

module.exports = {
    getKategoriBarang: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kategoribarang";`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })          
    },
    inputKategori: (req, res) => {
        var sql = `INSERT INTO "caripasar"."kategoribarang"
                        ("namakategori")
                    VALUES 
                        ('${req.body.namaKategori}');`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            req.app.io.emit('input-kategori-barang', { m: 'success' })
            return res.status(200).send(results)
        })          
    },
    deleteKategoriBarang: (req, res) => {
        var sql = `DELETE FROM "caripasar"."kategoribarang" WHERE "idkategori" = ${req.params.idKategori}`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            req.app.io.emit('delete-kategori-barang', { m: 'success' })
            return res.status(200).send(results)
        })          
    },
    getJumlahProdukPerJenis: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahjenisbarang 
                    FROM "caripasar"."barang"
                    WHERE "kategoriBarang" = ${req.params.idKategori};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })          
    },
    getJumlahProdukPerStok: (req, res) => {
        var sql = `SELECT "stokBarang" 
                    FROM "caripasar"."barang"
                    WHERE "kategoriBarang" = ${req.params.idKategori};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })         
    }
}