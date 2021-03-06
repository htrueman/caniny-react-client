import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import AnimalsList from './AnimalsList';
import {Dialog, DialogActions, DialogTitle, Button} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import Paper from '@material-ui/core/Paper';
import {Avatar, Divider} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {FuseAnimate} from '@fuse';

import animalsService from 'app/services/animalsService';
import AnimalWindow from './AnimalWindow';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const styles = theme => ({
    layoutRoot: {},
    activeListItem: {
        color: '#fff',
        backgroundColor: 'rgb(236, 12, 142) !important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
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
});

const animalParams = {
    id: 'id',
    name: 'name',
    gender: 'gender',
    species: 'species',
    breed: 'breed',
    human_friendly: 'humans_friendly',
    animals_friendly: 'animals_friendly',
    age: 'age',
    date: 'entry_date',
};

const searchParams = {
    breed: 'breed__name',
    entryDate: 'entry_date',
    joinedReason: 'joined_reason',
    chipProducer: 'chip_producer',
    dogsFriendly: 'dogs_friendly',
    animalsFriendly: 'animals_friendly',
    humansFriendly: 'humans_friendly',
    catsFriendly: 'cats_friendly',
    energyLevel: 'energy_level',
    kidsFriendly: 'kids_friendly',
    adoptionDate: 'for_adoption',
    forFoster: 'for_foster',
    tagId: 'tag_id',
    chipId: 'chip_id',
    leaveReason: 'leave_reason',
    leaveDate: 'leave_date',

};

class Animals extends Component {
    state = {
        animals: [],
        selectedAnimal: {},
        open: false,
        openHelperAnimal: false,
        openRemove: false,
        search: '',
        removeAnimalId: '',
        filters: [],
        selectedColums: [],

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
            selectedAnimal: {},
            openHelperAnimal: false
        });
    };

    handleSearch = ({target: {value}}) => {
        this.setState({
            search: value
        });
        this.getAnimals(value);
    };


    getAnimals = async (search) => {
        const {page, tab, pageSize, sorted, filters} = this.state;

        let urlParams = [
            search ? `&search=${search}` : '',
            tab !== 'all' ? `&species__iexact=${tab === 'all' ? '' : tab}` : '',
            sorted ? `&ordering=${sorted.desc ? animalParams[sorted.id] : `-${animalParams[sorted.id]}`}` : '',
        ];

        await filters.forEach(filter => {
            console.log(filter);
            if (filter.column === 'age' || filter.type === 'date') {
                urlParams.push(filter.filterValue ? `&${filter.column}__${filter.filterType}=${filter.filterValue}` : '')
            } else {
                urlParams.push(filter.filterValue ? `&${filter.column}__i${filter.filterType}=${filter.filterValue ? filter.filterValue : ''}` : '')
            }
        });

        const params = `?page_size=${pageSize}&page=${(page + 1) + urlParams.join('')}`;

        const res = await animalsService.getAnimals(params);

        this.setState({
            animals: res.results,
            count: res.count
        })
    };

    handleChangeTab = (value) => {
        this.setState({
            tab: value,
            page: 0
        }, () => this.getAnimals())
    };

    updateWindow = () => {
        this.getAnimals();
        this.handleClose();

        this.setState({
            selectedAnimal: {}
        })
    };

    handleEditAnimal = async (animal, helper) => {
        const res = await animalsService.getAnimalById(animal.id);

        this.setState({
            selectedAnimal: res,
            openHelperAnimal: helper
        }, () => {
            this.setState({
                open: true,
            })
        })
    };

    handleOpenRemoveWindow = id => {
        this.setState({
            openRemove: true,
            removeAnimalId: id
        })
    };

    getAllColums = async () => {
        const res = await animalsService.getColums();

        this.setState({
            selectedColums: res
        })
    };

    handleChangePagination = (page) => {
        this.setState({
            page: page
        }, () => this.getAnimals())
    };
    handleChangePageSize = (pageSize) => {
        this.setState({
            pageSize: pageSize,
            page: 0
        }, () => this.getAnimals())
    };
    handleChangeSort = (newSorted) => {
        this.setState({
            sorted: newSorted[0]
        }, () => this.getAnimals());
    };

    handleFilterUser = (filter) => {
        const filtersArr = filter.map(item => {
            if (item.value.type === 'date') {
                return {
                    type: item.value.type,
                    column: searchParams[item.id]  ? searchParams[item.id]  : item.id,
                    filterType: item.value.filterType,
                    filterValue: item.value.filterValue
                }
            } else if(item.value.type === 'age') {
                return {
                    type: item.value.type,
                    column: 'age',
                    filterType: item.value.filterType,
                    filterValue: item.value.filterValue
                }
            } else {
                return {
                    type: item.value.type,
                    column: searchParams[item.id]  ? searchParams[item.id]  : item.id,
                    filterType: item.value.filterType,
                    filterValue: item.value.filterValue
                }
            }
        });

        this.setState({
            filters: filtersArr
        }, () => this.getAnimals());
    };


    handleRemoveAnimals = async () => {
        if (typeof this.state.removeAnimalId === 'string') {
            await animalsService.removeAnimal(this.state.removeAnimalId);
        } else {
            await animalsService.removeAnimals({ids: this.state.removeAnimalId});
        }

        this.setState({
            openRemove: false,
            removeAnimalId: '',
        });
        this.getAnimals();
    };

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) this.props.history.push('/');
        this.getAnimals();
        this.getAllColums();
    }

    render() {
        const {
                animals,
                selectedAnimal,
                open,
                page,
                count,
                search,
                tab,
                openRemove,
                pageSize,
                openHelperAnimal
            } = this.state,
            {classes, user} = this.props;

        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page">
                            <h4><FontAwesomeIcon icon={faPaw}/>Animals</h4>

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
                                        <Avatar style={{margin: '0 10px 0 0'}} src={user.avatar ? user.avatar : 'assets/images/avatars/avatar.svg'}/>
                                        <Typography>{user.firstName || 'User'}</Typography>
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
                                            className={tab === 'dog' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('dog')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="Dogs"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'cat' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('cat')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="Cats"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'others' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('others')}

                                        >
                                            <ListItemText className="truncate pr-0" primary="Others"
                                                          disableTypography={true}/>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </FuseAnimate>
                        </div>
                    }
                    content={
                        <div className="p-24">
                            <AnimalsList
                                onAddUser={this.handleClickOpen}
                                animals={animals}
                                page={page}
                                pageSize={pageSize}
                                count={count}

                                userRole={this.props.user.userType}

                                onEdit={this.handleEditAnimal}
                                onRemove={this.handleOpenRemoveWindow}
                                onChangePagination={this.handleChangePagination}
                                onChangePageSize={this.handleChangePageSize}
                                onSortUsers={this.handleChangeSort}
                                onFilterUser={this.handleFilterUser}

                            />
                        </div>
                    }
                />

                <AnimalWindow
                    open={open}
                    openHelperAnimal={openHelperAnimal}
                    onClose={this.handleClose}
                    onUpdate={this.updateWindow}
                    animal={selectedAnimal}
                />

                <Dialog
                    open={openRemove}
                    onClose={() => this.setState({openRemove: false, removeUserId: ''})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Do you want to continue the deletion?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleRemoveAnimals} style={{color: '#33ADFF'}} autoFocus>
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


function mapStateToProps({auth}) {
    return {
        user: auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Animals)));

