import React, {Component} from 'react';
import {Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

const userTypes = {
    helper: 'Assistant',
    admin: 'Staff',
    super_admin: 'Admin',
    django_admin: 'Django admin'
};

class UserMenu extends Component {

    state = {
        userMenu: null
    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    render() {
        const {user, logout} = this.props;
        const {userMenu} = this.state;

        return (
            <React.Fragment>
                <Button className="h-64" onClick={this.userMenuClick}>
                    <Avatar className="" src={user.avatar ? user.avatar : 'assets/images/avatars/avatar.svg'}/>

                    <div className="hidden md:flex flex-col ml-12 items-start">
                        <Typography component="span" className="normal-case font-600 flex display-user-name">
                            {user.firstName || 'User'}
                        </Typography>
                        <Typography className="text-11 capitalize display-role" color="textSecondary">
                            {userTypes[user.userType]}
                        </Typography>
                    </div>

                    <Icon className="text-16 ml-12 hidden sm:flex" variant="action"
                          style={{color: '#fff'}}>keyboard_arrow_down</Icon>
                </Button>

                <Popover
                    open={Boolean(userMenu)}
                    anchorEl={userMenu}
                    onClose={this.userMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    classes={{
                        paper: "py-8"
                    }}
                >
                    <React.Fragment>
                        <MenuItem component={Link} to="/profile" onClick={this.userMenuClose}>
                            <ListItemIcon>
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile"/>
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                logout();
                                this.userMenuClose();
                            }}
                        >
                            <ListItemIcon>
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>
                    </React.Fragment>
                </Popover>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: authActions.logoutUser
    }, dispatch);
}

function mapStateToProps({auth}) {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
