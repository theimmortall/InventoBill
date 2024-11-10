import React, { useState, useEffect } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ContainerBox, Header, AddButton, ModalContainer } from '../styles/customer';
import { insertCustomer, getCustomers, deleteCustomer, updateCustomer } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosPeople } from "react-icons/io";

const Customer = () => {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    } catch (err) {
      toast.error("Failed to load Customers!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setEditingIndex(null);
    resetForm();
  };

  const handleCloseModal = () => setShowModal(false);

  const resetForm = () => {
    setCustomerName('');
    setCustomerMobile('');
    setCustomerEmail('');
    setCustomerAddress('');
  };

  const handleAddOrEditCustomer = async () => {
    if (!customerName || !customerMobile || !customerEmail || !customerAddress) {
      toast.error("All Fields are Required!", { position: "top-right" });
      return;
    }
  
    const formData = new FormData();
    formData.append('name', customerName);
    formData.append('mobile', customerMobile);
    formData.append('email', customerEmail);
    formData.append('address', customerAddress);
  
    try {
      if (editingIndex !== null) {
       
        await updateCustomer(customers[editingIndex]._id, formData);
        toast.success("Customer Updated Successfully", { position: "top-right" });
      } else {
        await insertCustomer(formData);
        toast.success("Customer Added Successfully", { position: "top-right" });
      }
      resetForm();
      handleCloseModal();
      fetchCustomers(); // Refresh products list to reflect changes
    } catch (error) {
      toast.error("Failed to save customer. Please try again.", { position: "top-right" });
    }
  };


  const handleDeleteCustomer = async (index) => {
    const customerToDelete = customers[index];
    try {
      await deleteCustomer(customerToDelete._id);
      toast.success("Customer deleted successfully.", { position: "top-right" });
      fetchCustomers(); 
    } catch (error) {
      toast.error("Failed to delete customer.", { position: "top-right" });
    }
  };

  const handleEditCustomer = (index) => {
    const customerToEdit = customers[index];
    setCustomerName(customerToEdit.name);
    setCustomerEmail(customerToEdit.email);
    setCustomerMobile(customerToEdit.mobile);
    setCustomerAddress(customerToEdit.address);
    setEditingIndex(index);
    setShowModal(true);
  };
  return (
    <ContainerBox>
      <Header>
        <IoIosPeople size={60} style={{ color: '#4cb5a3', marginRight: '10px' }} />
        Manage Customer
      </Header>

      {showModal && (
        <ModalContainer>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingIndex !== null ? 'Edit Customer' : 'Add New Customer'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCustomerName" className="mt-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSupplierName" className="mt-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter mobile number"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCustomerEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter customer email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCustomerAddress" className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter customer address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <AddButton onClick={handleCloseModal}>Cancel</AddButton>
              <AddButton onClick={handleAddOrEditCustomer}>
                {editingIndex !== null ? 'Save Changes' : 'Add Customer'}
              </AddButton>
            </Modal.Footer>
          </Modal>
        </ModalContainer>
      )}

      <Table striped bordered hover className="mt-4" style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <thead style={{ backgroundColor: '#4cb5a3', color: '#fff' }}>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>
                <FaEdit style={{ color: '#4cb5a3', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditCustomer(index)} />
                <FaTrash style={{ color: '#e63946', cursor: 'pointer' }} onClick={() => handleDeleteCustomer(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      <AddButton onClick={handleShowModal}>Add Customer</AddButton>
    </ContainerBox>
  );
};

export default Customer;
