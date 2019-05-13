import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import jwtService from 'app/services/jwtService';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {Avatar, Divider} from '@material-ui/core';
import {FuseAnimate} from '@fuse';

import UserWindow from './UserWindow';
import UsersList from './UsersList';


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

const userParams = {
    firstName: 'first_name',
    lastName: 'last_name',
    phoneNumber: 'phone_number',
    email: 'email',
    userType: 'user_type',
    joinDate: 'join_date'
};

const filterParams = {
    contains: 'Contains',
    startswith: 'Starts with',
    endswith: 'Ends with',
    exact: 'Matches'
};


class Users extends Component {
    state = {
        users: [],
        selectedUser: {},
        open: false,
        openRemove: false,
        removeUserId: '',
        search: '',
        filters: [],

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
        const {page, tab, pageSize, sorted, filters} = this.state;


        let urlParams = [
            search ? `&search=${search}` : '',
            tab !== 0 ? `&user_type__iexact=${tab === 'all' ? '' : tab}` : '',
            sorted ? `&ordering=${sorted.desc ? userParams[sorted.id] : `-${userParams[sorted.id]}`}` : '',
        ];

        await filters.forEach(filter => {
            console.log(filter.type)
            if (filter.type === 'date') {
                console.log(filter.filterType);
                if (filter.filterType) {
                    urlParams.push(`&${userParams[filter.column]}__${filter.filterType}=${filter.filterValue}`)
                } else {
                    urlParams.push(`&${userParams[filter.column]}=${filter.filterValue}`)
                }
            } else {
                urlParams.push(`&${userParams[filter.column]}__i${filter.filterType}=${filter.filterValue}`)
            }
        });

        const url = `?page_size=${pageSize}&page=${(page + 1) + urlParams.join('')}`;

        const res = await jwtService.getUsers(url);
        this.setState({
            users: res.results,
            count: res.count
        })
    };

    handleFilterUser = (filter) => {
        const filtersArr = filter.map(item => {

            console.log(item.value.filterValue)
            if (item.value.type === 'date') {
                return {
                    type: item.value.type,
                    column: item.id,
                    filterType: item.value.filterType,
                    filterValue: item.value.filterValue
                }
            } else {
                return {
                    type: item.value.type,
                    column: item.id,
                    filterType: item.value.filterType,
                    filterValue: window.btoa(item.value.filterValue)
                }
            }

        });

        this.setState({
            filters: filtersArr
        }, () => this.getUsers());
    };


    handleEditUser = user => {
        this.setState({
            selectedUser: user,
            open: true,
        })
    };

    handleChangeSort = (newSorted) => {
        this.setState({
            sorted: newSorted[0]
        }, () => this.getUsers());
    };

    handleChangePagination = (page) => {
        this.setState({
            page: page
        }, () => this.getUsers())
    };

    handleChangePageSize = (pageSize) => {
        this.setState({
            pageSize: pageSize,
            page: 0
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
        this.setState({
            tab: value,
            page: 0
        }, () => this.getUsers())
    };

    handleRemoveUser = async () => {
        if (typeof this.state.removeUserId === 'string') {
            await jwtService.removeUser(this.state.removeUserId);
        } else {
            await jwtService.removeUsers({ids: this.state.removeUserId});
        }

        this.setState({
            openRemove: false,
            removeUserId: '',
        });
        this.getUsers();
    };

    async componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) this.props.history.push('/');
        this.getUsers();

        const res = await jwtService.getUserProfile();
        this.setState({
            userProfile: res
        })
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
                tab,
                userProfile
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
                            <h4><FontAwesomeIcon icon={faUser}/>Users </h4>

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
                                        <Avatar className="mr-12" src='assets/images/avatars/profile.jpg'/>
                                        <Typography>John Doe</Typography>
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
                                            <ListItemText className="truncate pr-0" primary="Assistant"
                                                          disableTypography={true}/>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </FuseAnimate>
                        </div>
                    }
                    content={
                        <div className="p-24 users-list-table">
                            <UsersList
                                users={users}
                                page={page}
                                pageSize={pageSize}
                                count={count}

                                userProfile={userProfile}

                                onAddUser={this.handleClickOpen}
                                onEdit={this.handleEditUser}
                                onRemove={this.handleOpenRemoveWindow}
                                onChangePagination={this.handleChangePagination}
                                onChangePageSize={this.handleChangePageSize}
                                onSortUsers={this.handleChangeSort}
                                onFilterUser={this.handleFilterUser}
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
                    <DialogTitle id="alert-dialog-title">{"Do you want to continue the deletion?"}</DialogTitle>

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