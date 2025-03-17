import express from 'express';
import{addProduct, singleProduct, listProducts, removeProduct} from '../controllers/product-controller.js'
const productRouter = express.Router();
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';

productRouter.post('/add', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]), addProduct);
productRouter.post('/single', singleProduct);

productRouter.get('/list', listProducts);

productRouter.post('/remove', adminAuth ,removeProduct);


export default productRouter;