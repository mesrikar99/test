import React, { useState, useEffect } from 'react';

const DataDisplay = () => {
  const [items, setItems] = useState([]);

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Create an item
  const createItem = async () => {
    try {
      const newItem = { name: 'New Item' };
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const createdItem = await response.json();
      setItems([...items, createdItem]);
      console.log('Created item:', createdItem);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };


  // Update an item
  const updateItem = async (itemId) => {
    try {
      const updatedItem = { name: 'Updated Item' };
      const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      const updatedItemResponse = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? updatedItemResponse : item
        )
      );
      console.log('Updated item:', updatedItemResponse);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete an item
  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        console.log('Item deleted successfully.');
      } else {
        throw new Error('Error deleting item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Item CRUD Operations</h1>
      <button onClick={createItem}>Create Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => updateItem(item.id)}>Update</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={createItem}>Create Item for users</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => updateItem(item.id)}>Update</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;