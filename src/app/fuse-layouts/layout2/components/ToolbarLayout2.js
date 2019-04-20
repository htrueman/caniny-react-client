import React from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles} from '@material-ui/core';
import {FuseSearch, FuseShortcuts} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import logo from '../../../../img/Caniny_Logo.png';

const styles = theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
});

const ToolbarLayout2 = ({classes, settings, toolbarTheme, login}) => {

    const layoutConfig = settings.layout.config;

    return (
        <MuiThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                {login ?
                    <Toolbar className="container p-0 lg:px-24">
                        <div className="flex flex-1">
                            <NavLink to='/' className='header-logo'>
                                <img src={logo} alt=""/>
                            </NavLink>

                            <NavLink to='/users'>Users</NavLink>
                            <NavLink to='/animals'>Animals</NavLink>
                            {/*<Hidden mdDown>*/}
                            {/*<FuseShortcuts/>*/}
                            {/*</Hidden>*/}
                        </div>

                        <div className="flex">

                            <UserMenu/>


                            {/*<FuseSearch/>*/}

                            {/*<div className={classes.separator}/>*/}

                            {/*<QuickPanelToggleButton/>*/}
                        </div>

                    </Toolbar>
                    :
                    <Toolbar className="container p-0 lg:px-24">
                        <div className="flex flex-1">
                            <NavLink to='/' className='header-logo'>
                                <img src={logo} alt=""/>
                            </NavLink>
                        </div>

                        <div className="flex header-navigation">
                            {/*<NavLink to='/#about'>About</NavLink>*/}
                            <a href='#about'>About</a>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/registration'>Sign Up</NavLink>
                        </div>
                    </Toolbar>
                }
            </AppBar>
        </MuiThemeProvider>
    );
};

function mapStateToProps({fuse, auth}) {
    return {
        settings: fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme,
        login: auth.login.success
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ToolbarLayout2)));
