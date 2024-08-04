import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../Redux/Store/store';


const ShoppingCart = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const [categories, setCategories] = useState([]);
  const [categorizedItems, setCategorizedItems] = useState()

  useEffect(() => {
    setCategorizedItems(categories?.map(category => {
      const filteredItems = items.filter(item => item.category === category);
      return {
        category,
        items: filteredItems,
        count: filteredItems.length
      };
    }));
  }, [categories, items])

  const MySelectCategory = () => {
    return (
      <select className='btn btn-outline-info dropdown-toggle m-4' value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories?.map((category, index) => (
          <option key={index} value={category}>
            {convertName(category)}
          </option>
        ))}
      </select>
    );
  };

  const handleAddItem = () => {
    if (productName && category) {
      dispatch(addItem({ name: productName, category }));
      setProductName('');
      setCategory('');
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/getAllKeys", {
      method: "get",
      headers: { "Content-Type": "application/json" },

    })
      .then(res => res.json())
      .then((data) => {
        setCategories(data)

      })
      .catch(err => console.log(err))
  }, [])

  const deleteField = (id) => {
    fetch("http://localhost:3001/deleteField", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("error in delete");
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // תצוגת הודעת הצלחה
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  const convertName = (name) => {
    return name?.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/ (\w)/, (match) => ` ${match[1].toLowerCase()}`)
  }

  const saveCart = () => {
    fetch("http://localhost:3001/saveCart", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('שגיאה בשמירה של סל הקניות');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // תצוגת הודעת הצלחה
      })
      .catch(error => {
        console.error('שגיאה:', error);
      });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <h1 className={classes.h1}>Shopping Cart</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        className='input-group mb-3 w-25 m-auto border border-info'
        onChange={(e) => setProductName(e.target.value)}
      />
      <MySelectCategory {...categories} />
      <button type="button" className="btn btn-outline-info m-4" onClick={handleAddItem}>Add Item</button>
      <button onClick={saveCart} className="btn btn-outline-info m-4">Complete Order</button>
      <h2 className='text-primary m-4'>{totalItems} Products in Cart</h2>
      <div className='d-flex flex-wrap'>
        {categorizedItems?.map(({ category, items, count }) => (
          <div key={category} className='card m-1' style={{ width: '18vw' }}>
            <div className='card-body'>
              <span className='card-title'>
                {convertName(category)}: <span className="text-primary">{count}</span>
              </span>
              <ul className='list-group list-group-flush'>
                {items?.map(item => (
                  <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
                    {item.name}
                     <span className='mx-1'> {item.quantity} </span>
                    {/* <button type="button" className="btn btn-outline-info btn-sm" onClick={() => deleteField(item.myCustomId)}>Delete</button> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

const classes = {
  h1: "text-primary m-4"
}

export default ShoppingCart;
