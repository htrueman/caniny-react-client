import React, {Component, PureComponent, Fragment} from 'react';
import {
    Avatar,
    Checkbox,
    Icon,
    IconButton,
    Typography,
    TextField
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PlusIcon from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import {FuseUtils, FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import PlusOne from '@material-ui/icons/ExposurePlus1';
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        fontSize: '20px'
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

const filterParams = {
    contains: 'Contains',
    startswith: 'Starts with',
    endswith: 'Ends with',
    exact: 'Matches'
};

class ContactsList extends PureComponent {

    state = {
        selectedContactsMenu: null,
        selectedAnimalsIds: [],

        filterType2: 'contains',
        filterValue2: '',
        filterType1: 'contains',
        filterValue1: '',
        filterType3: 'contains',
        filterValue3: '',
        filterType4: 'contains',
        filterValue4: '',
        filterType5: 'contains',
        filterValue5: '',

        focus: ''
    };

    getFilteredArray = (entities, searchText = '') => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }

        return FuseUtils.filterArrayByString(arr, searchText);
    };

    selectAllContacts = async () => {
        let arr = [];
        await this.props.animals.forEach(item => {
            arr.push(item.id)
        });

        this.setState({
            selectedAnimalsIds: arr
        })
    };

    deSelectAllContacts = () => {
        this.setState({
            selectedAnimalsIds: [],
            selectedContactsMenu: null
        })
    };

    selectAnimal = id => {
        this.setState({
            selectedAnimalsIds: [
                ...this.state.selectedAnimalsIds,
                id
            ]
        })
    };

    deSelectAnimal = id => {
        let arr = this.state.selectedAnimalsIds.filter(item => item !== id);

        this.setState({
            selectedAnimalsIds: arr
        })
    };


    customFilter1 = (filter, onChangeFilter) => {
        const {filterType1, filterValue1, focus} = this.state;
        const changeFilterType = (value) => {
            this.setState({
                filterType1: value,
            }, () => {
                onChangeFilter({
                    filterValue: filterValue1,
                    filterType: value
                });
            });
        };
        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                filterValue1: value,
                focus: 'filterValue1'
            }, () => onChangeFilter({
                filterValue: value,
                filterType: filterType1
            }));
        };

        return (
            <div className="filter-block">
                <div className='filter-input' key='1'>
                    <TextField
                        onChange={changeFilterValue}
                        placeholder="Filter"
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={filterValue1}
                        autoFocus={focus === 'filterValue1'}
                    />

                    {filterParams[filterType1]}
                </div>


                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };
    customFilter2 = (filter, onChangeFilter) => {
        const {filterType2, filterValue2, focus} = this.state;
        const changeFilterType = (value) => {
            this.setState({
                filterType2: value,
            }, () => {
                onChangeFilter({
                    filterValue: filterValue2,
                    filterType: value
                });
            });
        };
        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                filterValue2: value,
                focus: 'filterValue2'
            }, () => onChangeFilter({
                filterValue: value,
                filterType: filterType2
            }));
        };
        return (
            <div className="filter-block">
                <div className='filter-input' key='2'>
                    <TextField
                        onChange={changeFilterValue}
                        name='value1'
                        key='value1'
                        placeholder="Filter"
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={filterValue2}
                        autoFocus={focus === 'filterValue2'}
                    />

                    {filterParams[filterType2]}
                </div>


                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };
    customFilter3 = (filter, onChangeFilter) => {
        const {filterType3, filterValue3, focus} = this.state;
        const changeFilterType = (value) => {
            this.setState({
                filterType3: value,
            }, () => {
                onChangeFilter({
                    filterValue: filterValue3,
                    filterType: value
                });
            });
        };
        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                filterValue3: value,
                focus: 'filterValue3'
            }, () => onChangeFilter({
                filterValue: value,
                filterType: filterType3
            }));
        };
        return (
            <div className="filter-block">
                <div className='filter-input'>
                    <TextField
                        onChange={changeFilterValue}
                        placeholder="Filter"
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={filterValue3}
                        autoFocus={focus === 'filterValue3'}
                    />

                    {filterParams[filterType3]}
                </div>


                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };
    customFilter4 = (filter, onChangeFilter) => {
        const {filterType4, filterValue4, focus} = this.state;
        const changeFilterType = (value) => {
            this.setState({
                filterType4: value,
            }, () => {
                onChangeFilter({
                    filterValue: filterValue4,
                    filterType: value
                });
            });
        };
        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                filterValue4: value,
                focus: 'filterValue4'
            }, () => onChangeFilter({
                filterValue: value,
                filterType: filterType4
            }));
        };
        return (
            <div className="filter-block">
                <div className='filter-input'>
                    <TextField
                        onChange={changeFilterValue}
                        placeholder="Filter"
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={filterValue4}
                        autoFocus={focus === 'filterValue4'}
                    />

                    {filterParams[filterType4]}
                </div>


                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };
    customFilter5 = (filter, onChangeFilter) => {
        const {filterType5, filterValue5, focus} = this.state;
        const changeFilterType = (value) => {
            this.setState({
                filterType5: value,
            }, () => {
                onChangeFilter({
                    filterValue: filterValue5,
                    filterType: value
                });
            });
        };
        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                filterValue5: value,
                focus: 'filterValue5'
            }, () => onChangeFilter({
                filterValue: value,
                filterType: filterType5
            }));
        };
        return (
            <div className="filter-block">
                <div className='filter-input'>
                    <TextField
                        onChange={changeFilterValue}
                        placeholder="Filter"
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={filterValue5}
                        autoFocus={focus === 'filterValue5'}
                    />

                    {filterParams[filterType5]}
                </div>


                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };

    render() {
        const {
                users = [],
                animals,
                onAddUser,
                classes,
                page,
                pageSize,
                count,
                searchText = '',
                onChangePagination,
                onRemove,
                onSortUsers,
                onChangePageSize,
                onFilterUser,
                onEdit,
                userProfile = 'helper'
            } = this.props,

            {
                selectedAnimalsIds,
                anchorEl
            } = this.state,

            userTypes = {
                helper: 'Assistance',
                admin: 'Staff',
                super_admin: 'Admin',
                django_admin: 'Django admin'
            };


        const data = this.getFilteredArray(animals, searchText);


        const
            columns = [
                // userProfile.userType === 'super_admin' ?
                {
                    Header: () => (
                        <Checkbox
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            onChange={(event) => {
                                event.target.checked ? this.selectAllContacts() : this.deSelectAllContacts();
                            }}
                            checked={selectedAnimalsIds.length === Object.keys(animals).length && selectedAnimalsIds.length > 0}
                            indeterminate={selectedAnimalsIds.length !== Object.keys(animals).length && selectedAnimalsIds.length > 0}
                        />
                    ),
                    accessor: "",
                    Cell: row => {
                        return (<Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
                                    event.target.checked ? this.selectAnimal(row.value.id) : this.deSelectAnimal(row.value.id);
                                }}
                                checked={selectedAnimalsIds.includes(row.value.id)}
                            />
                        )
                    },
                    className: "justify-center",
                    sortable: false,
                    width: 64
                },
                {
                    Header: () => (
                        selectedAnimalsIds.length > 0 && (
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    onRemove(selectedAnimalsIds);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        )
                    ),
                    accessor: "image",
                    Cell: row => (
                        <Avatar className="mr-8" alt={row.original.name}
                                src={row.value || 'assets/images/avatars/avatar.svg'}/>
                    ),
                    className: "justify-center",
                    width: 64,
                    sortable: false
                },
                // {
                //     Header: "ID",
                //     accessor: "id",
                //     filterable: true,
                //     className: "font-bold",
                //     // Filter: ({filter, onChange}) => (
                //     //     this.customFilter1(filter, onChange)
                //     // ),
                // },
                {
                    Header: "Name",
                    accessor: "name",
                    filterable: true,
                    className: "font-bold",
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter2(filter, onChange)
                    // ),
                },
                {
                    Header: "Age",
                    accessor: "age",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter5(filter, onChange)
                    // ),
                },
                {
                    Header: "Gender",
                    accessor: "gender",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter5(filter, onChange)
                    // ),
                },
                {
                    Header: "Species",
                    accessor: "species",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter3(filter, onChange)
                    // ),
                },
                {
                    Header: "Breed",
                    accessor: "breed",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter4(filter, onChange)
                    // ),
                },
                {
                    Header: () => (
                        <span>
                           Human <br/> Friendly
                       </span>
                    ),
                    accessor: "human_friendly",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter4(filter, onChange)
                    // ),
                },
                {
                    Header: () => (
                        <span>
                           Animals <br/> Friendly
                       </span>
                    ),
                    accessor: "animals_friendly",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter4(filter, onChange)
                    // ),
                },
                // {
                //     Header: "Energy Level",
                //     accessor: "size",
                //     filterable: true,
                //     // Filter: ({filter, onChange}) => (
                //     //     this.customFilter5(filter, onChange)
                //     // ),
                // },
                // {
                //     Header: "Accommodation",
                //     accessor: "accommodation",
                //     filterable: true,
                //     width: 130
                //     // Filter: ({filter, onChange}) => (
                //     //     this.customFilter5(filter, onChange)
                //     // ),
                // },
                {
                    Header: "Entry Date",
                    accessor: "date",
                    filterable: true,
                    // Filter: ({filter, onChange}) => (
                    //     this.customFilter5(filter, onChange)
                    // ),
                },
                // userProfile.userType === 'super_admin' ?
                {
                    Header: () => (
                        <Tooltip title="Add user" className={classes.toolTip}>
                            <Fab color="secondary" aria-label="Edit" className={classes.fab}
                                 onClick={onAddUser}>
                                <span style={{fontSize: '25px', margin: '0 5px 0 0'}}>+</span>

                                <FontAwesomeIcon icon={faPaw}/>
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
            ];

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
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

                    onFilteredChange={(filter) => {
                        onFilterUser(filter)
                    }}

                    defaultPageSize={10}
                    pageSize={pageSize}
                    pageSizeOptions={[5, 10, 15, 20]}
                    onPageSizeChange={onChangePageSize}
                    noDataText="No animals found"
                    columns={columns}
                />
            </FuseAnimate>
        );
    }
}


export default withStyles(styles)(ContactsList);

class RenderMenu extends Component {
    state = {anchorEl: null};


    handleClick = event => {
        console.log(event);
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <Fragment>
                <button
                    aria-owns={'simple-menu'}
                    aria-haspopup="true"
                    className="filter-button"
                    onClick={this.handleClick}
                >
                    <Icon>filter_list</Icon>
                </button>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}

                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    transformOrigin={{vertical: "top", horizontal: "center"}}
                >
                    <MenuItem onClick={() => {
                        this.handleClose();
                        this.props.changeFilterType('contains')
                    }}>Contains</MenuItem>
                    <MenuItem onClick={() => {
                        this.handleClose();
                        this.props.changeFilterType('startswith')
                    }}>Starts with</MenuItem>
                    <MenuItem onClick={() => {
                        this.handleClose();
                        this.props.changeFilterType('endswith')
                    }}>Ends with</MenuItem>
                    <MenuItem onClick={() => {
                        this.handleClose();
                        this.props.changeFilterType('exact')
                    }}>Matches</MenuItem>
                </Menu>
            </Fragment>
        )

    }
}

