import React, { useState, useEffect } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown, FaBoxOpen } from 'react-icons/fa';
import { ContainerBox, Header, AddButton, ModalContainer } from '../styles/supplier';
import { insertSupplier, getSuppliers, deleteSupplier, updateSupplier } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosPeople } from "react-icons/io";


const Supplier = () => {
  const [showModal, setShowModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [supplierMobile, setSupplierMobile] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierAddress, setSupplierAddress] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const fetchedSuppliers = await getSuppliers();
      setSuppliers(fetchedSuppliers);
    } catch (err) {
      toast.error("Failed to load Suppliers!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setEditingIndex(null);
    resetForm();
  };

  const handleCloseModal = () => setShowModal(false);

  const resetForm = () => {
    setSupplierName('');
    setSupplierMobile('');
    setSupplierEmail('');
    setSupplierAddress('');
  };

  const handleAddOrEditSupplier = async () => {
    if (!supplierName || !supplierMobile || !supplierEmail || !supplierAddress) {
      toast.error("All Fields are Required!", { position: "top-right" });
      return;
    }
  
    const formData = new FormData();
    formData.append('name', supplierName);
    formData.append('mobile', supplierMobile);
    formData.append('email', supplierEmail);
    formData.append('address', supplierAddress);
  
    try {
      if (editingIndex !== null) {
        // Using `updateProduct` to update the product
        await updateSupplier(suppliers[editingIndex]._id, formData);
        toast.success("Supplier Updated Successfully", { position: "top-right" });
      } else {
        await insertSupplier(formData);
        toast.success("Supplier Added Successfully", { position: "top-right" });
      }
      resetForm();
      handleCloseModal();
      fetchSuppliers(); // Refresh products list to reflect changes
    } catch (error) {
      toast.error("Failed to save supplier. Please try again.", { position: "top-right" });
    }
  };

  const handleDeleteSupplier = async (index) => {
    const supplierToDelete = suppliers[index];
    try {
      await deleteSupplier(supplierToDelete._id);
      toast.success("Supplier deleted successfully.", { position: "top-right" });
      fetchSuppliers(); 
    } catch (error) {
      toast.error("Failed to delete supplier.", { position: "top-right" });
    }
  };

  const handleEditSupplier = (index) => {
    const supplierToEdit = suppliers[index];
    setSupplierName(supplierToEdit.name);
    setSupplierEmail(supplierToEdit.email);
    setSupplierMobile(supplierToEdit.mobile);
    setSupplierAddress(supplierToEdit.address);
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <ContainerBox>
      <Header>
        <IoIosPeople size={60} style={{ color: '#4cb5a3', marginRight: '10px' }} />
        Manage Supplier
      </Header>

      {showModal && (
        <ModalContainer>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingIndex !== null ? 'Edit Supplier' : 'Add New Supplier'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formSupplierName" className="mt-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierMobile" className="mt-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter mobile number"
                    value={supplierMobile}
                    onChange={(e) => setSupplierMobile(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter supplier email"
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierAddress" className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter supplier address"
                    value={supplierAddress}
                    onChange={(e) => setSupplierAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <AddButton onClick={handleCloseModal}>Cancel</AddButton>
              <AddButton onClick={handleAddOrEditSupplier}>
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
            <th>Supplier Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier._id}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.mobile}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>
                <FaEdit style={{ color: '#4cb5a3', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditSupplier(index)} />
                <FaTrash style={{ color: '#e63946', cursor: 'pointer' }} onClick={() => handleDeleteSupplier(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      <AddButton onClick={handleShowModal}>Add Supplier</AddButton>
    </ContainerBox>
  );
};

export default Supplier;
