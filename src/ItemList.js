import React, { useContext } from 'react'
import './itemList.css'
import Context from './Context'



function ItemList() {
  
  const ctx = useContext(Context)
  // console.log("comming from itmlist ctx",ctx)

  const itemCart =(items,price,size,id,itemsize)=>{
    console.log('itemCart' ,itemsize)
    if (
      (size === 'large' && itemsize > 0) ||
      (size === 'Medium' && itemsize > 0) ||
      (size === 'Small' && itemsize > 0)
    ) {
      ctx.additemToCart(items, price, size, id);
    }
  
  }
  return (
    <React.Fragment>
    <h4>Items in Stock</h4>
    <div className='container-item'>
     
       <ul >
         {ctx.items.map((items,index)=> 
         (<li className='itemList' key ={index}>
          Item = {items.Name} 
          <p>Description = {items.Desc} </p>
          Price = ₹{items.Price}

          <button onClick={()=>itemCart(items.Name,items.Price, "large",items.id,items.Large)}>Add Large={items.Large}</button>
          <button onClick={()=>itemCart(items.Name,items.Price,"Medium",items.id,items.Medium)}>Add Medium={items.Medium}</button>
          <button onClick={()=>itemCart(items.Name,items.Price, "Small",items.id,items.Small)}>Add Small={items.Small}</button>
          </li> 
      
          ))}

      
        </ul> 
    </div>
    </React.Fragment>
  )
}

export default ItemList