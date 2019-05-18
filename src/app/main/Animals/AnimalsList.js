import React, {Component, PureComponent, Fragment} from 'react';
import {
    Avatar,
    Checkbox,
    Icon,
    IconButton,
    TextField
} from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import {FuseUtils, FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import {faPlusSquare, faPaw} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import animalsService from 'app/services/animalsService';
import {countryList} from './countryList';
import moment from "moment/moment";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

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
    exact: 'Matches',
    gte: 'Grater than',
    lte: 'Less than',
};

const paramsAllColumns = {
    id: 'ID',
    name: 'Name',
    age: 'Age',
    life_stage: 'Life Stage',
    gender: 'Gender',
    species: 'Species',
    breed: 'Breed',
    species_details: 'Species Details',
    origin_country: 'Origin Country',
    pregnant: 'Pregnant',
    personality: 'Personality',
    energy_level: 'Energy Level',
    cats_friendly: 'Cats Friendly',
    dogs_friendly: 'Dogs Friendly',
    animals_friendly: 'Animals Friendly',
    human_friendly: 'Humans Friendly',
    kids_friendly: 'Kids Friendly',
    bites: 'Bites',
    for_adoption: 'Adoption',
    for_foster: 'Foster',
    accommodation: 'Accommodation',
    tag_id: 'Tag',
    chip_producer: 'Chip Producer',
    chip_id: 'Chip ID',
    joined_reason: 'Entry Reason',
    entry_date: 'Entry Date',
    leave_reason: 'Leave Reason',
    leave_date: 'Leave Date',
    history: 'History'
};

const allColumns = [
    // {
    //     id: 'id',
    //     title: 'ID'
    // },
    {
        id: 'name',
        title: 'Name'
    },
    {
        id: 'age',
        title: 'Age'
    },
    {
        id: 'gender',
        title: 'Gender'
    },
    {
        id: 'species',
        title: 'Species'
    },
    {
        id: 'breed',
        title: 'Breed'
    },
    {
        id: 'life_stage',
        title: 'Life Stage'
    },
    {
        id: 'species_details',
        title: 'Species Details'
    },
    {
        id: 'origin_country',
        title: 'Origin Country'
    },
    {
        id: 'pregnant',
        title: 'Pregnant'
    },
    {
        id: 'personality',
        title: 'Personality'
    },
    {
        id: 'energy_level',
        title: 'Energy Level'
    },
    {
        id: 'cats_friendly',
        title: 'Cats Friendly'
    },
    {
        id: 'dogs_friendly',
        title: 'Dogs Friendly'
    },
    {
        id: 'animals_friendly',
        title: 'Animals Friendly'
    },
    {
        id: 'human_friendly',
        title: 'Humans Friendly'
    },
    {
        id: 'kids_friendly',
        title: 'Kids Friendly'
    },
    {
        id: 'bites',
        title: 'Bites'
    },
    {
        id: 'for_adoption',
        title: 'Adoption'
    },
    {
        id: 'for_foster',
        title: 'Foster'
    },
    {
        id: 'accommodation',
        title: 'Accommodation'
    },
    {
        id: 'tag_id',
        title: 'Tag'
    },
    {
        id: 'chip_producer',
        title: 'Chip Producer'
    },
    {
        id: 'chip_id',
        title: 'Chip ID'
    },
    {
        id: 'joined_reason',
        title: 'Entry Reason'
    },
    {
        id: 'entry_date',
        title: 'Entry Date'
    },
    {
        id: 'leave_reason',
        title: 'Leave Reason'
    },
    {
        id: 'leave_date',
        title: 'Leave Date'
    },
    // {
    //     id: 'history',
    //     title: 'History'
    // },
];

const humansFriendlyParams = {
    'yes': 'Yes',
    'no': 'No',
    'only_females': 'Only females',
    'only_males': 'Only males',
    'unknown': 'Unknown'
};

const catsFriendlyParams = {
    'yes': 'Yes',
    'no': 'No',
    'only_females': 'Only females',
    'only_males': 'Only males',
    'unknown': 'Unknown'
};

const animalsFriendlyParams = {
    'yes': 'Yes',
    'no': 'No',
    'only_small_animals': 'Only Small Animals',
    'only_big_animals': 'Only Big Animals',
    'unknown': 'Unknown'
};
const kidsFriendlyParams = {
    'yes': 'Yes',
    'no': 'No',
    'only_females': 'Only females',
    'only_males': 'Only males',
    'only_young_kids': 'Only young kids',
    'only_old_kids': 'Only older kids',
    'both_young_and_old': 'Both young & old',
    'unknown': 'Unknown'
};

