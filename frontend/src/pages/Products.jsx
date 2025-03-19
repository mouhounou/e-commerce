import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelativeProduct from '../components/RelativeProduct';

function Products() {
  const { productId } = useParams();
  const { currency, addToCart, backendUrl } = useContext(ShopContext);
  const [image, setImage] = useState('');
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
        console.log(response.data);
        
        if (response.data?.success && response.data.products) {
          setProductData(response.data.products);
          if (response.data.products.image?.length > 0) {
            setImage(response.data.products.image[0]);
          }
        } else {
          console.log("No products found or invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      }
    };

    getProduct();
  }, [productId, backendUrl]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt="Product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full">
            {image && <img src={image} className="w-full h-auto" alt="Selected product" />}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="star dull" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="text-gray-500 mt-5 md:w-4/5">{productData.description}</p>
          
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size :</p>
            <div className="flex gap-2">
              {productData.size?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>

      <RelativeProduct category={productData.category} subcategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Products;