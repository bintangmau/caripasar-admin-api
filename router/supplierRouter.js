const express = require('express')
const { supplierController } = require('../controller')

const router = express.Router()

router.post('/inputsupplier', supplierController.inputSupplier)
router.get('/getdatasupplier', supplierController.getDataSupplier)
router.post('/editsupplier', supplierController.editSupplier)
router.delete('/deletesupplier/:idSupplier', supplierController.deleteSupplier)
router.get('/carisupplierbynama/:namaSupplier', supplierController.cariSupplierByNama)
router.get('/getlistkotaforinput', supplierController.getListKotaForInput)
router.get('/getlistdatakota', supplierController.getListDataKota)
router.get('/getfiltersupplierbywilayah/:idKota', supplierController.getFilterSupplierByWilayah)

module.exports = router