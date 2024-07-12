// src/helpers/dummyInvoices.js

let invoices = [
    { _id: '1', invoiceId: 'INV001', name: 'John Doe', email: 'john@example.com', country: 'USA', date: '2023-01-01', amount: 500, status: 'Paid' },
    { _id: '2', invoiceId: 'INV002', name: 'Jane Smith', email: 'jane@example.com', country: 'Canada', date: '2023-02-01', amount: 300, status: 'Unpaid' },
    // Add more dummy invoices as needed
  ];
  
  export const getInvoicesApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(invoices), 500);
    });
  };
  
  export const addNewInvoiceApi = (invoice) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        invoices.push({ ...invoice, _id: String(invoices.length + 1) });
        resolve(invoice);
      }, 500);
    });
  };
  
  export const updateInvoiceApi = (updatedInvoice) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = invoices.findIndex(invoice => invoice._id === updatedInvoice._id);
        if (index !== -1) {
          invoices[index] = updatedInvoice;
          resolve(updatedInvoice);
        } else {
          reject(new Error('Invoice not found'));
        }
      }, 500);
    });
  };
  
  export const deleteInvoiceApi = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = invoices.findIndex(invoice => invoice._id === id);
        if (index !== -1) {
          invoices = invoices.filter(invoice => invoice._id !== id);
          resolve({ success: true });
        } else {
          reject(new Error('Invoice not found'));
        }
      }, 500);
    });
  };
  