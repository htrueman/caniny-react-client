import React, {Component} from 'react';
import {
    Avatar,
    Checkbox,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Typography,
    Select, Popover
} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import {FuseUtils, FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import moment from 'moment';

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`,
            },
        },
    };
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    groupBlock: {
        display: 'flex',
        alignItems: 'center'
    },
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
        position: 'absolute',
        fontSize: 6,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    fab: {
        boxShadow: 'none',
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
        backgroundColor: theme.palette.common.black,
    },
    bootstrapPlacementLeft: {
        margin: '0 8px',
    },
    bootstrapPlacementRight: {
        margin: '0 8px',
    },
    bootstrapPlacementTop: {
        margin: '8px 0',
    },
    bootstrapPlacementBottom: {
        margin: '8px 0',
    },
    htmlPopper: arrowGenerator('#dadde9'),
    htmlTooltip: {
        backgroundColor: '#039be5',
        color: '#fff',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        '& b': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
});

class ContactsList extends Component {

    state = {
        selectedContactsMenu: null,
        selectedUsersIds: []
    };

    getFilteredArray = (entities, searchText) => {
        console.log(entities);
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };


    selectAllContacts = async () => {
        let arr = [];
        await this.props.users.forEach(item => {
            arr.push(item.id)
        });

        this.setState({
            selectedUsersIds: arr
        })
    };

    selectUser = id => {
        this.setState({
            selectedUsersIds: [
                ...this.state.selectedUsersIds,
                id
            ]
        })
    };

    deSelectUser = id => {
        let arr = this.state.selectedUsersIds.filter(item => item !== id);

        this.setState({
            selectedUsersIds: arr
        })
    };

    deSelectAllContacts = () => {
        this.setState({
            selectedUsersIds: [],
            userMenu: null
        })
    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    render() {
        const {
            users = [],
            onAddUser,
            classes,
            page,
            pageSize,
            count,
            searchText = '',
            onChangePagination,
            removeContacts,
            onRemove,
            onSortUsers,
            setContactsUnstarred,
            setContactsStarred,
            onChangePageSize,
            onFilterUser,
            onEdit,
            userProfile
        } = this.props;

        const data = this.getFilteredArray(users, searchText);
        const {
            selectedContactsMenu,
            selectedUsersIds,
            userMenu
        } = this.state;

        const columns = userProfile ? (userProfile.userType === 'super_admin' ?
            [
                {
                    Header: () => (
                        <Checkbox
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            onChange={(event) => {
                                event.target.checked ? this.selectAllContacts() : this.deSelectAllContacts();
                            }}
                            checked={selectedUsersIds.length === Object.keys(users).length && selectedUsersIds.length > 0}
                            indeterminate={selectedUsersIds.length !== Object.keys(users).length && selectedUsersIds.length > 0}
                        />
                    ),
                    accessor: "",
                    Cell: row => {
                        return (<Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
                                    event.target.checked ? this.selectUser(row.value.id) : this.deSelectUser(row.value.id);
                                }}
                                checked={selectedUsersIds.includes(row.value.id)}
                                // onChange={() => toggleInSelectedContacts(row.value.id)}
                            />
                        )
                    },
                    className: "justify-center",
                    sortable: false,
                    width: 64
                },
                {
                    Header: () => (
                        selectedUsersIds.length > 0 && (
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onRemove(selectedUsersIds);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        )
                    ),
                    accessor: "avatar",
                    Cell: row => (
                        <Avatar className="mr-8" alt={row.original.name}
                                src={row.value || 'assets/images/avatars/avatar.svg'}/>
                    ),
                    className: "justify-center",
                    width: 64,
                    sortable: false
                },
                {
                    Header: "First Name",
                    accessor: "firstName",
                    filterable: true,
                    className: "font-bold",
                },
                {
                    Header: "Last Name",
                    accessor: "lastName",
                    filterable: true,
                    className: "font-bold"
                },
                {
                    Header: "Email",
                    accessor: "email",
                    filterable: true
                },
                {
                    Header: "Phone",
                    accessor: "phoneNumber",
                    filterable: true
                },
                {
                    Header: "Join Date",
                    accessor: "joinDate",
                    filterable: true,
                    Cell: row => (
                        <span>
                                    {row.value ? moment(row.value, 'YYYY-MM-DD').format('DD-MM-YYYY') : ''}
                                </span>
                    )
                },
                {
                    Header: () => (
                        <div className={classes.groupBlock}>
                            Group
                            <Tooltip
                                classes={{
                                    popper: classes.htmlPopper,
                                    tooltip: classes.htmlTooltip,
                                }}
                                PopperProps={{
                                    popperOptions: {
                                        modifiers: {
                                            arrow: {
                                                enabled: Boolean(this.state.arrowRef),
                                                element: this.state.arrowRef,
                                            },
                                        },
                                    },
                                }}
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">
                                            <b>Admin</b>: Full
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Staff</b>:
                                            Edit
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Assistant</b>:
                                            View
                                            permissions</Typography>
                                        {/*<em>{"And here's"}</em> <b>{'some'}</b>*/}
                                        {/*<u>{'amazing content'}</u>.{' '}*/}
                                        {/*{"It's very engaging. Right?"}*/}
                                        <span
                                            className={classes.arrow}
                                            ref={this.handleArrowRef}/>
                                    </React.Fragment>
                                }
                            >
                                <Icon className='exclamation-icon'>priority_high</Icon>
                            </Tooltip>
                        </div>
                    ),
                    accessor: "userType",
                    filterable: false,
                    Cell: row => (
                        <span>
                                    {types[row.value]}
                                </span>
                    )
                },
                {
                    Header: () => (
                        <Tooltip title="Add user" className={classes.toolTip}>
                            <Fab color="secondary" aria-label="Edit" className={classes.fab}
                                 onClick={onAddUser}>
                                <PlusIcon/>
                            </Fab>
                        </Tooltip>
                    ),
                    width: 128,
                    filterable: false,
                    sortable: false,
                    Cell: row => (
                        <div className="flex items-center">
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onEdit(row.original)
                                }}
                            >
                                <Icon>edit</Icon>
                            </IconButton>

                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onRemove(row.original.id);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </div>
                    )
                }
            ]
            :
            [
                {
                    Header: () => (
                        selectedUsersIds.length > 0 && (
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onRemove(selectedUsersIds);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        )
                    ),
                    accessor: "avatar",
                    Cell: row => (
                        <Avatar className="mr-8" alt={row.original.name}
                                src={row.value || 'assets/images/avatars/avatar.svg'}/>
                    ),
                    className: "justify-center",
                    width: 64,
                    sortable: false
                },
                {
                    Header: "First Name",
                    accessor: "firstName",
                    filterable: true,
                    className: "font-bold",
                },
                {
                    Header: "Last Name",
                    accessor: "lastName",
                    filterable: true,
                    className: "font-bold"
                },
                {
                    Header: "Email",
                    accessor: "email",
                    filterable: true
                },
                {
                    Header: "Phone",
                    accessor: "phoneNumber",
                    filterable: true
                },
                {
                    Header: "Join Date",
                    accessor: "joinDate",
                    filterable: true,
                    Cell: row => (
                        <span>
                                    {row.value ? moment(row.value, 'YYYY-MM-DD').format('DD-MM-YYYY') : ''}
                                </span>
                    )
                },
                {
                    Header: () => (
                        <div className={classes.groupBlock}>
                            Group
                            <Tooltip
                                classes={{
                                    popper: classes.htmlPopper,
                                    tooltip: classes.htmlTooltip,
                                }}
                                PopperProps={{
                                    popperOptions: {
                                        modifiers: {
                                            arrow: {
                                                enabled: Boolean(this.state.arrowRef),
                                                element: this.state.arrowRef,
                                            },
                                        },
                                    },
                                }}
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">
                                            <b>Admin</b>: Full
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Staff</b>:
                                            Edit
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Assistant</b>:
                                            View
                                            permissions</Typography>
                                        {/*<em>{"And here's"}</em> <b>{'some'}</b>*/}
                                        {/*<u>{'amazing content'}</u>.{' '}*/}
                                        {/*{"It's very engaging. Right?"}*/}
                                        <span
                                            className={classes.arrow}
                                            ref={this.handleArrowRef}/>
                                    </React.Fragment>
                                }
                            >
                                <Icon className='exclamation-icon'>priority_high</Icon>
                            </Tooltip>
                        </div>
                    ),
                    accessor: "userType",
                    filterable: false,
                    Cell: row => (
                        <span>
                                    {types[row.value]}
                                </span>
                    )
                },
            ]) : [
            [
                {
                    Header: () => (
                        selectedUsersIds.length > 0 && (
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onRemove(selectedUsersIds);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        )
                    ),
                    accessor: "avatar",
                    Cell: row => (
                        <Avatar className="mr-8" alt={row.original.name}
                                src={row.value || 'assets/images/avatars/avatar.svg'}/>
                    ),
                    className: "justify-center",
                    width: 64,
                    sortable: false
                },
                {
                    Header: "First Name",
                    accessor: "firstName",
                    filterable: true,
                    className: "font-bold",
                },
                {
                    Header: "Last Name",
                    accessor: "lastName",
                    filterable: true,
                    className: "font-bold"
                },
                {
                    Header: "Email",
                    accessor: "email",
                    filterable: true
                },
                {
                    Header: "Phone",
                    accessor: "phoneNumber",
                    filterable: true
                },
                {
                    Header: "Join Date",
                    accessor: "joinDate",
                    filterable: true,
                    Cell: row => (
                        <span>
                                    {row.value ? moment(row.value, 'YYYY-MM-DD').format('DD-MM-YYYY') : ''}
                                </span>
                    )
                },
                {
                    Header: () => (
                        <div className={classes.groupBlock}>
                            Group
                            <Tooltip
                                classes={{
                                    popper: classes.htmlPopper,
                                    tooltip: classes.htmlTooltip,
                                }}
                                PopperProps={{
                                    popperOptions: {
                                        modifiers: {
                                            arrow: {
                                                enabled: Boolean(this.state.arrowRef),
                                                element: this.state.arrowRef,
                                            },
                                        },
                                    },
                                }}
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">
                                            <b>Admin</b>: Full
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Staff</b>:
                                            Edit
                                            permissions</Typography>
                                        <Typography color="inherit"><b>Assistant</b>:
                                            View
                                            permissions</Typography>
                                        {/*<em>{"And here's"}</em> <b>{'some'}</b>*/}
                                        {/*<u>{'amazing content'}</u>.{' '}*/}
                                        {/*{"It's very engaging. Right?"}*/}
                                        <span
                                            className={classes.arrow}
                                            ref={this.handleArrowRef}/>
                                    </React.Fragment>
                                }
                            >
                                <Icon className='exclamation-icon'>priority_high</Icon>
                            </Tooltip>
                        </div>
                    ),
                    accessor: "userType",
                    filterable: false,
                    Cell: row => (
                        <span>
                                    {types[row.value]}
                                </span>
                    )
                },
            ]
        ];


        const types = {
            helper: 'Assistance',
            admin: 'Staff',
            super_admin: 'Admin',
            django_admin: 'Django admin'
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                onEdit(rowInfo.original);
                            }
                        }
                    }}
                    manual
                    data={data}
                    page={page}
                    pages={Math.ceil(count / pageSize)}
                    onPageChange={(pageIndex) => {
                        onChangePagination(pageIndex);
                    }}

                    onSortedChange={(newSorted) => {
                        onSortUsers(newSorted)
                    }}
                    onFilteredChange={(e, t, k) => {
                        onFilterUser(e, t, k)
                    }}

                    defaultPageSize={10}
                    pageSize={pageSize}
                    pageSizeOptions={[5, 10, 15, 20]}
                    onPageSizeChange={onChangePageSize}
                    noDataText="No users found"
                    columns={columns}
                />
            </FuseAnimate>
        );
    }
}


export default withStyles(styles)(ContactsList);

