import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";
import {Container, Typography, Button} from '@mui/material';
import Catalog from "./Catalog";
import {create_order, load_order, create_repair} from "../actions/service";
import {Link} from "react-router-dom";

const Home = ({isAuthenticated, is_staff, username, password, user_id, order_id, repair_id, create_order, load_order, create_repair}) => {

    useEffect( () => {
        if(isAuthenticated){
            if (order_id === null){
                create_order({username: username, password: password, final_price: 0, user_id: user_id});
            }
            load_order({username: username, password: password, order_id: order_id});
            if(repair_id === null && !is_staff){
                create_repair({username: username, password: password, problem: "Nothing"});
            }
        }
    }, []);

    return (
        <div>
            <Container maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Добро пожаловать в магазин автозапчастей Auto.Drem
                </Typography>

                <Typography variant="body1" paragraph>
                    В нашем магазине вы найдете широкий ассортимент автозапчастей для различных марок автомобилей.
                </Typography>

               <Catalog/>

                <Button component={Link}
                        to='/catalog'
                        variant="contained"
                        color="primary">
                    Перейти в каталог
                </Button>

                <Typography variant="body1" paragraph mt={2}>
                    Также вы можете оставить заявку на ремонт.
                </Typography>

                <Button
                    component={Link}
                    to='/repair'
                    variant="contained" color="primary">
                    Оставить заявку
                </Button>
            </Container>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_staff: state.auth.is_staff,
    username: state.auth.username,
    password: state.auth.password,
    user_id: state.auth.id,
    order_id: state.service.order_id,
    repair_id: state.service.repair_request,
});

export default connect(mapStateToProps, { login, create_order, load_order, create_repair })(Home);