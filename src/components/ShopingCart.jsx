import React, {useEffect, useState} from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {connect} from "react-redux";
import {create_order, load_order} from "../actions/service";
import {Navigate} from "react-router-dom";

const ShoppingCart = ({isAuthenticated, order_id, items, final_price, status, user, repair_request, user_id, username, password, load_order, create_order}) => {
    const [order, setOrder] = useState({
        order_id: null,
        items: [],
        final_price: null,
        status: "",
        user: null,
        repair_request: null,
    });

    useEffect(() => {
        setOrder({
            order_id,
            items,
            final_price,
            status,
            user,
            repair_request,
        })
        if(order_id !== null){
            load_order({username: username, password: password, order_id: order_id});
        }
        else{
            create_order({username: username, password: password, final_price: 0, user_id: user_id});
            load_order({username: username, password: password, order_id: order_id});
        }
    }, []);

    const calculateTotal = () => {
        return order.items.reduce((total, item) => total + Number(item.item_price), 0);
    };

    if (!isAuthenticated){
        return (<Navigate to="/"/>);
    }

    return (
        <div>
            <Typography variant="h4" m={2} gutterBottom>
                Корзина
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Spare</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.item_price}</TableCell>
                                <TableCell>{item.service}</TableCell>
                                <TableCell>{item.spare}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ marginTop: '20px' }}>
                <strong>Total: ${calculateTotal()}</strong>
            </div>

            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Checkout
            </Button>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order_id: state.service.order_id,
    items: state.service.items,
    final_price: state.service.final_price,
    status: state.service.status,
    user: state.service.user,
    repair_request: state.service.repair_request,
    user_id: state.auth.id,
    username: state.auth.username,
    password: state.auth.password,
});

export default connect(mapStateToProps, { load_order, create_order })(ShoppingCart);
