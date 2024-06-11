import React, { useState, useContext } from 'react';
import './Header.css';
import context from './Context';

const Items = {
  id: 0,
  Name: "",
  Desc: '',
  Price: '',
  Large: '',
  Medium: '',
  Small: ''
}

function Header() {
  const ctx = useContext(context);
  const [itemsinputdata, setItemsInputData] = useState(Items);
  const [id, setId] = useState(1);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItemsInputData(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log("coming from Header changeHandler", name, value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setId(id => id + 1);
    ctx.addItemToList(itemsinputdata);
    console.log("coming from Header submitHandler", itemsinputdata);
    setItemsInputData({
      id: id,
      Name: "",
      Desc: '',
      Price: '',
      Large: '',
      Medium: '',
      Small: ''
    });
  }

  return (
    <>
      <p style={{ fontStyle: 'italic', fontSize: '35px', color: 'rgb(196, 28, 6)' }}>Shopping App </p>
      <form onSubmit={submitHandler} className='container'>
        <div>
          <label className='container-label' htmlFor='Name'>Item Name</label>
          <input type='text' id='Name' onChange={changeHandler} name='Name' value={itemsinputdata.Name}></input>
        </div>
        <div>
          <label className='container-label' htmlFor='Description'>Description</label>
          <input type='text' id='Desc' onChange={changeHandler} name='Desc' value={itemsinputdata.Desc}></input>
        </div>
        <div>
          <label className='container-label' htmlFor='Price'>Price</label>
          <input type='number' id='Price' onChange={changeHandler} name='Price' value={itemsinputdata.Price}></input>
        </div>
        <div>
          <div className='container-label'>Quantity</div>
          <div className='container-Quan'>
            <div>
              <label className='Quan-container-label' htmlFor='Large'>Large</label>
              <input type='number' id='Large' onChange={changeHandler} name='Large' value={itemsinputdata.Large}></input>
            </div>
            <div>
              <label className='Quan-container-label' htmlFor='Medium'>Medium</label>
              <input type='number' id='Medium' onChange={changeHandler} name='Medium' value={itemsinputdata.Medium}></input>
            </div>
            <div>
              <label className='Quan-container-label' htmlFor='Small'>Small</label>
              <input type='number' id='Small' onChange={changeHandler} name='Small' value={itemsinputdata.Small}></input>
            </div>
          </div>
        </div>
        <button type='submit' id='add-Item'>Add Items</button>
      </form>
    </>
  )
}

export default Header;
