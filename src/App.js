import React, { useState } from 'react';
import './App.css'

// Main App Component
const App = () => {
  const [products, setProducts] = useState([]);
  const [carDetails, setCarDetails] = useState({
    car: '',
    imageUrl: '',
    basePrice: 0,
  });
  const [quantity, setQuantity] = useState(0);

  const [isAdding, setIsAdding] = useState(false); // To show/hide form
  const [editingIndex, setEditingIndex] = useState(null); // To handle editing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'basePrice' ? parseInt(value) : value, // Convert basePrice to number
    }));
  };

  const addProduct = () => {
    if (editingIndex !== null) {
      // If we are editing a product
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { ...carDetails, quantity };
      setProducts(updatedProducts);
      setEditingIndex(null); // Reset editing state
    } else {
      // Add new product
      setProducts([...products, { ...carDetails, quantity }]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCarDetails({ car: '', imageUrl: '', basePrice: 0 });
    setQuantity(0);
    setIsAdding(false);
  };

  const editProduct = (index) => {
    const productToEdit = products[index];
    setCarDetails({
      car: productToEdit.car,
      imageUrl: productToEdit.imageUrl,
      basePrice: productToEdit.basePrice,
    });
    setQuantity(productToEdit.quantity);
    setIsAdding(true);
    setEditingIndex(index);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(products));
    alert('Products saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  };

  React.useEffect(() => {
    loadFromLocalStorage(); // Load products on component mount
  }, []);

  return (
    <div>
      <div className="bg-container">
        <h1 className="heading">S.K Motors <br />
          <span className="sub-heading">Authorized by Hyundai</span> <br />
          <span className="sub-heading">Cell No: 7981833858</span>
        </h1>
      </div>

      <div className="button-container">
        <button className="add-button" onClick={() => setIsAdding(true)}>Add Product</button>
        <button className="add-button" onClick={saveToLocalStorage}>Save</button>
      </div>

      {isAdding && (
        <div className="add-product-form">
          <h3>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h3>
          <label>
            Car Name: <input type="text" name="car" value={carDetails.car} onChange={handleInputChange} />
          </label><br />
          <label>
            Image URL: <input type="text" name="imageUrl" value={carDetails.imageUrl} onChange={handleInputChange} />
          </label><br />
          <label>
            Base Price: <input type="number" name="basePrice" value={carDetails.basePrice} onChange={handleInputChange} />
          </label><br />
          <label>
            Quantity: <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </label><br />
          <button className="add-button" onClick={addProduct}>{editingIndex !== null ? 'Save Changes' : 'Add Product'}</button>
          <button className="add-button" onClick={resetForm}>Cancel</button>
        </div>
      )}

      <div className="product-list">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.imageUrl} alt={product.car} />
            <h1 className="car-name-heading">{product.car}</h1>

            <div className="quantity-container">
              <p>Quantity: {product.quantity}</p>
              <p>Total Price: ₹{(product.basePrice * product.quantity).toLocaleString()}</p>
            </div>

            <div className="hover-buttons">
              <button className="modify-button" onClick={() => editProduct(index)}>Modify</button>
              <button className="delete-button" onClick={() => deleteProduct(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
