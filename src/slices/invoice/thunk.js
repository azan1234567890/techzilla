import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
  getInvoicesApi,
  addNewInvoiceApi,
  updateInvoiceApi,
  deleteInvoiceApi
} from "../../pages/Invoices/dummyInvoices";

export const getInvoices = createAsyncThunk("invoice/getInvoices", async () => {
  try {
    const response = await getInvoicesApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewInvoice = createAsyncThunk("invoice/addNewInvoice", async (invoice) => {
  try {
    const response = await addNewInvoiceApi(invoice);
    toast.success("Invoice Added Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Invoice Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const updateInvoice = createAsyncThunk("invoice/updateInvoice", async (invoice) => {
  try {
    const response =await updateInvoiceApi(invoice);
    toast.success("Invoice Updated Successfully", { autoClose: 3000 });
    const data = await response;
    return data;
  } catch (error) {
    toast.error("Invoice Updated Failed", { autoClose: 3000 });
    return error;
  }
});

export const deleteInvoice = createAsyncThunk("invoice/deleteInvoice", async (invoice) => {
  try {
    const response =await deleteInvoiceApi(invoice);
    toast.success("Invoice Delete Successfully", { autoClose: 3000 });
    return { invoice, ...response };
  }
  catch (error) {
    toast.error("Invoice Delete Failed", { autoClose: 3000 });
    return error;
  }
});