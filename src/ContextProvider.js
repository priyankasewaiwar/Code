import React, {  useState } from "react";
import Context from "./Context";

function ContextProvider({ children }) {
 
  const [item, setItem] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [Qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  

  const AddItemToList = (item) => {
    setItem((prev) => [...prev, item]);
  };

  const AdditemToCart = (itm, price, size, id) => {
   
    const itemsForCart = {
      id: id,
      ItemName: itm,
      Itemprice: price,
      Itemsize: size,
      ItemQty: 1,
    };

    const existingItemIndex = cartItem.findIndex(
      (item) => item.id === id && item.Itemsize === size
    );

    if (existingItemIndex !== -1) {
     
      const updatedCartItems = [...cartItem];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        ItemQty: updatedCartItems[existingItemIndex].ItemQty + 1,
      };
      setCartItem(updatedCartItems);
      setTotal((prev) => prev + Number(price));
    } else {
      
      setCartItem((prev) => [...prev, itemsForCart]);
      setTotal((prev) => prev + Number(price));
    }

    setQty((Qty) => Qty + 1);

    if (size === "large") {
      setItem((prevItems) =>
        prevItems.map((item) => {
          console.log("coming from provider AdditemToCart", item);
          if (item.id === id && item.Large > 0) {
            return { ...item, Large: item.Large - 1 };
          }
          return item;
        })
      );
    } else if (size === "Medium") {
      setItem((prevItems) =>
        prevItems.map((item) => {
          console.log("coming from provider AdditemToCart", item);
          if (item.id === id && item.Medium > 0) {
            return { ...item, Medium: item.Medium - 1 };
          }
          return item;
        })
      );
    } else if (size === "Small") {
      setItem((prevItems) =>
        prevItems.map((item) => {
          console.log("coming from provider AdditemToCart", item);
          if (item.id === id && item.Small > 0) {
            return { ...item, Small: item.Small - 1 };
          }
          return item;
        })
      );
    }
  };

  const incrementItem = (id, size) => {
    const itemIndex = cartItem.findIndex(
      (item) => item.id === id && item.Itemsize === size
    );
    
    const ItemIdx = item.findIndex((items)=> items.id ===id)  
    const updatedItems = [...item];
    
    if (size === "large" && updatedItems[ItemIdx].Large <= 0) return;
    if (size === "Medium" && updatedItems[ItemIdx].Medium <= 0) return;
    if (size === "Small" && updatedItems[ItemIdx].Small <= 0) return;

  


      if(size==="large" && updatedItems[ItemIdx].Large>0)
    {
     
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Large : updatedItems[ItemIdx].Large-1,
      }
      setItem(updatedItems);

    }
    else if(size==="Medium"&& updatedItems[ItemIdx].Medium>0)
    {
       
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Medium : updatedItems[ItemIdx].Medium-1,
      }
      setItem(updatedItems);
    }
    else if(size==="Small"&& updatedItems[ItemIdx].Small>0)
    {
       
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Small : updatedItems[ItemIdx].Small-1,
      }
      setItem(updatedItems);
    }
    

    if (itemIndex !== -1 ) {
      const updatedCartItems = [...cartItem];
      
      updatedCartItems[itemIndex] = {
        ...updatedCartItems[itemIndex],
        ItemQty: updatedCartItems[itemIndex].ItemQty + 1,
      };
      setCartItem(updatedCartItems);
      setTotal((prev) => prev + Number(updatedCartItems[itemIndex].Itemprice));
      setQty((prev) => prev + 1);
    }
  };

  const decrementItem = (id, size) => {
    const itemIndex = cartItem.findIndex(
      (item) => item.id === id && item.Itemsize === size
    );
    
    const ItemIdx = item.findIndex((items)=> items.id ===id)  
    const updatedItems = [...item];
    const updatedCartItems = [...cartItem];


    if(size==="large" )
    {
      if (updatedCartItems[itemIndex].ItemQty <= 0) return;
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Large : updatedItems[ItemIdx].Large+1,
      }
      setItem(updatedItems);

    }
    else if(size==="Medium" )
    {
      if (updatedCartItems[itemIndex].ItemQty <= 0) return;
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Medium : updatedItems[ItemIdx].Medium+1,
      }
      setItem(updatedItems);

    }
    else if(size==="Small" )
    {
      if (updatedCartItems[itemIndex].ItemQty <= 0) return;
      updatedItems[ItemIdx] ={
        ...updatedItems[ItemIdx] ,
        Small : updatedItems[ItemIdx].Small+1,
      }
      setItem(updatedItems);

    }
    if (itemIndex !== -1 && cartItem[itemIndex].ItemQty > 0) {
      const updatedCartItems = [...cartItem];
      updatedCartItems[itemIndex] = {
        ...updatedCartItems[itemIndex],
        ItemQty: updatedCartItems[itemIndex].ItemQty - 1,
      };
      setCartItem(updatedCartItems);
      setTotal((prev) => prev - Number(updatedCartItems[itemIndex].Itemprice));
      setQty((prev) => prev - 1);
    }
  };

  const ClearCart = () => {
    setCartItem([]);
    setQty(0);
    setTotal(0);
    setItem([]);
  };

  const context = {
    items: item,
    cartItems: cartItem,
    Total: total,
    Qty: Qty,
    addItemToList: AddItemToList,
    additemToCart: AdditemToCart,
    incrementQuant: incrementItem,
    decrementQuant: decrementItem,
    clearCart: ClearCart,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default ContextProvider;
