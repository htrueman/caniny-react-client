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
    Typography
} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

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
        selectedContactsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
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

    render() {
        const {contacts, onAddUser, classes, user, searchText = '', selectedContactIds = [], selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, openEditContactDialog, removeContacts, removeContact, toggleStarredContact, setContactsUnstarred, setContactsStarred} = this.props;
        const data = this.getFilteredArray(contacts, searchText);
        const {selectedContactsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no contacts!
                    </Typography>
                </div>
            );
        }

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
                                if (rowInfo) {
                                    openEditContactDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header: () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    // onChange={(event) => {
                                    //     event.target.checked ? selectAllContacts() : deSelectAllContacts();
                                    // }}
                                    checked={selectedContactIds.length === Object.keys(contacts).length && selectedContactIds.length > 0}
                                    indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                                />
                            ),
                            accessor: "",
                            Cell: row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedContactIds.includes(row.value.id)}
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
                                selectedContactIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedContactMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedContactsMenu"
                                            anchorEl={selectedContactsMenu}
                                            open={Boolean(selectedContactsMenu)}
                                            onClose={this.closeSelectedContactsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeContacts(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsStarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsUnstarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>star_border</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Unstarred"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
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
                            className: "font-bold"
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
                            Header: () => (
                                <div>
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
                                                    <b>Super Admin</b>: Full
                                                    permissions</Typography>
                                                <Typography color="inherit"><b>Admin</b>:
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
                            filterable: true,
                            Cell: row => (
                                <span>
                                    {types[row.value]}
                                </span>
                            )
                        },
                        {
                            Header: () => (
                                <Tooltip title="Add user">
                                    <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={onAddUser}>
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
                                            toggleStarredContact(row.original.id)
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>

                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeContact(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No contacts found"
                />
            </FuseAnimate>
        );
    }
}


export default withStyles(styles)(ContactsList);

