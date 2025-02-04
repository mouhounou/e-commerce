/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {products} from '../assets/frontend_assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext ()

const ShopContextProvider = (props) =>{
    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState("")
    const [showSearch,  setShowSearch] = useState(false)
    const [cardItems, setCardItems] = useState({});
    const navigate = useNavigate()

    const addToCard = async (itemId, size) =>{
        
        let cardDate = structuredClone(cardItems);

        if(!size){
            // toast.error('Please select a size')
            alert('Please select a size')
            return
        }

        if(cardDate[itemId]){
            if(cardDate[itemId][size]){
                cardDate[itemId][size]+=1
            } else{
                cardDate[itemId][size] = 1 
            }
        } else{
            cardDate[itemId] = {}
            cardDate[itemId][size] = 1
        }

        setCardItems(cardDate)
    }
    
    const getCartCount = () => {
        let totalCount = 0
        for(const items in cardItems){
            for(const item in cardItems[items]){
                try{
                    if(cardItems[items][item] > 0){
                        totalCount += cardItems[items][item]
                    }
                } catch(e){
                    console.log('====================================');
                    console.log(e);
                    console.log('====================================');
                }
            }
        }
        return totalCount
    }

    const updateQuantity =  async(itemId, size, quantity) =>{
        let cardData = structuredClone(cardItems);

        cardData[itemId] [size] = quantity
        setCardItems(cardData)
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (let items in cardItems) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cardItems[items]) {
                try {
                    if (cardItems[items][item] > 0) {
                        totalAmount += iteminfo.price * cardItems[items][item];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cardItems,
        addToCard,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider