// src/api/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3000/api';  // Backend base URL, using environment variable for flexibility

// Create an axios instance to set global configurations if needed
const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any global headers you need here
  }
});

// Function for user login
export const login = async (userData) => {
  try {
    const response = await apiInstance.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error; // Optional: rethrow to handle in calling component
  }
};


// Function for user registration
export const register = async (userData) => {
  try {
    const response = await apiInstance.post('/sign-up', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to insert a product
export const insertProduct = async (productData) => {
  try {
    const response = await apiInstance.post('/product', productData);
    return response.data;
  } catch (error) {
    console.error('Insert product error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await apiInstance.get('/product');  // Fetches all products
    return response.data.products; // Adjust this based on the response structure
  } catch (error) {
    console.error('Get products error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const deleteProduct = async (productId) => {
  try {
    const response = await apiInstance.delete(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Delete product error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to insert a customer
export const insertCustomer= async (customerData) => {
  try {
    const response = await apiInstance.post('/customer', customerData);
    return response.data;
  } catch (error) {
    console.error('Insert customer error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await apiInstance.get('/customer');  // Fetches all products
    return response.data.customers; // Adjust this based on the response structure
  } catch (error) {
    console.error('Get customers error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const deleteCustomer = async (customerId) => {
  try {
    const response = await apiInstance.delete(`/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Delete customer error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to update a customer
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await apiInstance.put(`/customer/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Update customer error:', error.response ? error.response.data : error.message);
    throw error;
  }
};





// Function to update a product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiInstance.put(`/product/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Update product error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to insert a supplier
export const insertSupplier = async (supplierData) => {
  try {
    const response = await apiInstance.post('/supplier', supplierData);
    return response.data;
  } catch (error) {
    console.error('Insert supplier error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const response = await apiInstance.get('/supplier');  // Fetches all suppliers
    return response.data.suppliers; // Adjust this based on the response structure
  } catch (error) {
    console.error('Get suppliers error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const response = await apiInstance.delete(`/supplier/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error('Delete supplier error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateSupplier = async (supplierId, supplierData) => {
  try {
    const response = await apiInstance.put(`/supplier/${supplierId}`, supplierData);
    return response.data;
  } catch (error) {
    console.error('Update supplier error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const insertPurchase = async (purchaseData) => {
  try {
    const response = await apiInstance.post('/purchase', purchaseData);
    return response.data;
  } catch (error) {
    console.error('Insert purchase error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPurchases = async () => {
  try {
    const response = await apiInstance.get('/purchase');
    return response.data.purchases;
  } catch (error) {
    console.error('Get purchase error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deletePurchase = async (purchaseId) => {
  try {
    const response = await apiInstance.delete(`/purchase/${purchaseId}`);
    return response.data;
  } catch (error) {
    console.error('Delete purchase error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updatePurchase = async (purchaseId, purchaseData) => {
  try {
    const response = await apiInstance.put(`/purchase/${purchaseId}`, purchaseData);
    return response.data;
  } catch (error) {
    console.error('Update purchase error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getStock = async () => {
  try {
    const response = await apiInstance.get('/stock');
    return response.data.stock || [];
  } catch (error) {
    if (error.response && error.response.status === 404) return [];
    console.error('Get stock error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAlerts = async () => {
  try {
    const response = await apiInstance.get('/alert');
    return response.data.alerts || [];
  } catch (error) {
    if (error.response && error.response.status === 404) return [];
    console.error('Get alerts error:', error.response ? error.response.data : error.message);
    throw error;
  }
};