import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { API } from '../API';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Cart() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [subTotal, setSubTotal] = useState(0)
    const cartItems = useSelector((state) => state.itemShop.cartItems)



    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + item.price * 1
        })
        setSubTotal(temp)
    }, [cartItems])
    const handleSelect = (e) => {
        setValue(e.target.value)
    }

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const reqObject = {
            customerName: e.target.customerName.value,
            customerPhoneNumber: Number(e.target.phoneNumber.value),
            totalAmount: Number(subTotal + ((subTotal / 100) * 2)),
            tax: Number(((subTotal / 100) * 2).toFixed(2)),
            subTotal,
            paymentMode: value,
            cartItems,
            // userId: JSON.parse(localStorage.getItem("user_data"))._id
        }
  console.log(reqObject)

        axios.post(`${API}/bills/charge-bill`, reqObject)
            .then(() => {
                alert("Bill added successfully")
                navigate("/bill")
            })
            .catch((err) => console.log(err))


    }

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {cartItems.map((item) => {
                return (
                    <div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td><img style={{ width: "50px", height: "50px" }} src={item.image} alt={item.name} /></td>
                                        <td>{item.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>

                        </div>
                    </div>
                )
            })}
            <div>
                <h3>SubTotal:{subTotal}</h3>
                <Button onClick={handleOpen}>Click to Bill</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={style}>
                        <form onSubmit={(e) => handleSubmit(e)}>

                            <h2>Bill</h2>
                            <label>Customer name:</label>
                            <input type="text" name="customerName" />
                            <br />
                            <label>Customer Phone Number:</label>
                            <input type="number" name="phoneNumber" />
                            <br />
                            <label>Payment Mode:</label>
                            <select onChange={handleSelect}>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                            </select>
                            <h3>Sub Total: {subTotal}</h3>
                            <h3>Tax:  {((subTotal / 100) * 2).toFixed(2)}</h3>
                            <h3>Total Amount: {subTotal + ((subTotal / 100) * 2)}</h3>
                            <Button type="submit" variant="contained">Generate Bill</Button>
                        </form>
                    </Box>

                </Modal>
            </div>
        </div>
    )
}
export default Cart
