import React, {Fragment} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import {Container, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const pages = ['home', 'repair', 'catalog', 'dashboard'];

export const MenuBar = ({ isAuthenticated }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TimeToLeaveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Auto.Drem
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem>
                                    <Button
                                        component={Link}
                                        to={`/${page}`}
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <TimeToLeaveIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Auto.drem
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={`/${page}`}
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {
                        isAuthenticated ?
                            <Fragment>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link}
                                    to='/profile'
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link}
                                    to="/cart"
                                >
                                    <ShoppingBasketIcon />
                                </IconButton>
                            </Fragment>
                    :
                            <Fragment>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <Button component={Link} to="/signup" color="inherit">Sign up</Button>
                            </Fragment>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MenuBar);