import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import AnimalsList from './AnimalsList';
import animalsService from 'app/services/animalsService';
import AnimalWindow from './AnimalWindow';
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

class Animals extends Component {
    state = {
        animals: [],
        selectedAnimal: {},
        open: false,
        search: '',

        count: 0,
        page: 0,
        tab: 'all'
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

    handleChangeTab = (value) => {
        this.setState({
            tab: value,
            page: 0
        }, () => this.getAnimals())
    };

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) this.props.history.push('/');
        this.getAnimals();
    }

    render() {
        const {
                animals,
                selectedAnimal,
                open,
                page,
                count,
                search,
                tab
            } = this.state,
            {classes} = this.props;

        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page">
                            <h4><FontAwesomeIcon icon={faPaw}/>Animals </h4>

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
                                            className={tab === 'dogs' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('dogs')}
                                        >
                                            <ListItemText className="truncate pr-0" primary="Dogs"
                                                          disableTypography={true}/>
                                        </ListItem>
                                        <ListItem
                                            button
                                            activeClassName="active"
                                            className={tab === 'cats' ? classes.activeListItem : classes.listItem}
                                            onClick={() => this.handleChangeTab('cats')}
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