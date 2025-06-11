import React, { useState, useEffect } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown, FaBoxOpen, FaImage } from 'react-icons/fa';
import { ContainerBox, Header, AddButton, ModalContainer} from '../styles/product';
import { insertProduct, getProducts, deleteProduct, updateProduct } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productSupplierPrice, setProductSupplierPrice] = useState('');
  const [productSellPrice, setProductSellPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      toast.error("Failed to load Products!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setEditingIndex(null);
    resetForm();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const resetForm = () => {
    setProductName('');
    setProductSupplierPrice('');
    setProductSellPrice('');
    setProductQuantity('');
    setSupplierName('');
  };

  const handleAddOrEditProduct = async () => {
    if (!productName || !supplierName || !productSupplierPrice || !productQuantity || !productSellPrice) {
      toast.error("All Fields are Required!", { position: "top-right" });
      return;
    }
  
    const formData = new FormData();
    formData.append('prod_name', productName);
    formData.append('supplier_name', supplierName);
    formData.append('supplier_price', parseFloat(productSupplierPrice));
    formData.append('sell_price', parseFloat(productSellPrice));
    formData.append('quantity', parseInt(productQuantity));
  
    try {
      if (editingIndex !== null) {
        // Using `updateProduct` to update the product
        await updateProduct(products[editingIndex].prod_id, formData);
        toast.success("Product Updated Successfully", { position: "top-right" });
      } else {
        await insertProduct(formData);
        toast.success("Product Added Successfully", { position: "top-right" });
      }
      resetForm();
      handleCloseModal();
      fetchProducts(); // Refresh products list to reflect changes
    } catch (error) {
      toast.error("Failed to save product. Please try again.", { position: "top-right" });
    }
  };
  
  const handleDeleteProduct = async (index) => {
    const productToDelete = products[index];
    try {
      await deleteProduct(productToDelete.prod_id);
      toast.success("Product deleted successfully.", { position: "top-right" });
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product.", { position: "top-right" });
    }
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setProductName(productToEdit.prod_name);
    setProductSupplierPrice(productToEdit.supplier_price);
    setProductSellPrice(productToEdit.sell_price);
    setProductQuantity(productToEdit.quantity);
    setSupplierName(productToEdit.supplier_name);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sortedProducts = [...products].sort((a, b) => {
      const aValue = key === 'price' || key === 'quantity' ? parseFloat(a[key]) : a[key];
      const bValue = key === 'price' || key === 'quantity' ? parseFloat(b[key]) : b[key];
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
    setProducts(sortedProducts);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <ContainerBox>
      <Header>
        <FaBoxOpen size={50} style={{ color: '#4cb5a3', marginRight: '10px' }} />
        Manage Product
      </Header>

      {showModal && (
        <ModalContainer>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductName" className="mt-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierName" className="mt-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formProductSupplierPrice" className="mt-3">
                  <Form.Label>Supplier Price (Rs.)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter supplier price"
                    value={productSupplierPrice}
                    onChange={(e) => setProductSupplierPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formProductSellPrice" className="mt-3">
                  <Form.Label>Sell Price (Rs.)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter sell price"
                    value={productSellPrice}
                    onChange={(e) => setProductSellPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formProductQuantity" className="mt-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter product quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <AddButton onClick={handleCloseModal}>Cancel</AddButton>
              <AddButton onClick={handleAddOrEditProduct}>
                {editingIndex !== null ? 'Save Changes' : 'Add Product'}
              </AddButton>
            </Modal.Footer>
          </Modal>
        </ModalContainer>
      )}

      <Table striped bordered hover className="mt-4" style={{ width: '100%', tableLayout: 'auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <thead style={{ backgroundColor: '#4cb5a3', color: '#fff' }}>
          <tr>
            <th>S.No</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Supplier Name</th>
            <th onClick={() => handleSort('supplier_price')} style={{ cursor: 'pointer', padding: '12px' }}>
              Supplier Price (Rs.) {renderSortIcon('supplier_price')}
            </th>
            <th onClick={() => handleSort('sell_price')} style={{ cursor: 'pointer', padding: '12px' }}>
              Sell Price (Rs.) {renderSortIcon('sell_price')}
            </th>
            <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer', padding: '12px' }}>
              Quantity {renderSortIcon('quantity')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.prod_id}</td>
              <td>{product.prod_name}</td>
              <td>{product.supplier_name}</td>
              <td>{product.supplier_price}</td>
              <td>{product.sell_price}</td>
              <td>{product.quantity}</td>
              <td>
                <FaEdit style={{ color: '#4cb5a3', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditProduct(index)} />
                <FaTrash style={{ color: '#e63946', cursor: 'pointer' }} onClick={() => handleDeleteProduct(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      <AddButton onClick={handleShowModal}>Add Product</AddButton>
    </ContainerBox>
  );
};

export default Product;