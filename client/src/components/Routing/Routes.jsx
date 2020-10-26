import React from 'react';
import { Route, Switch } from 'react-router-dom';

// styles
import './routes.css';

// components
import PrivateRoute from './PrivateRoutes';
import Login from '../Auth/Login/Login';
import Navbar from '../Layout/Navbar/Navbar';
import ScrollTop from '../Layout/ScrollTop/ScrollTop';

// pages
import HomePage from '../../pages/HomePage/HomePage';
import CreatePostPage from '../../pages/CreatePostPage/CreatePostPage';
import PostContentPage from '../../pages/PostContentPage/PostContentPage';
import LifestylePage from '../../pages/LifestylePage/LifestylePage';
import DevotionalPage from '../../pages/DevotionalPage/DevotionalPage';
import GraphicsPage from '../../pages/GraphicsPage/GraphicsPage';
import WellnessPage from '../../pages/WellnessPage/WellnessPage';
import SavedPage from '../../pages/SavedPage/SavedPage';
import SavedPostContentPage from '../../pages/SavedPostContentPage/SavedPostContentPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import UnSubscribePage from '../../pages/UnSubscribePage/UnSubscribePage';

// assets
import Modal from '../Layout/Modal/Modal';
import Alert from '../Layout/Alert/Alert';

const Routes = () => {
    return (
        <main id="routesStyles_root">
            <Alert />
            <Modal />
            <Navbar />
            <ScrollTop />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/login1996" component={Login} />
                <Route exact path="/post_content/:id" component={PostContentPage} />
                <Route exact path="/lifestyle" component={LifestylePage} />
                <Route exact path="/devotional" component={DevotionalPage} />
                <Route exact path="/graphics" component={GraphicsPage} />
                <Route exact path="/wellness" component={WellnessPage} />
                <Route exact path="/unsub" component={UnSubscribePage} />
                <PrivateRoute exact path="/create_post" component={CreatePostPage} />
                <PrivateRoute exact path="/saved" component={SavedPage} />
                <PrivateRoute exact path="/saved_post/:id" component={SavedPostContentPage} />
            </Switch>
            {/* <Footer /> */}
        </main>
    );
};

export default Routes;