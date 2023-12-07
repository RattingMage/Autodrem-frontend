import React, {useState} from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {signup} from "../actions/auth";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

const Signup = ({isAuthenticated, signup}) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_repeat: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData)
    };

    if (isAuthenticated){
        return (<Navigate to="/"/>);
    }

    return (
        <Grid container component="main" className={classes.root} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password_repeat"
                            label="Повторите пароль"
                            type="password"
                            id="password_repeat"
                            value={formData.password_repeat}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {signup })(Signup);