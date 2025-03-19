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

    // Fetch products from the backend
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
            toast.error("Failed to fetch products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Add an item to the cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            // alert("Please select a size");
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
        alert("Item added to cart!");
    };

    // Remove an item from the cart
    const removeFromCart = (itemId, size) => {
        const updatedCart = { ...cartItems };

        if (updatedCart[itemId] && updatedCart[itemId][size]) {
            delete updatedCart[itemId][size];

            // If no sizes are left for the item, remove the item entirely
            if (Object.keys(updatedCart[itemId]).length === 0) {
                delete updatedCart[itemId];
            }

            setCartItems(updatedCart);
            alert("Item removed from cart!");
        }
    };

    // Update the quantity of an item in the cart
    const updateQuantity = (itemId, size, quantity) => {
        if (quantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        const updatedCart = { ...cartItems };

        if (updatedCart[itemId]) {
            updatedCart[itemId][size] = quantity;
            setCartItems(updatedCart);
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

    // Fetch products on component mount
    useEffect(() => {
        getProduct();
    }, []);

    // Provide context values to children
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