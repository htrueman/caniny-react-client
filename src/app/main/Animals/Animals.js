import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import AnimalsList from './AnimalsList';
import animalsService from 'app/services/animalsService';
import AnimalWindow from './AnimalWindow';


const styles = theme => ({
    layoutRoot: {}
});

class Animals extends Component {
    state = {
        animals: [],
        selectedAnimal: {},
        open: false,
        search: '',

        count: 0,
        page: 1
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSearch = ({target: {value}}) => {
        this.setState({
            search: value
        });
        this.getUsers(value);
    };


    getAnimals = async (search) => {
        const {page} = this.state;

        let params = search ? `?page=${page}&search=${search}` : '';

        const res = await animalsService.getAnimals(params);
        this.setState({
            animals: res.results,
            count: res.count
        })
    };

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) this.props.history.push('/');
        this.getAnimals();
    }

    render() {
        const {animals, selectedAnimal, open, page, count, search} = this.state,
            {classes} = this.props;

        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page">
                            <h4><Icon>pets</Icon>Animals </h4>

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
                            {/*<h4>Filters</h4>*/}
                        </div>
                    }
                    content={
                        <div className="p-24">
                            <AnimalsList
                                onAddUser={this.handleClickOpen}
                                data={animals}
                                page={page}
                                count={count}
                            />
                        </div>
                    }
                />

                <AnimalWindow
                    open={open}
                    onClose={this.handleClose}
                    animal={selectedAnimal}
                />
            </Fragment>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Animals);