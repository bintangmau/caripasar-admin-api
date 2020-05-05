const express = require('express')
const { wilayahController } = require('../controller')

const router = express.Router()

router.get('/getdatawilayah', wilayahController.getDataWilayah)
router.post('/inputkota', wilayahController.inputWilayah)
router.post('/deletekota', wilayahController.deleteKota)
router.get('/getjumlahsupplier/:idkota', wilayahController.getJumlahSupplier)
router.get('/getjumlahjenisbarang/:idKota', wilayahController.getJumlahJenisBarang)
router.get('/getjumlahstokbarang/:idKota', wilayahController.getJumlahStokBarang)
router.get('/searchwilayahbyname/:namaKota', wilayahController.searchWilayahByName)

module.exports = router