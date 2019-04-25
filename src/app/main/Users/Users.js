import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import UsersList from './UsersList';
import jwtService from 'app/services/jwtService';

import UserWindow from './UserWindow';


const styles = theme => ({
    layoutRoot: {}
});

class Users extends Component {
    state = {
        users: [],
        selectedUser: {},
        open: false,
        search: '',

        count: 0,
        page: 1
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
        const {page} = this.state;

        let params = search ? `?page=${page}&search=${search}` : '';

        const res = await jwtService.getUsers(params);
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

    handleSearch = ({target: {value}}) => {
        this.setState({
            search: value
        });
        this.getUsers(value);
    };

    handleRemoveUser = async (id) => {
        await jwtService.removeUser(id);
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
                page
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

                        </div>
                    }
                    content={
                        <div className="p-24">
                            <UsersList
                                onAddUser={this.handleClickOpen}
                                data={users}
                                onEdit={this.handleEditUser}
                                onRemove={this.handleRemoveUser}
                                onChangePagination={this.handleChangePagination}
                                page={page}
                                count={count}
                            />
                        </div>
                    }
                />

                <UserWindow
                    open={open}
                    onClose={this.handleClose}
                    user={selectedUser}
                />
            </Fragment>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Users);