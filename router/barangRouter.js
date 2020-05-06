const express = require('express')
const { barangController } = require('../controller')

const router = express.Router()

router.get('/getdatabarang', barangController.getDataBarang)
router.post('/inputbarang', barangController.inputBarang)
router.post('/deletebarang', barangController.deleteBarang)
router.post('/editbarang', barangController.editBarang)
router.get('/caribarang/:namaBarang', barangController.cariBarang)
router.get('/getlistnamasupplier', barangController.getListNamaSupplier)
router.get('/filterbarangbysupplier/:idSupplier', barangController.filterBarangBySupplier)
router.post('/filterbarangbystock', barangController.filterBarangByStock)
router.post('/filterbarangbyprice', barangController.filterBarangByPrice)
router.get('/getlistkategoribarang', barangController.getListKategoriBarang)
router.get('/filterbarangbywilayah/:idKota', barangController.filterBarangByWilayah)

module.exports = router