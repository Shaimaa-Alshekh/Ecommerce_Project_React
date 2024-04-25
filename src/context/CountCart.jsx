import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const CartContext=createContext();

const CartContextProvider=({children})=>{
    const [countCart,setCountCart]=useState(localStorage.getItem('countCart'));

    const getUserData=()=>{
        if(countCart !=0){
            console.log(countCart);
        }
    };

    useEffect( ()=>{getUserData();},[countCart]);

    return <CartContext.Provider value={{setCountCart,countCart}}>
         {children}
    </CartContext.Provider>
    
}

export default CartContextProvider;