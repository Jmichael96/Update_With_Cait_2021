import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import PrivateRoute from './PrivateRoutes';
import Login from '../Auth/Login/Login';
import Navbar from '../Layout/Navbar/Navbar';
import Footer from '../Layout/Footer/footer';
// pages
import HomePage from '../../pages/HomePage/HomePage';
import CreatePostPage from '../../pages/CreatePostPage/CreatePostPage';
import PostContentPage from '../../pages/PostContentPage/PostContentPage';
import LifestylePage from '../../pages/LifestylePage/LifestylePage';

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
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login1996" component={Login} />
                <Route exact path="/post_content/:id" component={PostContentPage} />
                <Route exact path="/lifestyle" component={LifestylePage} />
                <PrivateRoute exact path="/create_post" component={CreatePostPage} />
            </Switch>
            <Footer />
        </main>
    );
};

export default Routes;