import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { json } from 'stream/consumers';
import productModel from '../models/productModel.js';




const addProduct = async (req, res) => {
	try {
		const {
			name,
			price,
			description,
			category,
			subCategory,
			size,
			bestSeller,
		} = req.body;

		// Vérification des fichiers dans req.files
		const image1 = req.files.image1 ? req.files.image1[0] : null;
		const image2 = req.files.image2 ? req.files.image2[0] : null;
		const image3 = req.files.image3 ? req.files.image3[0] : null;
		const image4 = req.files.image4 ? req.files.image4[0] : null;

		// Filtrer les images nulles
		const images = [image1, image2, image3, image4].filter(
			(item) => item !== null
		);

		// Si aucune image n'a été téléchargée, renvoyer une erreur
		if (images.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Aucune image téléchargée.",
			});
		}

		// Uploader les images vers Cloudinary
		let imagesUrl = await Promise.all(
			images.map(async (item) => {
				if (item && item.path) {
					let result = await cloudinary.uploader.upload(item.path, {
						resource_type: "image",
					});
					return result.secure_url;
				} else {
					throw new Error("Fichier invalide");
				}
			})
		);

		console.log(
			name,
			price,
			description,
			category,
			subCategory,
			size,
			bestSeller
		);
		console.log(imagesUrl);

		const productData = {
			name,
			description,
			category,
			price: Number(price),
			subCategory,
			bestSeller: bestSeller === "true" ? true : false,
			size: JSON.parse(size),
			image: imagesUrl,
			date: Date.now(),
		};

		console.log(productData);

		// Enregistrer le produit dans la base de données
		const product = new productModel(productData);
		await product.save();

		res.json({
			success: true,
			message: "Product added successfully",
			product: product,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};


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
		const products = await productModel.findById(productId);
		
		if (!products) {
			return res.status(404).json({
					success: false,
					message: 'Product not found'
			})
		}
		res.status(200).json({
			success: true,
			message: 'Product retrieved successfully',
			products
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