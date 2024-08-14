import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from "@mui/material";
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.backgroundColor = "#808080",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const apiUrl = 'http://localhost:5000/product';

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // const updateProduct = async (Id) => {
  //   try {
  //     await axios.put(`${apiUrl}/${Id}`, editingProduct);
  //     setEditingProduct({ title: 'vivo y83', description: 'thickness of screen', price: '200$' });
  //     fetchProduct();
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  // const updateProduct = async (item, type) => {
  //   try {
  //     await updateProduct(editingProduct.id, editingProduct);
  //     setEditingProduct(null);
  //     fetchProduct();
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  // Delete Process
  const handleOpen = async (item, type) => {
    if (type === "Delete") {
      setIsDeleteModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "Delete") {
      setIsDeleteModal(false);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="table-icon" style={{ display: "flex", gap: "1vw", paddingLeft:"2vw" }}>
        <div>
          <Link
            style={{ color: "black" }}
            onClick={() => handleOpen(rowData, "Edit")}
          >
            <EditIcon />
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "black" }}
            onClick={() => handleOpen(rowData, "Delete")}
          >
            <DeleteIcon />
          </Link>
        </div>
      </div>

    );
  };


  const deleteProduct = async (Id) => {
    try {
      await axios.delete(`${apiUrl}/${Id}`);
      fetchProduct();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // search input field
  const [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }

  const [addProduct, setAddProduct] = React.useState(false);

  if (addProduct) {
    return <Navigate to="/addproduct" />;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "0vw 0vw 2vw 0vw" }}>
        <div className="display_heading">
          <Typography variant="h5" style={{ margin: "0vw 0vw 2vw 0vw" }} component="h2"> Product </Typography>
        </div>

        <div className="add_product" >
          <Button variant="contained" startIcon={<AddIcon />} style={{ backgroundColor: "#808080", margin: "0vw 1vw 1vw 1vw", borderRadius: "4px", margin: "0 0 1vw 0", alignSelf: "end" }} onClick={() => { setAddProduct(true) }}>Add Product</Button>

        </div>
      </div>

      <TableContainer component={Paper} style={{ width: "100%" }}>
        <div className="display_search_field" style={{ outline: "none" }}>
          <TextField
            variant="outlined"
            placeholder="Search Product"
            value={value}
            size='small'
            onChange={handleChange}
            style={{ margin: "1vw 1vw 1vw 1vw", focus:"text-decoration:none" }}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Table sx={{ minWidth: 800, borderRadius: "50" }} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item) => (
              <StyledTableRow key={item.id}>
                {/* <StyledTableCell component="th" scope="row" align="center">{row.name} </StyledTableCell> */}
                <StyledTableCell align="center">{item.title}</StyledTableCell>
                <StyledTableCell align="center">{item.image}</StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center">{item.description}</StyledTableCell>
                <StyledTableCell align="center">{actionBodyTemplate(item)}

                {/* <div> */}
                    <Dialog
                      open={isDeleteModal}
                      onClose={(e) => handleClose("Delete")}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      className="main-dialog-area"
                    >
                      <span style={{ padding: "2vw 2vw 2vw 2vw", border: "1px solid grey" }}>Are you sure want to delete the Product ?</span>
                      <div className="dialog-footer" style={{ alignSelf: "center", margin: "1vw 1vw 1vw 1vw", display: "flex", gap: "1vw" }}>
                        <button
                          // style={{border:"1px solid grey", background:"black", color:"white",margin:"5px 1px 1px 1px"}}
                          style={{ borderRadius: "60px", color: "white", border: "1px solid grey", background: "grey" }}
                          className="btn-dialog-cancel"
                          onClick={() => handleClose("Delete")}
                        >
                          CANCEL
                        </button>

                        <button
                          // style={{border:"1px solid grey", background:"black", color:"white", borderRadius:"5px", margin:"0px 1px 1px 1px", fontWeight:500}}
                          style={{ fontSize: "16px", color: "white", background: "grey", textAlign: "center", borderRadius: "60px", border: "1px solid grey" }}
                          // className="btn-dialog-delete"
                          onClick={() => deleteProduct(item.id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </Dialog>
                  {/* </div> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}




