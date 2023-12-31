import React, {useState} from 'react';
import {connect} from 'react-redux';
import { login } from '../actions/auth';
import {Navigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import { useTheme } from '@mui/material/styles';

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

const Login = ({ isAuthenticated, login }) => {
    const theme = useTheme();
    const classes = useStyles();


    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
        } catch (error) {
            setError("Неверный логин или пароль");
        }
    };

    if (isAuthenticated){
        return (<Navigate to="/"/>);
    }

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            justifyContent="center"
            alignItems="center"
            sx={{
                bgcolor: theme.palette.background.paper,
                minHeight: '100vh'
            }}
        >
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Авторизоваться
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

Login.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);