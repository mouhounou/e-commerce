/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = "http://localhost:3004";
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [token, setToken] = useState('')
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data && response.data.success) {
                setProducts(response.data.products);
            } else {
                console.log("No products found or invalid response structure");
            }
        } catch (error) {
            console.error("Error fetching products:", error.message);
            console.log("Failed to fetch products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }

        const updatedCart = { ...cartItems };

        if (updatedCart[itemId]) {
            if (updatedCart[itemId][size]) {
                updatedCart[itemId][size] += 1;
            } else {
                updatedCart[itemId][size] = 1;
            }
        } else {
            updatedCart[itemId] = { [size]: 1 };
        }

        setCartItems(updatedCart);

        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } } 
                );

                if (response.data.success) {
                    alert("Item added to cart successfully!");
                } else {
                    toast.error("Failed to add item to cart. Please try again.");
                    setCartItems(cartItems); 
                }
            } catch (error) {
                console.error("Error adding item to cart:", error.message);
                toast.error("An error occurred. Please try again.");
                setCartItems(cartItems);
            }
        } else {
            toast.error("You must be logged in to add items to the cart.");
        }
    };




    
    const removeFromCart = (itemId, size) => {
        const updatedCart = { ...cartItems };

        if (updatedCart[itemId] && updatedCart[itemId][size]) {
            delete updatedCart[itemId][size];

            if (Object.keys(updatedCart[itemId]).length === 0) {
                delete updatedCart[itemId];
            }

            setCartItems(updatedCart);
            alert("Item removed from cart!");
        }
    };

    // Update the quantity of an item in the cart
    const updateQuantity = async (itemId, size, quantity) => {

        if (quantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        const updatedCart = { ...cartItems };

        if (updatedCart[itemId]) {
            updatedCart[itemId][size] = quantity;
            setCartItems(updatedCart);
        }

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update', { itemId, size, quantity },
                    { headers: { Authorization: `Bearer ${token}` } } 
                )
            } catch (error) {
                console.log(error.message)
            }
        }
    };

    // Calculate the total number of items in the cart
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    };

    // Calculate the total amount of the cart
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const product = products.find((p) => p._id === itemId);
            if (product) {
                return total + Object.entries(sizes).reduce((sum, [size, qty]) => {
                    return sum + product.price * qty;
                }, 0);
            }
            return total;
        }, 0);
    };

    const getCartData = async () => {
        if (!token) return;
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { 
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du panier :", error.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    
    // useEffect(() => {
    //     console.log('Le panier a été mis à jour :', cartItems);
    // }, [cartItems]); 


    useEffect(() => {
        if (token) {
            getCartData();
        }
    }, [token]); 



    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        navigate,
        backendUrl,
        loading,
        setCartItems,
        token,
        setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;