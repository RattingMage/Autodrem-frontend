import React from 'react';
import {connect, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import { login } from '../actions/auth';

const Dashboard = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    return (
        <div>
            {
                isAuthenticated ? <h1 style={{ color: "blue" }}>Your are auth</h1> : <Navigate to="/login"/>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Dashboard);