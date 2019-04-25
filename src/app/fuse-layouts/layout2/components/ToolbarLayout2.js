import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles} from '@material-ui/core';
import {FuseSearch, FuseShortcuts} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import CompanyMenu from 'app/fuse-layouts/shared-components/CompanyMenu';
import logo from '../../../../img/Caniny_Logo.png';
import Icon from '@material-ui/core/Icon';

import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'


const styles = theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
});

class ToolbarLayout2 extends Component {

    componentDidMount() {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();
    };

    handleSetActive = (e) => {
        // document.querySelector('.login-link').classList.remove("active");
    };

    handleSetInactive = (e) => {
        // document.querySelector('.login-link').classList.add("active");
    };

    handleClearAboutLink = () => {
        document.querySelector('.about-link').classList.remove("active");
        document.querySelector('.login-link').classList.remove("active");
    };

    handleRedirect = () => {
        this.props.history.push('/#about')

        setTimeout(() => {
            scroller.scrollTo('about', {
                duration: 100,
                offset: -120,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
        })

    };
    handleRedirectToHome = () => {
        this.props.history.push('/');
        document.querySelector('.login-link').classList.add("active");
    };

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');

    };

    render() {
        const {classes, settings, toolbarTheme, login} = this.props;
        const layoutConfig = settings.layout.config;

        const logging = () => {
            const token = sessionStorage.getItem('token');

            if (token) return true;
        };

        return (
            <MuiThemeProvider theme={toolbarTheme}>
                <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                    {logging() ?
                        <Toolbar className="container p-0 lg:px-24">
                            <div className="flex flex-1 ">
                                <CompanyMenu/>

                                <div className="left-navigation">
                                    <NavLink to='/users'><Icon>person</Icon></NavLink>
                                    <NavLink to='/animals'><Icon
                                        style={{fontSize: '25px', marginTop: '1px'}}>pets</Icon></NavLink>
                                </div>
                            </div>

                            <div className="flex">
                                <UserMenu/>
                            </div>

                        </Toolbar>
                        :
                        <Toolbar className="container p-0 lg:px-24">
                            <div className="flex flex-1">
                                <Link activeClass="active"
                                      to="home"
                                      spy={true}
                                      smooth={true}
                                      hashSpy={true}
                                      offset={-120}
                                      duration={100}
                                      delay={0}
                                      isDynamic={true}
                                      onSetActive={this.handleSetActive}
                                      onSetInactive={this.handleSetInactive}
                                      ignoreCancelEvents={false}
                                      className='header-logo'
                                      onClick={this.handleRedirectToHome}
                                >
                                    <img src={logo} alt=""/>
                                </Link>
                            </div>

                            <div className="flex header-navigation">
                                {/*<NavLink to='/#about'>About</NavLink>*/}
                                <Link activeClass="active"
                                      to="about"
                                      spy={true}
                                      smooth={true}
                                      hashSpy={true}
                                      offset={-120}
                                      duration={100}
                                      delay={0}
                                      isDynamic={true}
                                      onSetActive={this.handleSetActive}
                                      onSetInactive={this.handleSetInactive}
                                      ignoreCancelEvents={false}
                                      className='about-link'
                                      onClick={this.handleRedirect}
                                >
                                    About
                                </Link>

                                <NavLink to='/registration' onClick={this.handleClearAboutLink}>Sign Up</NavLink>

                                <Link activeClass="active"
                                      to="home"
                                      spy={true}
                                      smooth={true}
                                      hashSpy={true}
                                      offset={-120}
                                      duration={100}
                                      delay={0}
                                      isDynamic={true}
                                      onSetActive={this.handleSetActive}
                                      onSetInactive={this.handleSetInactive}
                                      ignoreCancelEvents={false}
                                      className='login-link'
                                      onClick={this.handleRedirectToHome}
                                >
                                    Login
                                </Link>
                            </div>
                        </Toolbar>
                    }
                </AppBar>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps({fuse, auth}) {
    return {
        settings: fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme,
        login: auth.login.success
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ToolbarLayout2)));
