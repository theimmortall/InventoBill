import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFileText, BsDownload, BsPlus } from "react-icons/bs";
import axios from "axios";
import jsPDF from "jspdf";
import logo from "../assets/logo2.png";
import { getProducts } from '../api/api';

const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(44, 62, 80, 0.08);
  padding: 2rem;
`;

const Title = styled.h2`
  color: #4cb5a3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background: #fff;
  table-layout: auto;
`;

const Th = styled.th`
  background: #f4f8fa;
  color: #4cb5a3;
  font-weight: 600;
  padding: 12px 8px;
  border-bottom: 2px solid #e0e0e0;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px 8px;
  border-bottom: 1px solid #f0f0f0;
  color: #222;
`;

const Button = styled.button`
  background: #4cb5a3;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  margin: 0 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
  &:hover {
    background: #388e7c;
  }
`;

const Loading = styled.div`
  color: #4cb5a3;
  text-align: center;
  margin: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-end;
  background: #f4f8fa;
  padding: 1rem;
  border-radius: 10px;
`;

// Update the shared item input height from 35px to 39px (about 10% increase)
const ITEM_INPUT_HEIGHT = '39px';

// Update Input styled component to set height
const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #b2dfdb;
  border-radius: 6px;
  font-size: 1rem;
  height: ${ITEM_INPUT_HEIGHT};
`;

// Update SmallBtn styled component to set height and align with input
const SmallBtn = styled.button`
  background: #4cb5a3;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.85rem;
  min-width: 0;
  height: ${ITEM_INPUT_HEIGHT};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s;
  &:hover {
    background: #388e7c;
  }
`;

const COMPANY = {
  name: "Your Business Name",
  address: "Your address",
  phone: "Your phone number",
  email: "Your email"
};

