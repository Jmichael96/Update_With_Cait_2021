import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoutes';
import Home from '../../pages/Home/Home';
import Login from '../Auth/Login/Login';
import Navbar from '../Layout/Navbar/Navbar';
import Footer from '../Layout/Footer/footer';

// assets
import Modal from '../Layout/Modal/Modal';
import Alert from '../Layout/Alert/Alert';

const Routes = () => {
    return (
        <main>
            <Alert />
            <Modal />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login1996" component={Login} />
            </Switch>
            <Footer />
        </main>
    );
};

export default Routes;