const energyLevelParams = {
    'lazy': 'Lazy',
    'chill': 'Chill',
    'active': 'Active',
    'energetic': 'Energetic',
    'hyper': 'Hyper'
};


class ContactsList extends PureComponent {

    state = {
        selectedContactsMenu: null,
        anchorEl: null,
        selectedAnimalsIds: [],
        selectedColumns: [],
        dogBreeds: [],
        catBreeds: [],
        focus: ''
    };

    getFilteredArray = (entities, searchText = '') => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }

        return FuseUtils.filterArrayByString(arr, searchText);
    };

    getAnimalsList = async () => {
        const [dogBreeds, catBreeds] = await Promise.all([animalsService.getBreeds('dog'), animalsService.getBreeds('cat')]);

        this.setState({
            dogBreeds: dogBreeds,
            catBreeds: catBreeds
        })
    };


    getMyColuns = async () => {
        const res = await animalsService.getColums();

        this.setState({
            selectedColumns: res.columns
        })
    };

    updateColumns = () => {
        this.getMyColuns();
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

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    componentDidMount() {
        this.getMyColuns();
        this.getAnimalsList();
    }


    customFilter = (filter, onChangeFilter, field) => {
        const {focus} = this.state;

        const changeFilterType = (value) => {
            this.setState({
                [`filterType&${field}`]: value,
            }, () => {
                onChangeFilter({
                    filterValue: this.state[`filterValue&${field}`],
                    filterType: value
                });
            });
        };

        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                [`filterValue&${field}`]: value,
                focus: `filterValue&${field}`
            }, () => onChangeFilter({
                filterValue: value,
                filterType: this.state[`filterType&${field}`] ? this.state[`filterType&${field}`] : 'contains'
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
                        value={this.state[`filterValue&${field}`]}
                        autoFocus={focus === `filterValue&${field}`}
                    />

                    {filterParams[this.state[`filterType&${field}`]] || 'Matches'}
                </div>

                <RenderMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };

    customAgeFilter = (filter, onChangeFilter, field) => {
        const {focus} = this.state;

        const changeFilterType = (value) => {
            this.setState({
                [`filterType&${field}`]: value,
            }, () => {
                onChangeFilter({
                    type: 'age',
                    filterValue: this.state[`filterValue&${field}`],
                    filterType: value
                });
            });
        };

        const changeFilterValue = ({target: {value}}) => {
            this.setState({
                [`filterValue&${field}`]: value,
                focus: `filterValue&${field}`
            }, () => onChangeFilter({
                type: 'age',
                filterValue: value,
                filterType: this.state[`filterType&${field}`] ? this.state[`filterType&${field}`] : 'gte'
            }));
        };

        return (
            <div className="filter-block">
                <div className='filter-input' key='1'>
                    <TextField
                        onChange={changeFilterValue}
                        placeholder="Filter"
                        type='number'
                        style={{
                            width: '100%',
                            height: '40px',
                            float: 'left',
                            fontSize: '12px'
                        }}
                        value={this.state[`filterValue&${field}`]}
                        autoFocus={focus === `filterValue&${field}`}
                    />

                    {filterParams[this.state[`filterType&${field}`]] || 'Grater than'}

                </div>

                <RenderAgeMenu
                    changeFilterType={changeFilterType}
                />

            </div>
        )
    };

    customDateFilter = (filter, onChangeFilter, field) => {
        const {focus} = this.state;

        const changeFilterType = (value) => {
            this.setState({
                [`filterType&${field}`]: value,
            }, () => {
                onChangeFilter({
                    type: 'date',
                    filterValue: moment(this.state[`filterValue&${field}`]).format('YYYY-MM-DD'),
                    filterType: value
                });
            });
        };

        const changeFilterValue = (value) => {
            this.setState({
                [`filterValue&${field}`]: value,
                focus: `filterValue&${field}`
            }, () => onChangeFilter({
                type: 'date',
                filterValue: value ? moment(value).format('YYYY-MM-DD') : '',
                filterType: this.state[`filterType&${field}`] ? this.state[`filterType&${field}`] : 'gte'
            }));
        };

        return (
            <div className="filter-block">
                <div className='filter-input' key='1'>
                    <DatePicker
                        showYearDropdown
                        selected={this.state[`filterValue&${field}`]}
                        onChange={changeFilterValue}
                        placeholderText="Filter"
                        className="date-filter"
                        dateFormat="dd-MM-yyyy"
                    />

                    {/*<TextField*/}
                    {/*onChange={}*/}
                    {/*placeholder="Filter"*/}
                    {/*type='number'*/}
                    {/*style={{*/}
                    {/*width: '100%',*/}
                    {/*height: '40px',*/}
                    {/*float: 'left',*/}
                    {/*fontSize: '12px'*/}
                    {/*}}*/}
                    {/*value={this.state[`filterValue&${field}`]}*/}
                    {/*autoFocus={focus === `filterValue&${field}`}*/}
                    {/*/>*/}

                    {filterParams[`filterType&${field}`] || 'Grater than'}
                </div>

                <RenderAgeMenu
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
                userRole = 'helper'
            } = this.props,

            {
                selectedAnimalsIds,
                anchorEl,
                selectedColumns,
                dogBreeds,
                catBreeds,
            } = this.state,

            userTypes = {
                helper: 'Assistance',
                admin: 'Staff',
                super_admin: 'Admin',
                django_admin: 'Django admin'
            };

        const data = this.getFilteredArray(animals, searchText);


        let dynamicColumns = selectedColumns.map(item => {
            if (item === 'breed') {
                return ({
                    Header: paramsAllColumns[item],
                    accessor: item,
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        const currentBreed = [...dogBreeds, ...catBreeds].find(i => i.id === row.value);
                        return (
                            <span>{currentBreed ? currentBreed.name : ''}</span>
                        )
                    }
                })
            } else if (item === 'origin_country') {
                return ({
                    Header: paramsAllColumns[item],
                    accessor: 'originCountry',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        const currentCountry = countryList.find(i => i.id === row.value);
                        return (
                            <span>{currentCountry ? currentCountry.title : ''}</span>
                        )
                    }
                })
            } else if (item === 'human_friendly') {
                return ({
                    Header: 'Humans Friendly',
                    accessor: 'humansFriendly',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{humansFriendlyParams[row.original.humansFriendly]}</span>
                        )
                    }
                })
            } else if (item === 'cats_friendly') {
                return ({
                    Header: 'Cats Friendly',
                    accessor: 'catsFriendly',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{catsFriendlyParams[row.original.catsFriendly]}</span>
                        )
                    }
                })
            } else if (item === 'dogs_friendly') {
                return ({
                    Header: 'Dogs Friendly',
                    accessor: 'dogsFriendly',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{catsFriendlyParams[row.original.dogsFriendly]}</span>
                        )
                    }
                })
            } else if (item === 'kids_friendly') {
                return ({
                    Header: 'Kids Friendly',
                    accessor: 'kidsFriendly',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{kidsFriendlyParams[row.original.dogsFriendly]}</span>
                        )
                    }
                })
            } else if (item === 'for_adoption') {
                return ({
                    Header: 'Adoption',
                    accessor: 'adoptionDate',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customDateFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{row.original.adoptionDate ? moment(row.original.adoptionDate).format('DD-MM-YYYY') : ''}</span>
                        )
                    }
                })
            } else if (item === 'for_foster') {
                return ({
                    Header: 'Foster',
                    accessor: 'forFoster',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'tag_id') {
                return ({
                    Header: 'Tag',
                    accessor: 'tagId',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'chip_producer') {
                return ({
                    Header: 'Chip Producer',
                    accessor: 'chipProducer',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'joined_reason') {
                return ({
                    Header: 'Entry Reason',
                    accessor: 'joinedReason',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'entry_date') {
                return ({
                    Header: 'Entry Date',
                    accessor: 'entryDate',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customDateFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{row.original.entryDate ? moment(row.original.entryDate).format('DD-MM-YYYY') : ''}</span>
                        )
                    }
                })
            } else if (item === 'leave_date') {
                return ({
                    Header: 'Leave Date',
                    accessor: 'leaveDate',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customDateFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{row.original.leaveDate ? moment(row.original.leaveDate).format('DD-MM-YYYY') : ''}</span>
                        )
                    }
                })
            } else if (item === 'leave_reason') {
                return ({
                    Header: 'Leave Reason',
                    accessor: 'leaveReason',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'chip_id') {
                return ({
                    Header: 'Chip ID',
                    accessor: 'chipId',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'species_details') {
                return ({
                    Header: 'Species Details',
                    accessor: 'speciesDetails',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                })
            } else if (item === 'energy_level') {
                return ({
                    Header: 'Energy Level',
                    accessor: 'energyLevel',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{energyLevelParams[row.original.energyLevel]}</span>
                        )
                    }
                })
            } else if (item === 'pregnant') {
                return ({
                    Header: 'Pregnant',
                    accessor: 'pregnant',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{row.original.pregnant ? 'Yes' : 'No'}</span>
                        )
                    }
                })
            } else if (item === 'animals_friendly') {
                return ({
                    Header: 'Animals Friendly',
                    accessor: 'animalsFriendly',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        return (
                            <span>{animalsFriendlyParams[row.original.animalsFriendly]}</span>
                        )
                    }
                })
            } else if (item === 'age') {
                return ({
                    Header: paramsAllColumns[item],
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customAgeFilter(filter, onChange, item)
                    ),
                    Cell: row => {
                        console.log(row);
                        if (row.original.dateOfBirth) {
                            let mdate = moment(row.original.dateOfBirth).format('YYYY-MM-DD').toString();
                            let yearThen = parseInt(mdate.substring(0, 4), 10);
                            let monthThen = parseInt(mdate.substring(5, 7), 10);
                            let dayThen = parseInt(mdate.substring(8, 10), 10);

                            let today = new Date();
                            let birthday = new Date(yearThen, monthThen - 1, dayThen);

                            let differenceInMilisecond = today.valueOf() - birthday.valueOf();

                            let year_age = Math.floor(differenceInMilisecond / 31536000000);
                            let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);


                            let month_age = Math.floor(day_age / 30);

                            day_age = day_age % 30;
                            return (
                                <span>{`${year_age}y ${month_age}m ${day_age}d`}</span>
                            )
                        } else {
                            return (
                                <span>{`${row.original.age}y`}</span>
                            )
                        }
                    }
                })
            } else if (item === 'life_stage') {
                return ({
                    Header: paramsAllColumns[item],
                    accessor: 'lifeStage',
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    )
                })
            } else {
                return ({
                    Header: paramsAllColumns[item],
                    accessor: item,
                    filterable: true,
                    Filter: ({filter, onChange}) => (
                        this.customFilter(filter, onChange, item)
                    )
                })
            }

        });


        let columns = (userRole === 'super_admin' || userRole === 'admin') ? [
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
                        selectedAnimalsIds.length > 0 ? (
                            <Tooltip title="Delete" className={classes.toolTip}>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        onRemove(selectedAnimalsIds);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <RenderColumsMenu
                                columns={selectedColumns}
                                onUpdateColumns={this.updateColumns}
                            />
                        )
                    ),
                    accessor: "image",
                    Cell: row => (
                        <Avatar className="mr-8" alt={row.original.name}
                                src={row.value ? `data:image/jpeg;base64,${row.value}` : 'assets/images/avatars/avatar.svg'}/>
                    ),
                    className: "justify-center",
                    width: 64,
                    sortable: false
                },

                ...dynamicColumns,

                {
                    Header: () => (
                        <Tooltip title="Add animal" className={classes.toolTip}>
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
                    Cell: row => {
                        if (userRole === 'helper') {
                            return (
                                <div className="flex items-center">
                                    <Tooltip title="View" className={classes.toolTip}>
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                onEdit(row.original, true)
                                            }}
                                        >
                                            <Icon>visibility</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </div>

                            )
                        } else {
                            return (
                                <div className="flex items-center">
                                    <Tooltip title="Edit" className={classes.toolTip}>
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                onEdit(row.original)
                                            }}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete" className={classes.toolTip}>
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                onRemove(row.original.id);
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )
                        }
                    }
                }
            ]
            :
            [
                {
                    Header: () => (
                        selectedAnimalsIds.length > 0 ? (
                            <Tooltip title="Delete" className={classes.toolTip}>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        onRemove(selectedAnimalsIds);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <RenderColumsMenu
                                columns={selectedColumns}
                                onUpdateColumns={this.updateColumns}
                            />
                        )
                    ),
                    accessor:
                        "image",
                    Cell:
                        row => (
                            <Avatar className="mr-8" alt={row.original.name}
                                    src={row.value ? `data:image/jpeg;base64,${row.value}` : 'assets/images/avatars/avatar.svg'}/>
                        ),
                    className:
                        "justify-center",
                    width:
                        64,
                    sortable:
                        false
                }
                ,

                ...dynamicColumns,

                {
                    Header: () => (<span></span>),
                    width: 70,
                    filterable: false,
                    sortable: false,
                    Cell: row => {
                        return (
                            <div className="flex items-center">
                                <Tooltip title="View" className={classes.toolTip}>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            onEdit(row.original, true)
                                        }}
                                    >
                                        <Icon>visibility</Icon>
                                    </IconButton>
                                </Tooltip>
                            </div>

                        )
                    }
                }
            ]
        ;

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

