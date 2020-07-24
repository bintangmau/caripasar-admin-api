const { db } = require('../database')
const { uploader } = require('../helper/uploader')

module.exports = {
    getDataBarang: (req, res) => {
        var sql = `	SELECT 
                        "idBarang",
                        "namaBarang",
                        "hargaBarang",
                        "stokBarang",
                        "deskripsiBarang",
                        "namasupplier",
                        "satuanBarang",
                        "kaloriBarang",
                        "nutrisiBarang"
                    FROM
                        "caripasar"."barang"
                    JOIN "caripasar"."supplier"
                        ON "idSupplier" = "idsupplier"
                    ORDER BY 
                        "idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
                return res.status(200).send(results)
        })            
    },
    inputBarang: (req, res) => {
        const path = '/barang/photo'
        const upload = uploader(path, 'BARANG').fields([{ name: 'image' }])

          upload(req, res, (err) =>  {
            if(err) {
                return res.status(500).json({ message: 'Upload image failed !', error: err.message })
            }

            const { image } = req.files
            
            const data = JSON.parse(req.body.data)

            data.gambarBarang = `${image[0].filename}` 

            var sql = `INSERT INTO "caripasar"."barang"
            ("namaBarang", "hargaBarang", "stokBarang", "deskripsiBarang", "idSupplier", "gambarBarang", "kategoriBarang", "satuanBarang",
                "kaloriBarang", "nutrisiBarang" )
                VALUES ('${data.namaBarang}', 
                        ${data.hargaBarang}, 
                        ${data.stokBarang}, 
                        '${data.deskripsiBarang}', 
                        ${data.idSupplier}, 
                        '${data.gambarBarang}', 
                        ${data.kategoriBarang},
                        '${data.satuanBarang}',
                        ${data.kaloriBarang},
                        '${data.nutrisiBarang}');`

            db.query(sql, (err, results) => {
                if(err) {
                    console.log(err)
                return res.status(500).send(err)
                } 
                return res.status(200).send(results)
            })               
        })
    },
    deleteBarang: (req, res) => {
        var sql = `DELETE FROM "caripasar"."barang" WHERE "idBarang" = ${req.body.idBarang};`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            req.app.io.emit('delete-barang', {})
            return res.status(200).send(results)
        })             
    },
    editBarang: (req, res) => {
        var sql =  `UPDATE "caripasar"."barang" 
                    SET 
                        "namaBarang" = '${req.body.namaBarang}',
                        "hargaBarang" = ${req.body.hargaBarang},
                        "stokBarang" = ${req.body.stokBarang},
                        "deskripsiBarang" = '${req.body.deskripsiBarang}',
                        "satuanBarang" = '${req.body.satuanBarang}',
                        "kaloriBarang" = ${req.body.kaloriBarang},
                        "nutrisiBarang" = '${req.body.nutrisiBarang}'
                        WHERE "idBarang" = ${req.body.idBarang};
                        `
        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            req.app.io.emit('save-edit-barang', { m: 'success' })
            return res.status(200).send(results)
        })                
    },
    cariBarang: (req, res) => {
        var sql = `SELECT 
                        "idBarang",
                        "namaBarang",
                        "hargaBarang",
                        "stokBarang",
                        "deskripsiBarang",
                        "idSupplier"
                    FROM
                        "caripasar"."barang"
                    WHERE 
                        "namaBarang" LIKE('%${req.params.namaBarang}%')
                    ORDER BY 
                            "idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })             
    },
    getListNamaSupplier: (req, res) => {
        var sql = `SELECT "idsupplier", "namasupplier" from "caripasar"."supplier";`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })        
    },
    filterBarangBySupplier: (req, res) => {
        var sql = `	SELECT 
                            "idBarang",
                            "namaBarang",
                            "hargaBarang",
                            "stokBarang",
                            "deskripsiBarang",
                            "namasupplier"
                    FROM
                            "caripasar"."barang"
                    JOIN "caripasar"."supplier"
                            ON "idSupplier" = "idsupplier"
                    WHERE "idSupplier" = ${req.params.idSupplier}
                    ORDER BY 
                            "idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })         
    },
    filterBarangByStock: (req, res) => {
        var sql = `SELECT 
                            "idBarang",
                            "namaBarang",
                            "hargaBarang",
                            "stokBarang",
                            "deskripsiBarang",
                            "namasupplier"
                    FROM
                            "caripasar"."barang"
                    JOIN "caripasar"."supplier"
                            ON "idSupplier" = "idsupplier"
                    WHERE "stokBarang" ${req.body.operation} '${req.body.nominal}'
                    ORDER BY 
                            "idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })         
    },
    filterBarangByPrice: (req, res) => {
        var sql = `	SELECT 
                            "idBarang",
                            "namaBarang",
                            "hargaBarang",
                            "stokBarang",
                            "deskripsiBarang",
                            "namasupplier"
                    FROM
                            "caripasar"."barang"
                    JOIN "caripasar"."supplier"
                            ON "idSupplier" = "idsupplier"
                    WHERE "hargaBarang" ${req.body.operation} ${req.body.nominal}
                    ORDER BY 
                            "idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })         
    },
    getListKategoriBarang: (req, res) => {
        var sql = `SELECT * FROM "caripasar"."kategoribarang"`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
            return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })       
    },
    filterBarangByWilayah: (req, res) => {
        var sql = `SELECT b."idBarang",
                        b."namaBarang",
                        b."hargaBarang",
                        b."stokBarang",
                        b."deskripsiBarang",
                        s."namasupplier"

                FROM "caripasar"."barang" b
                JOIN "caripasar"."supplier" s
                ON s."idsupplier" = b."idSupplier"
                JOIN "caripasar"."kota" k
                ON s."idkota" = k."idkota"
                WHERE s."idkota" = ${req.params.idKota}
                ORDER BY b."idBarang" DESC;`

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } 
            return res.status(200).send(results)
        })          
    }
}