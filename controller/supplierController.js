const { db } = require('../database')

module.exports = {
    inputSupplier: (req, res) => {
        var sql = `INSERT INTO 
                    "caripasar"."supplier" ("namasupplier", "alamatsupplier", "notelp", "idkota") 
                    VALUES (
                        '${req.body.namaSupplier}', 
                        '${req.body.alamatSupplier}', 
                        ${req.body.noTelp},
                        ${req.body.idKota}
                    );`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
                return res.status(200).send(results)
        })            
    },
    getDataSupplier: (req, res) => {
        var sql = `SELECT 
                        "idsupplier",
                        "namasupplier",
                        "alamatsupplier",
                        "notelp",
                        "namakota",
                        s."idkota"
                    FROM "caripasar"."supplier" s
                    JOIN "caripasar"."kota" k
                    ON s.idkota = k.idkota
                    ORDER BY "idsupplier" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
                return res.status(200).send(results)
        })           
    },
    editSupplier: (req, res) => {
        var sql = `UPDATE "caripasar"."supplier"
                    SET "namasupplier" = '${req.body.namaSupplier}',
                            "alamatsupplier" = '${req.body.alamatSupplier}',
                            "notelp" = '${req.body.noTelp}',
                            "idkota" = ${req.body.idKota}
                    WHERE "idsupplier" = ${req.body.idSupplier};`

        db.query(sql, (err, results) => {
           if(err) {
               console.log(err)
               return res.status(500).send(err)
           }
           req.app.io.emit('save-edit-supplier', { m: 'success' })
           return res.status(200).send(results)
        })           
    },
    deleteSupplier: (req, res) => {
        var sql = `DELETE FROM "caripasar"."supplier" WHERE "idsupplier" = ${req.params.idSupplier}`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            req.app.io.emit('delete-supplier', { m: 'success' })
            return res.status(200).send(results)
         })           
    },
    cariSupplierByNama: (req, res) => {
        var sql = `SELECT 
                            *
                    FROM
                            "caripasar"."supplier"
                    WHERE 
                            "namasupplier" LIKE('%${req.params.namaSupplier}%')
                    ORDER BY 
                                    "idsupplier" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })           
    },
    getListKotaForInput: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kota";`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })           
    },
    getListDataKota: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kota";`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })       
    },
    getFilterSupplierByWilayah: (req, res) => {
        var sql = `	SELECT 
                            "idsupplier",
                            "namasupplier",
                            "alamatsupplier",
                            "notelp",
                            "namakota",
                            s."idkota"
                    FROM "caripasar"."supplier" s
                    JOIN "caripasar"."kota" k
                    ON s.idkota = k.idkota
                    WHERE s."idkota" = ${req.params.idKota}
                    ORDER BY "idsupplier" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })           
    },
    getJumlahBarang: (req, res) => {
        var sql = `SELECT COUNT(*) as jumlahbarang 
                    FROM "caripasar"."barang" b
                    JOIN "caripasar"."supplier" s
                    ON b."idSupplier" = s."idsupplier"
                    WHERE s."idsupplier" = ${req.params.idSupplier};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })         
    },
    getJumlahStok: (req, res) => {
        var sql = `SELECT b."stokBarang" as jumlahstok
                    FROM "caripasar"."barang" b
                    JOIN "caripasar"."supplier" s
                    ON b."idSupplier" = s."idsupplier"
                    WHERE s."idsupplier" = ${req.params.idSupplier};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.status(200).send(results)
        })     
    }   
}