class RenderAgeMenu extends Component {
    state = {anchorEl: null};

    handleClick = event => {
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
                        this.props.changeFilterType('gte')
                    }}>Grater than</MenuItem>
                    <MenuItem onClick={() => {
                        this.handleClose();
                        this.props.changeFilterType('lte')
                    }}>Less than</MenuItem>
                </Menu>
            </Fragment>
        )
    }
}

class RenderColumsMenu extends Component {
    state = {
        anchorEl: null,
        selectedItems: this.props.columns,
        items: allColumns,

        columns: {
            id: false,
            name: false,
            age: false,
            life_stage: false,
            gender: false,
            species: false,
            breed: false,
            species_details: false,
            origin_country: false,
            pregnant: false,
            personality: false,
            energy_level: false,
            cats_friendly: false,
            dogs_friendly: false,
            animals_friendly: false,
            human_friendly: false,
            kids_friendly: false,
            bites: false,
            for_adoption: false,
            for_foster: false,
            accommodation: false,
            tag_id: false,
            chip_producer: false,
            chip_id: false,
            joined_reason: false,
            entry_date: false,
            leave_reason: false,
            leave_date: false,
            // history: false,
        }
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = async () => {
        this.setState({anchorEl: null});

        await animalsService.updateColums({columns: this.state.selectedItems});
        // await animalsService.updateColums({columns: ["human_friendly", "leave_date", "id", "name", "age", "life_stage", "gender", "species"]});
        this.props.onUpdateColumns();
    };

    componentDidMount() {
        let newColumns = {};

        this.props.columns.forEach(item => {
            newColumns[item] = true
        });

        this.setState({
            columns: newColumns
        })
    }

    handleChangeCheckbox = name => event => {
        if (this.state.selectedItems) {
            if (this.state.selectedItems.length === 8) {
                this.setState({
                    columns: {
                        ...this.state.columns,
                        [name]: event.target.checked,
                        [this.state.selectedItems[7]]: undefined
                    }
                }, () => {
                    let newColumns = this.state.selectedItems;

                    for (let key in this.state.columns) {
                        if (this.state.columns[key]) {
                            if (newColumns.indexOf(key) === -1) {
                                newColumns.push(key);
                            }

                            this.setState({
                                selectedItems: newColumns
                            });
                        } else {
                            if (newColumns.indexOf(key) !== -1) {
                                newColumns.splice(newColumns.indexOf(key), 1);
                                this.setState({
                                    selectedItems: newColumns
                                });
                            }
                        }
                    }
                })
            } else {
                this.setState({
                    columns: {
                        ...this.state.columns,
                        [name]: event.target.checked
                    }
                }, () => {
                    let newColumns = this.state.selectedItems;

                    for (let key in this.state.columns) {
                        if (this.state.columns[key]) {
                            if (newColumns.indexOf(key) === -1) {
                                newColumns.push(key);
                            }

                            this.setState({
                                selectedItems: newColumns
                            });
                        } else {
                            if (newColumns.indexOf(key) !== -1) {
                                newColumns.splice(newColumns.indexOf(key), 1);
                                this.setState({
                                    selectedItems: newColumns
                                });
                            }
                        }
                    }
                })
            }
        }
    };


    render() {
        const {
                anchorEl,
                selectedItems,
            } = this.state,

            {
                name,
                age,
                life_stage,
                gender,
                species,
                breed,
                species_details,
                origin_country,
                pregnant,
                personality,
                energy_level,
                cats_friendly,
                dogs_friendly,
                animals_friendly,
                human_friendly,
                kids_friendly,
                bites,
                for_adoption,
                for_foster,
                accommodation,
                tag_id,
                chip_producer,
                chip_id,
                joined_reason,
                entry_date,
                leave_reason,
                leave_date,
                history,
            } = this.state.columns,

            {classes} = this.props;

        return (
            <Fragment>
                <Tooltip title="Add Columns">
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <FontAwesomeIcon icon={faPlusSquare}/>
                    </Button>
                </Tooltip>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {
                        allColumns.map(col => {
                            return (
                                <MenuItem key={col.id}>
                                    {(selectedItems.indexOf(col.id) + 1) === 0 ? '' : selectedItems.indexOf(col.id) + 1}
                                    <Checkbox
                                        checked={this.state.columns[col.id] ? true : false}
                                        onChange={this.handleChangeCheckbox(col.id)}
                                        value={col.id}
                                    />
                                    {col.title}
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            </Fragment>
        )

    }
}

