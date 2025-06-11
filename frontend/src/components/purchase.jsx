import React, { useState, useEffect } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown, FaBoxOpen } from 'react-icons/fa';
import { ContainerBox, Header, AddButton, ModalContainer } from '../styles/purchase';
import { insertPurchase, getPurchases, deletePurchase, updatePurchase } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiShoppingCart } from "react-icons/ti";

const Purchase = () => {
  const [showModal, setShowModal] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchPurchases = async () => {
    try {
      const fetchedPurchases = await getPurchases();
      setPurchases(fetchedPurchases);
    } catch (err) {
      toast.error("Failed to load Purchases!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setEditingIndex(null);
    resetForm();
  };

  const handleCloseModal = () => setShowModal(false);

  const resetForm = () => {
    setInvoiceNo('');
    setSupplierName('');
    setPurchaseDate('');
    setTotalAmount('');
  };

  const handleAddOrEditPurchase = async () => {
    if (!supplierName || !invoiceNo || !purchaseDate || !totalAmount) {
      toast.error("All Fields are Required!", { position: "top-right" });
      return;
    }
  
    const formData = new FormData();
    formData.append('invoice_no', invoiceNo);
    formData.append('supplier_name', supplierName);
    formData.append('purchase_date', purchaseDate);
    formData.append('total_amount', totalAmount);
  
    try {
      if (editingIndex !== null) {
       
        await updatePurchase(purchases[editingIndex]._id, formData);
        toast.success("Purchase Updated Successfully", { position: "top-right" });
      } else {
        await insertPurchase(formData);
        toast.success("Purchase Added Successfully", { position: "top-right" });
      }
      resetForm();
      handleCloseModal();
      fetchPurchases(); 
    } catch (error) {
      toast.error("Failed to save purchase. Please try again.", { position: "top-right" });
    }
  };

  const handleDeletePurchase = async (index) => {
    const purchaseToDelete = purchases[index];
    try {
      await deletePurchase(purchaseToDelete._id);
      toast.success("Purchase deleted successfully.", { position: "top-right" });
      fetchPurchases(); 
    } catch (error) {
      toast.error("Failed to delete purchase.", { position: "top-right" });
    }
  };

  const handleEditPurchase = (index) => {
    const purchaseToEdit = purchases[index];
    setInvoiceNo(purchaseToEdit.invoice_no);
    setSupplierName(purchaseToEdit.supplier_name);
    setPurchaseDate(purchaseToEdit.purchase_date);
    setTotalAmount(purchaseToEdit.total_amount);
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <ContainerBox>
      <Header>
        <TiShoppingCart  size={60} style={{ color: '#4cb5a3', marginRight: '10px' }} />
        Manage Purchase
      </Header>

      {showModal && (
        <ModalContainer>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingIndex !== null ? 'Edit Purchase' : 'Add New Purchase'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formInvoiceNo" className="mt-3">
                  <Form.Label>Invoice No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Invoice Number"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierName" className="mt-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Supplier Name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPurchaseDate" className="mt-3">
                  <Form.Label>Purchase Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter purchase date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formTotalAmount" className="mt-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter supplier address"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <AddButton onClick={handleCloseModal}>Cancel</AddButton>
              <AddButton onClick={handleAddOrEditPurchase}>
                {editingIndex !== null ? 'Save Changes' : 'Add Supplier'}
              </AddButton>
            </Modal.Footer>
          </Modal>
        </ModalContainer>
      )}

      <Table striped bordered hover className="mt-4" style={{ width: '100%', tableLayout: 'auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <thead style={{ backgroundColor: '#4cb5a3', color: '#fff' }}>
          <tr>
            <th>S.No</th>
            <th>Invoice No</th>
            <th>Supplier Name</th>
            <th>Purchase Date</th>
            <th>Total Amount (Rs.)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase._id}>
              <td>{index + 1}</td>
              <td>{purchase.invoice_no}</td>
              <td>{purchase.supplier_name}</td>
              <td>{purchase.purchase_date}</td>
              <td>{purchase.total_amount}</td>
              <td>
                <FaEdit style={{ color: '#4cb5a3', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditPurchase(index)} />
                <FaTrash style={{ color: '#e63946', cursor: 'pointer' }} onClick={() => handleDeletePurchase(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      <AddButton onClick={handleShowModal}>Add Purchase</AddButton>
    </ContainerBox>
  );
};

export default Purchase;