const TAX_RATE = 0.13; // 13%

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    invoice_no: "",
    date: "",
    customerName: "",
    status: "Paid",
  });
  const [creating, setCreating] = useState(false);
  const [items, setItems] = useState([{ prod_id: '', name: '', quantity: 1, price: 0 }]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/invoiceheader")
      .then((res) => {
        setInvoices(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products || []);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let y = 22;
    const margin = 20;
    const teal = [76, 181, 163]; // #4cb5a3
    const dark = [34, 34, 34]; // #222
    const white = [255,255,255];

    // --- LOGO (top right corner, fixed width) ---
    const logoWidth = 40;
    const logoHeight = 24;
    const logoX = pageWidth - margin - logoWidth;
    const logoY = y;
    doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // --- HEADER ---
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text("INVOICE", margin, y + 18);

    // --- COMPANY INFO ---
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...dark);
    let infoY = y + 30;
    doc.text(COMPANY.name, margin, infoY);
    infoY += 7;
    doc.text(COMPANY.address, margin, infoY);
    infoY += 7;
    doc.text(COMPANY.phone, margin, infoY);
    infoY += 7;
    doc.text(COMPANY.email, margin, infoY);

    // --- BILL TO & INVOICE INFO ---
    infoY += 14;
    doc.setFont(undefined, 'bold');
    doc.text("Bill to:", margin, infoY);
    doc.setFont(undefined, 'normal');
    let billY = infoY;
    infoY += 7;
    doc.text(invoice.customerName || "Customer name", margin, infoY);
    infoY += 6;
    doc.text(invoice.customerMobile || "Customer mobile", margin, infoY);
    infoY += 6;
    doc.text(invoice.customerEmail || "Customer email", margin, infoY);
    infoY += 6;
    doc.text(invoice.customerAddress || "Customer address", margin, infoY);

    // Invoice info (right side)
    let invoiceInfoX = margin + 80;
    let invoiceInfoY = billY;
    doc.setFont(undefined, 'bold');
    doc.text("Invoice number:", invoiceInfoX, invoiceInfoY);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.invoice_no ? String(invoice.invoice_no) : "#########", invoiceInfoX + 38, invoiceInfoY);
    invoiceInfoY += 7;
    doc.setFont(undefined, 'bold');
    doc.text("Invoice date:", invoiceInfoX, invoiceInfoY);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.date ? new Date(invoice.date).toLocaleDateString() : "MM/DD/YYYY", invoiceInfoX + 38, invoiceInfoY);
    invoiceInfoY += 7;
    doc.setFont(undefined, 'bold');
    doc.text("Payment due:", invoiceInfoX, invoiceInfoY);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "MM/DD/YYYY", invoiceInfoX + 38, invoiceInfoY);

    // --- TABLE HEADER ---
    infoY += 18;
    doc.setFillColor(...teal);
    doc.rect(margin, infoY, pageWidth - margin*2, 10, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...white);
    doc.text("Item", margin + 2, infoY + 7);
    doc.text("Quantity", margin + 50, infoY + 7);
    doc.text("Price per unit", margin + 90, infoY + 7);
    doc.text("Amount", margin + 140, infoY + 7);

    // --- TABLE ROWS ---
    let tableY = infoY + 13;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    let subtotal = 0;
    if (invoice.items && invoice.items.length > 0) {
      invoice.items.forEach((item, idx) => {
        doc.setDrawColor(200,200,200);
        doc.line(margin, tableY + 2, pageWidth - margin, tableY + 2);
        doc.text(item.name || `Item ${idx+1}`, margin + 2, tableY + 7);
        doc.text(item.quantity ? String(item.quantity) : "#", margin + 50, tableY + 7);
        doc.text(item.price ? `$${Number(item.price).toFixed(2)}` : "$0.00", margin + 90, tableY + 7);
        const amount = item.quantity && item.price ? (item.quantity * item.price) : 0;
        subtotal += amount;
        doc.text(`$${amount.toFixed(2)}`, margin + 140, tableY + 7);
        tableY += 12;
      });
    } else {
      for (let i = 0; i < 3; i++) {
        doc.setDrawColor(200,200,200);
        doc.line(margin, tableY + 2, pageWidth - margin, tableY + 2);
        doc.text(`Item ${i+1}`, margin + 2, tableY + 7);
        doc.text("#", margin + 50, tableY + 7);
        doc.text("$0.00", margin + 90, tableY + 7);
        doc.text("$0.00", margin + 140, tableY + 7);
        tableY += 12;
      }
    }
    // Table bottom border
    doc.setDrawColor(34,34,34);
    doc.line(margin, tableY + 2, pageWidth - margin, tableY + 2);

    // --- SUMMARY ---
    tableY += 16;
    doc.setFontSize(12);
    doc.setTextColor(...dark);
    let summaryX = margin + 90;
    let summaryY = tableY;
    doc.text("Subtotal", summaryX, summaryY);
    doc.text(`$${subtotal.toFixed(2)}`, summaryX + 40, summaryY, { align: 'right' });
    summaryY += 8;
    const taxRate = invoice.taxRate !== undefined ? invoice.taxRate : 0.0;
    const tax = subtotal * taxRate;
    doc.text(`Tax ${ (taxRate*100).toFixed(2) }%`, summaryX, summaryY);
    doc.text(`$${tax.toFixed(2)}`, summaryX + 40, summaryY, { align: 'right' });
    summaryY += 8;
    const fees = invoice.fees !== undefined ? invoice.fees : 0.0;
    doc.text("Fees", summaryX, summaryY);
    doc.text(`$${fees.toFixed(2)}`, summaryX + 40, summaryY, { align: 'right' });
    summaryY += 8;
    const discounts = invoice.discounts !== undefined ? invoice.discounts : 0.0;
    doc.text("Discounts", summaryX, summaryY);
    doc.text(`$${discounts.toFixed(2)}`, summaryX + 40, summaryY, { align: 'right' });
    summaryY += 10;
    // --- TOTAL ROW ---
    doc.setFillColor(...teal);
    doc.rect(summaryX, summaryY, 60, 12, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...white);
    doc.text("TOTAL", summaryX + 2, summaryY + 8);
    const total = subtotal + tax + fees - discounts;
    doc.text(`$${total.toFixed(2)}`, summaryX + 40, summaryY + 8, { align: 'right' });

    // --- Save ---
    doc.save(`Invoice_${invoice.invoice_no || invoice._id || invoice.id}.pdf`);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (idx, e) => {
    const newItems = [...items];
    if (e.target.name === 'prod_id') {
      const selectedProduct = products.find(p => p.prod_id === e.target.value);
      if (selectedProduct) {
        newItems[idx].prod_id = selectedProduct.prod_id;
        newItems[idx].name = selectedProduct.prod_name;
        newItems[idx].price = selectedProduct.sell_price;
      } else {
        newItems[idx].prod_id = '';
        newItems[idx].name = '';
        newItems[idx].price = 0;
      }
    } else {
      newItems[idx][e.target.name] = e.target.value;
    }
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { prod_id: '', name: '', quantity: 1, price: 0 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const calculateTotal = () =>
    items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseFloat(item.quantity || 0)), 0);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const invoiceData = {
        ...form,
        items,
        total: calculateTotal(),
      };
      await axios.post("http://localhost:3000/api/invoiceheader", invoiceData);
      setForm({ invoice_no: "", date: "", customerName: "", status: "Paid" });
      setItems([{ prod_id: '', name: '', quantity: 1, price: 0 }]);
      const res = await axios.get("http://localhost:3000/api/invoiceheader");
      setInvoices(res.data.data || []);
    } catch (err) {
      const msg =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message;
      alert("Error creating invoice: " + msg);
      console.error("Invoice creation error:", err);
    }
    setCreating(false);
  };

  return (
    <Container>
      <Title>
        <BsFileText /> Invoices
      </Title>
      <Form onSubmit={handleCreateInvoice}>
        <Input
          name="invoice_no"
          placeholder="Invoice #"
          value={form.invoice_no}
          onChange={handleFormChange}
          required
        />
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleFormChange}
          required
        />
        <Input
          name="customerName"
          placeholder="Customer"
          value={form.customerName}
          onChange={handleFormChange}
          required
        />
        <Input
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleFormChange}
          required
        />
        <div style={{ width: "100%" }}>
          <b>Items:</b>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
              <select
                name="prod_id"
                value={item.prod_id}
                onChange={(e) => handleItemChange(idx, e)}
                style={{ padding: '8px 12px', border: '1px solid #b2dfdb', borderRadius: '6px', fontSize: '1rem', height: ITEM_INPUT_HEIGHT }}
              >
                <option value="">Select a product</option>
                {products.map(p => (
                  <option key={p.prod_id} value={p.prod_id}>{p.prod_name}</option>
                ))}
              </select>
              <Input
                style={{ flex: 1 }}
                type="number"
                name="quantity"
                min={1}
                max={(() => {
                  const selectedProduct = products.find(p => p.prod_id === item.prod_id);
                  return selectedProduct ? selectedProduct.quantity : undefined;
                })()}
                value={item.quantity}
                onChange={e => handleItemChange(idx, e)}
                required
              />
              <Input
                style={{ flex: 1 }}
                type="text"
                name="price"
                inputMode="decimal"
                pattern="[0-9]*"
                value={item.price}
                onChange={e => handleItemChange(idx, e)}
                required
                readOnly
              />
              {items.length > 1 && (
                <SmallBtn type="button" onClick={() => removeItem(idx)} style={{ background: "#e57373" }}>
                  Remove
                </SmallBtn>
              )}
            </div>
          ))}
          <SmallBtn type="button" onClick={addItem}>Add Item</SmallBtn>
        </div>
        <Input
          name="total"
          placeholder="Total (₹)"
          value={calculateTotal().toFixed(2)}
          readOnly
          style={{ background: "#e0f2f1", fontWeight: "bold" }}
        />
        <SmallBtn type="submit" disabled={creating}>
          <BsPlus /> {creating ? "Creating..." : "Create Invoice"}
        </SmallBtn>
      </Form>
      {loading ? (
        <Loading>Loading invoices...</Loading>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Invoice #</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Total (₹)</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <Td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>
                  No invoices found.
                </Td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv._id || inv.id}>
                  <Td>{inv.invoice_no || inv._id || inv.id}</Td>
                  <Td>{inv.date ? new Date(inv.date).toLocaleDateString() : "-"}</Td>
                  <Td>{inv.customerName || inv.customer || "-"}</Td>
                  <Td>{inv.total ? inv.total.toFixed(2) : "0.00"}</Td>
                  <Td>{inv.status || "Paid"}</Td>
                  <Td>
                    <Button onClick={() => generatePDF(inv)}>
                      <BsDownload /> Generate Invoice
                    </Button>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Invoice;