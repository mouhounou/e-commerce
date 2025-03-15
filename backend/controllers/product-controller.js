import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { json } from 'stream/consumers';
import productModel from '../models/productModel.js';


// add product 
const addProduct = async (req, res) => {
  try{
    const {name, price, description, category, subCategory, size, bestSeller} = req.body;

    // Accéder aux fichiers correctement
    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async(item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url
      })
    )
    console.log('====================================');
    console.log(name, price, description, category, subCategory, size, bestSeller);
    console.log(imagesUrl);
    console.log('====================================');

    const productData = {
      name,
      description,
      category,
      price : Number(price),
      subCategory,
      bestSeller : bestSeller === "true" ? true : false,
      size : JSON.parse(size),
      image : imagesUrl,
      date : Date.now()
    }

    console.log('====================================');
    console.log(productData);
    console.log('====================================');

    const product = new productModel(productData)
    await product.save();

    res.json({
      success: true,
      message: 'Product added successfully',
      product : product
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
        success: false,
        message: err.message
    });
  }
}


// get all products
const listProducts = async (req, res) => {
  try{
    const products = await productModel.find({})
    res.status(200).json({
      success: true,
      message: 'Products listed successfully',
      products: products
    })
  } catch(err){
    console.log(err);
    return res.status(500).json({
        success: false,
        message : "Erreur lors de la recuperation des produit",
        error: err.message
    });
  }
}



// remove single product
const removeProduct = async (req, res) => {
  try{
      await productModel.findByIdAndDelete(req.body.id)
      res.status(200).json({
          success: true,
          message: 'Product removed successfully'
      })
  } catch(err){
      console.log(err);
      return res.status(500).json({
          success: false,
          message : "Erreur lors de la suppression du produit",
          error: err.message
      });
  }
}


// remove single product
const singleProduct = async (req, res) => {
  try{
    const {productId} = req.body;
    console.log('====================================');
    console.log(productId);
    console.log('====================================');
    const product = await productModel.findById(productId);
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        product
    })
  } catch(err){
    console.log(err);
    return res.status(500).json({
        success: false,
        message : "Erreur lors de la récupération du produit",
        error: err.message
    });
  }
}


export { 
  addProduct, 
  listProducts, 
  removeProduct, 
  singleProduct 
}















// try {
//   console.log("Headers:", req.headers["content-type"]);
//   console.log("Files received:", req.files);
//   console.log("Body received:", req.body);

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ message: "Aucune image reçue" });
//   }

//   const { name, price, description, category, subCategory, size, bestSeller } = req.body;

//   // Récupération des fichiers images
//   const images = ["image1", "image2", "image3", "image4"]
//     .map((key) => (req.files[key] ? req.files[key][0] : null))
//     .filter((file) => file !== null);

//   // Upload des images sur Cloudinary
//   const imageUrls = await Promise.all(
//     images.map(async (file) => {
//       const result = await cloudinary.v2.uploader.upload(file.path, {
//         resource_type: "image",
//       });

//       // Supprime le fichier local après l'upload
//       fs.unlinkSync(file.path);
//       return result.secure_url;
//     })
//   );

//   console.log("Images URL:", imageUrls);

//   return res.status(200).json({
//     success: true,
//     message: "Produit ajouté avec succès",
//     images: imageUrls,
//   });
// } catch (err) {
//   console.log(err);
//   return res.status(500).json({
//       success: false,
//       message: 'Server Error'
//   });
// }