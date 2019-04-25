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


import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    layoutRoot: {},
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
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
        tab: 0
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
            tab !== 0 ? `&user_type=${tab === 1 ? 'super_admin' : (tab === 2 ? 'admin' : 'helper')}` : '',
        ];

        const url = `?page_size=${pageSize}&page=${(page +1) + urlParams.join('')}`;


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

    handleChangeTab = (event, value) => {
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
                openRemove
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
                            <h4><Icon>account_box</Icon>Users </h4>

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
                        <div className="toolbar-users-page">
                            <div className='filters-block'>
                                <Typography variant="h6" id="tableTitle">
                                    Filters
                                </Typography>

                                <div className={classes.root}>
                                    <Paper square>
                                        <Tabs
                                            value={this.state.tab}
                                            onChange={this.handleChangeTab}
                                            indicatorColor="primary"
                                            className='filters-tab'
                                            textColor="primary"
                                            variant="fullWidth"
                                        >
                                            <Tab key='all' label="All"/>
                                            <Tab label="Admin"/>
                                            <Tab label="Staff"/>
                                            <Tab label="Assistance"/>
                                        </Tabs>
                                    </Paper>
                                </div>
                            </div>
                        </div>
                    }
                    content={
                        <div className="p-24">
                            <UsersList
                                data={users}
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
                        <Button onClick={() => this.setState({openRemove: false, removeUserId: ''})} color="primary">
                            Disagree
                        </Button>

                        <Button onClick={this.handleRemoveUser} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Users);