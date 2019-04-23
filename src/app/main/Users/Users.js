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
        search: ''
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.getUsers();
    };

    getUsers = async (search) => {
        let params = search ? `?search=${search}`:'';

        const res = await jwtService.getUsers(params);
        this.setState({
            users: res.results
        })
    };

    handleEditUser = user => {
        console.log(user);

        this.setState({
            selectedUser: user,
            open: true,
        })
    };

    handleSearch = ({target: {value}}) => {

        this.setState({
            search: value
        });

        this.getUsers(value);

        // let prevValue = value;
    };

    handleRemoveUser = async (id) => {
        await jwtService.removeUser(id);
        this.getUsers();
    };

    componentDidMount() {
        this.getUsers();
    };

    render() {
        const {
                open,
                users,
                selectedUser,
                search
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