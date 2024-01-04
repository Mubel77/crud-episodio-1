// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require ("multer");
const path = require ("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/products"))
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}_img_${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});


const upload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/store', upload.array('imagenes'), productsController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id',  upload.array('imagenes'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


/*** PRODUCTS LIST***/ 
// router.get('/products', productsController.products);

module.exports = router;
