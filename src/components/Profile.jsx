import React, {useEffect, useState} from 'react';
import {TextField, Button, Container, Grid, Typography} from '@mui/material';
import {connect} from "react-redux";
import {load, logout} from '../actions/auth';
import {Navigate} from "react-router-dom";
import axios from "axios";
import DataDisplay from "./UI/DataDisplay";

const Profile = ({isAuthenticated, username, password, first_name, last_name, email, cars, load, logout}) => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        cars: [],
    });

    useEffect(() => {
        load({username, password});
        setUserData({
            username,
            password,
            first_name,
            last_name,
            email,
            cars,
        })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = btoa(`${username}:${password}`);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`,
            }
        };

        const body = userData;

        try {
            const res = await axios.patch(`http://127.0.0.1:8000/api/auth/profile/`, body, config);
        } catch (err) {
            console.log(`${err}`)
        }
    };

    const addCar = async (data) => {
        const token = btoa(`${username}:${password}`);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`,
            }
        };
        console.log(data);
        const body = data;

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/auth/cars/`, body, config);
        } catch (err) {
            console.log(`${err}`)
        }
    }

    if (!isAuthenticated){
        return (<Navigate to="/"/>);
    }

    return (
        <Container component="main" maxWidth="md">
            <div>
                <Typography component="h1" variant="h5" m={5}>
                    Профиль пользователя
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} mb={5}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Имя пользователя"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Имя"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Фамилия"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" >
                        Сохранить
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mt={2}>
                            <Button fullWidth variant="contained" color="primary">
                                Изменить пароль
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" onClick={logout}>
                                Выйти
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Typography variant="h5" m={2} gutterBottom>
                Ваши автомобили
            </Typography>
            <DataDisplay data={userData.cars} onAdd={addCar} />
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    password: state.auth.password,
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email,
    cars: state.auth.cars,
});

export default connect(mapStateToProps, { load, logout})(Profile);