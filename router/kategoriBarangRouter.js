const express = require('express')
const { kategoriBarangController } = require('../controller')

const router = express.Router()

router.get('/getkategoribarang', kategoriBarangController.getKategoriBarang)
router.post('/inputkategori', kategoriBarangController.inputKategori)
router.delete('/deletekategoribarang/:idKategori', kategoriBarangController.deleteKategoriBarang)
router.get('/getjumlahprodukperjenis/:idKategori', kategoriBarangController.getJumlahProdukPerJenis)
router.get('/getjumlahprodukperstok/:idKategori', kategoriBarangController.getJumlahProdukPerStok)

module.exports = router