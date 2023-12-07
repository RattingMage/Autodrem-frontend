import React, {useEffect, useState} from 'react';
import {Grid, Card, CardContent, CardMedia, Typography, Button, Pagination} from '@mui/material';
import axios from "axios";
import {connect} from "react-redux";
import {add_items} from "../actions/service";
import {Navigate} from "react-router-dom";


const Catalog = ({isAuthenticated, order_id, username, password, add_items}) => {

    const [spares, setSpares] = useState(null);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(null);
    const [error, setError] = React.useState(null);

    async function load(page=1)  {
        let res;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            res = await axios.get(`http://127.0.0.1:8000/api/service/spares/`, config);
            setCount(res.data.count)
            setSpares(res.data)
        } catch (err) {
            return(setError(error));
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
        load(value)
    };

    const handleAddCart = (event, value, spare) => {
        add_items({username: username, password: password, item_price: spare.price, order_id: order_id, spare_id: spare.id});
    }

    useEffect(() => {
        load().then(r => {        })
    }, [])

    if (error) return <h1>`Error ${error.message}`</h1>;
    if (!spares) return <h1>Нет запчастей</h1>
    return (
        <div>
            <Typography variant="h4" m={2} gutterBottom>
                Каталог запчастей
            </Typography>
            <Grid container spacing={4}>
                {spares.results.map((spare) => (
                    <Grid item key={spare.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={spare.image ? spare.image : "/logo512.png"}
                                alt={spare.name}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {spare.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {spare.description}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ${spare.price}
                                </Typography>
                                { isAuthenticated ?
                                <Button variant="contained" color="primary" onClick={(event) => handleAddCart(event, page, spare)}>
                                    Add to Cart
                                </Button>
                                    : <div></div>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(count / 5)}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
            />
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order_id: state.service.order_id,
    username: state.auth.username,
    password: state.auth.password,
});

export default connect(mapStateToProps, { add_items })(Catalog);