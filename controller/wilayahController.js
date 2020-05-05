const { db } = require('../database')

module.exports = {
    getDataWilayah: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kota";`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })            
    },
    inputWilayah: (req, res) => {
        var sql = `INSERT INTO "caripasar"."kota"( "namakota" )
                    VALUES ('${req.body.namaKota}');`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            req.app.io.emit('input-kota-baru', { m: 'success' })
            return res.status(200).send(results)
        })            
    },
    deleteKota: (req, res) => {
        var sql = `DELETE FROM "caripasar"."kota" WHERE "idkota" = ${req.body.idKota};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            req.app.io.emit('delete-kota', { m: 'success' })
            return res.status(200).send(results)
        })            
    },
    getJumlahSupplier: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahSupplier FROM "caripasar"."supplier" WHERE	"idkota" = ${req.params.idkota};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })            
    },
    getJumlahJenisBarang: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahjenisbarang FROM "caripasar"."barang" b
                    JOIN "caripasar"."supplier" s
                    ON s."idsupplier" = b."idSupplier"
                    JOIN "caripasar"."kota" k
                    ON s."idkota" = k."idkota"
                    WHERE s."idkota" = ${req.params.idKota};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })            
    },
    getJumlahStokBarang: (req, res) => {
        var sql = `SELECT b."stokBarang" as jumlahstokbarang FROM "caripasar"."barang" b
        JOIN "caripasar"."supplier" s
        ON s."idsupplier" = b."idSupplier"
        JOIN "caripasar"."kota" k
        ON s."idkota" = k."idkota"
        WHERE s."idkota" = ${req.params.idKota};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })            
    },
    searchWilayahByName: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kota"
                    WHERE "namakota" LIKE ('%${req.params.namaKota}%');`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })          
    }
}