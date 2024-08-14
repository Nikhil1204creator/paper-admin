import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, ImageList } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import axios from 'axios';

const AddProduct = () => {
    // const submissionOfProduct = () => {
    //     alert("Product Submit Successfully!!")
    // };

    const [Product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
    const [editingProduct, setEditingProduct] = useState({title:'vivo y83', description:'thickness of screen', price:'200$'});
    const apiUrl = 'http://localhost:5000/product';

    const [backProduct, setBackProduct] = React.useState(false);
    const [file, setFile] = useState();

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

    const addProduct = async () => {
        try {
            await axios.post(apiUrl, newProduct);
            setNewProduct({ title: '', description: '', price: '' });
            fetchProduct();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const updateProduct = async () => {
        try {
          await axios.put(`${apiUrl}/${bdb3}`, editingProduct);
          setEditingProduct({title:'vivo y83', description:'thickness of screen', price:'200$'});
          fetchProduct();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };

    const deleteProduct = async (id) => {
        try {
          await axios.delete(`${apiUrl}/${"75a3"}`);
          fetchProduct();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

    // Navigation
    if (backProduct) {
        return <Navigate to="/product" />;
    }

    //Display image as a file
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (

        <div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0vw 0vw 1vw 0vw" }}>
                <div className="display_heading">
                    <Typography variant="h5" component="h2"> Add Product </Typography>
                </div>
                <div>
                    <Button style={{ backgroundColor: "#808080", color: "white", textAlign: "center", width: "15vw", margin: "0 0 1vw 0" }} onClick={() => { setBackProduct(true) }}>Back to product</Button>
                </div>
            </div>
            <FormControl component={Paper} sx={{ minWidth: 800, padding: "1vw 1vw 1vw 1vw", backgroundColor: "white" }}>
                <div>
                    <div style={{ display:"flex", justifyContent:"space-between", gap:"3vw"}}>
                        <div>
                            <div>
                                <FormLabel sx={{ margin: "1vw 0 1vw 0", fontWeight: 700 }}>Product Title</FormLabel>
                            </div>

                            <div>
                                <TextField label="Product Title" id="outlined-size-small" size="small" value={newProduct.title} style={{ width: "370px" }} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <FormLabel sx={{ fontWeight: 700 }}>Product Image</FormLabel>
                            </div>

                            <div>
                                <ImageList sx={{marginTop:"0"}}>
                                    <input type="file" style={{ fontSize: "15px", border: "1px solid #B2BEB5", padding: "0.7vw 0 0.7vw 1vw", marginTop:"0vw", width: "370px", borderRadius: "4px" }} onChange={handleChange} />
                                    <img src={file} />
                                </ImageList>
                            </div>
                        </div>
                    </div>

                    <div style={{ display:"flex", justifyContent:"space-between", gap:"3vw"}}>
                        <div>
                            <div>
                                <FormLabel sx={{ margin: "0 0 0 0", fontWeight: 600 }}>Product Price</FormLabel>
                            </div>

                            <div>
                                <TextField label="Product Price" id="outlined-size-small" size="small" value={newProduct.price} style={{ width: "370px" }} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <FormLabel sx={{ fontWeight: 700 }}>Product Description</FormLabel>
                            </div>

                            <div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="product description"
                                    multiline
                                    rows={4}
                                    style={{ width: "370px", marginRight:"1vw" }}
                                    value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <Button style={{ backgroundColor: "#808080", color: "white", textAlign: "center", width: "5vw", margin: "1vw 0 1vw 0"}} onClick={addProduct}>Submit</Button>

                    <Button style={{ backgroundColor: "#808080", color: "white", textAlign: "center", width: "5vw", margin: "1vw 0 1vw 1vw"}} onClick={deleteProduct}>Delete</Button>

                    <Button style={{ backgroundColor: "#808080", color: "white", textAlign: "center", width: "5vw", margin: "1vw 0 1vw 1vw"}} onClick={updateProduct}>Update</Button>

                </div>
            </FormControl>
        </div>
    );
}

export default AddProduct;