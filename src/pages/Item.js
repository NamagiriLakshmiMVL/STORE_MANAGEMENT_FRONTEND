import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch} from "react-redux"
import {addToCart} from "../redux/itemSlice"

export default function Item({ item }) {

const dispatch = useDispatch()
    
    const handleSubmit=(item)=>{
        alert("Dipatched")
       dispatch(addToCart(item))
    }

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={item.image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Price: {item.price}
                    </Typography>
                  
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>handleSubmit(item)}>Add To Cart</Button>
                   
                </CardActions>
            </Card>
        </div>
    );
}


