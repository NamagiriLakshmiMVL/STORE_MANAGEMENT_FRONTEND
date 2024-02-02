import React, { useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../API';
import Item from './Item';
import {  useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"


function Home() {
const navigate = useNavigate()
const [itemData,setItemData]=useState([])

const cartItems = useSelector((state)=>state.itemShop.cartItems)

useEffect(()=>{
    axios.get(`${API}/items/get-items`)
    .then((res)=>setItemData(res.data))
},[])

useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}, [cartItems])
    return (
        <div>
            <div>
                <h1>STORE MANAGEMENT</h1>
            </div>
            <div>
                <button onClick={()=>navigate("/cart")}>Cart-{cartItems.length}</button>
            </div>
            <div className='home'>
            {itemData.map((item)=><Item key={item._id} item={item}/>)}
            </div>
        </div>
    )
}
export default Home
