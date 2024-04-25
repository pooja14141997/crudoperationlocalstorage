import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State to hold the data
  const [items, setItems] = useState([]);
  // State to manage form input
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  // State to track editing mode
  const [editIndex, setEditIndex] = useState(null);

  // Function to fetch data from local storage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  // Function to save data to local storage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Function to handle form input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add or edit an item
  const handleSubmit = e => {
    e.preventDefault();
    if (editIndex !== null) {
      // Editing mode
      const updatedItems = [...items];
      updatedItems[editIndex] = formData;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Adding mode
      setItems([...items, formData]);
    }
    setFormData({ name: '', description: '' });
  };

  // Function to delete an item
  const deleteItem = index => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Function to enable edit mode
  const editItem = index => {
    setFormData(items[index]);
    setEditIndex(index);
  };

  return (
    <div className='container'>
      <h1 className='header'>CRUD Operations with Local Storage</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit" className='btn1-position' >{editIndex !== null ? 'Edit' : 'Add'} Item</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index} className='listdata'>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <button onClick={() => editItem(index)} className='btn2-position'>Edit</button>
            <button onClick={() => deleteItem(index)} className='btn3-position'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
