import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import UsersList from './UsersList';
import jwtService from 'app/services/jwtService';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserWindow from './UserWindow';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

import {Avatar, Divider} from '@material-ui/core';
import {FuseAnimate} from '@fuse';

import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {},
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
    },
    activeListItem: {
        color: '#fff',
        backgroundColor: 'rgb(236, 12, 142) !important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
    }
});

function ListItemLink(props) {
    return <ListItem button component="button" {...props} />;
}

class Users extends Component {
    state = {
        users: [],
        selectedUser: {},
        open: false,
        openRemove: false,
        removeUserId: '',
        search: '',

        count: 0,
        page: 0,
        pageSize: 10,
        tab: 'all'
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false,
            selectedUser: {}
        });
        this.getUsers();
    };

    getUsers = async (search) => {
        const {page, tab, pageSize} = this.state;


        const urlParams = [
            search ? `&search=${search}` : '',
            tab !== 0 ? `&user_type=${tab === 'all' ? '' : tab}` : '',
        ];

        const url = `?page_size=${pageSize}&page=${(page + 1) + urlParams.join('')}`;


        const res = await jwtService.getUsers(url);
        this.setState({
            users: res.results,
            count: res.count
        })
    };

    handleEditUser = user => {
        this.setState({
            selectedUser: user,
            open: true,
        })
    };

    handleChangePagination = (e, page) => {
        this.setState({
            page
        }, () => this.getUsers())
    };

    handleChangePageSize = ({target: {value}}) => {
        console.log(value);
        this.setState({
            pageSize: value
        }, () => this.getUsers())
    };

    handleSearch = ({target: {value}}) => {
        this.setState({
            search: value
        });
        this.getUsers(value);
    };

    handleOpenRemoveWindow = id => {
        this.setState({
            openRemove: true,
            removeUserId: id
        })
    };

    handleChangeTab = (value) => {
        console.log(value);
        this.setState({
            tab: value
        }, () => this.getUsers())
    };

    handleRemoveUser = async () => {
        await jwtService.removeUser(this.state.removeUserId);
        this.setState({
            openRemove: false,
            removeUserId: '',
        });
        this.getUsers();
    };

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) this.props.history.push('/');
        this.getUsers();
    };

    render() {
        const {
                open,
                users,
                selectedUser,
                search,
                count,
                page,
                pageSize,
                openRemove,
                tab
            } = this.state,

            {
                classes,
            } = this.props;


        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page">
                            <h4><FontAwesomeIcon icon={faUser} />Users </h4>

                            <div className='search-block'>
                                <Icon>search</Icon>
                                <input
                                    type="text"
                                    placeholder='Search for anything'
                                    value={search}
                                    onChange={this.handleSearch}
                                />
                            </div>
                        </div>
                    }
                    contentToolbar={
                        <div className="p-24" style={{width: '100%'}}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                                <Paper elevation={1} className="rounded-8">
                                    <div className="p-24 flex items-center">
                                        <Avatar className="mr-12" src='assets/images/avatars/avatar.svg'/>
                                        <Typography>User</Typography>
                                    </div>
                                    <Divider/>
                                    <List>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'all' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('all')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="All"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'super_admin' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('super_admin')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="Admin"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'admin' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('admin')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="Staff"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'helper' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('helper')}

                                        >
                                            <ListItemText className="truncate pr-0" primary="Assistance"
                                                          disableTypography={true}/>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </FuseAnimate>
                        </div>
                    }
                    content={
                        <div className="p-24">
                            <UsersList
                                contacts={users}
                                page={page}
                                pageSize={pageSize}
                                count={count}

                                onAddUser={this.handleClickOpen}
                                onEdit={this.handleEditUser}
                                onRemove={this.handleOpenRemoveWindow}
                                onChangePagination={this.handleChangePagination}
                                onChangePageSize={this.handleChangePageSize}
                            />
                        </div>
                    }
                />

                <UserWindow
                    open={open}
                    onClose={this.handleClose}
                    user={selectedUser}
                />

                <Dialog
                    open={openRemove}
                    onClose={() => this.setState({openRemove: false, removeUserId: ''})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete the user?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleRemoveUser} style={{color: '#33ADFF'}} autoFocus>
                            Yes
                        </Button>

                        <Button style={{color: '#b61423'}}
                                onClick={() => this.setState({openRemove: false, removeUserId: ''})} color="primary">
                            No
                        </Button>

                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Users);