import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from "@material-ui/core/styles/index";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Input} from '@material-ui/core';
import animalsService from 'app/services/animalsService';
import DatePicker, {CalendarContainer} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from '@material-ui/core/Select';
import {Avatar} from "@material-ui/core";
import ImageUploader from 'react-images-upload';

const styles = theme => ({
    layoutRoot: {},
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit,
        width: '20%',
    },
    formHistoryControl: {
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    button: {
        backgroundColor: 'inherit !important'
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

const animalFields = {
    id: '',
    name: '',
    species: '',
    breed: '',
    dateOfBirth: '',
    age: '',
    birthday: '',
    size: '',
    social: '',
    accommodation: '',
    tag: '',
    microchip: '',
};

class AnimalWindow extends Component {
    state = {
        animal: {},
        value: 0,
    };

    handleSaveAnimal = async (e) => {
        e.preventDefault();
        const {firstName, lastName, email, phoneNumber, userType} = this.state;

        // if (this.state.id) {
        //     await animalsService.updateAnimal({
        //         firstName,
        //         lastName,
        //         email,
        //         phoneNumber,
        //         userType
        //     }, this.state.id);
        // } else {
        await animalsService.createNewAnimal(this.state.animal);
        // }

        this.setState({
            ...animalFields
        });

        this.props.onClose();
    };

    handleChange = (event, value) => {
        console.log(this.state);
        this.setState({value}, () => console.log(this.state));
    };

    onDrop = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                avatar: result,
                uploadImg: true
            })
        });
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.user.id) {
    //         this.setState({...nextProps.user})
    //     }
    // }


    handleChangeInput = name => event => {
        this.setState({
            animal: {
                ...this.state.animal,
                [name]: event.target.value
            }
        });
    };


    render() {
        const {
                name,
                species,
                breed,
                age,
                accommodation,
                dateOfBirth,
                LifeStages,
                gender,
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
                adoption,
                foster,
                tag_number,
                microchip_number,
                joined_reason,
                entry_date,
                leave_reason,
                leave_date,
                history,
                avatar,
                height,
                length,
                weight,
                weight_condition,
                disabled,
                injured,
                cryptorchid,
                sterilized,
                sterilized_date,
                eyes_sight,
                blind,
                deaf,
                teeth,
                gums,
                describe_health,
                size,
                st_coat_color,
                nd_coat_color,
                rd_coat_color,
                coat_marks,
                st_eye_color,
                nd_eye_color,
                ears,
                tail,
                describe_appearance,
                //4
                obedience,
                house_trained,
                crate_trained,
                fence_required,
                describe_training,
                //5
                owner_status,
                owner_name,
                owner_last_name,
                email,
                phone,
                country,
                address,
                date,
                comments,

            } = this.state.animal,

            {value} = this.state,

            {
                classes,
                onClose,
                open
            } = this.props;

        return (
            <Dialog
                open={open}
                maxWidth='md'
                onClose={onClose}
                aria-labelledby="form-dialog-title"
                className="new-user-window"
            >
                <DialogTitle id="form-dialog-title">New animal</DialogTitle>

                <div className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                    >
                        <Tab
                            disableRipple
                            classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                            label="General"
                        />
                        <Tab
                            disableRipple
                            classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                            label="Health"
                        />
                        <Tab
                            disableRipple
                            classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                            label="Appearance"
                        />
                        <Tab
                            disableRipple
                            classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                            label="Training"
                        />
                        <Tab
                            disableRipple
                            classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                            label="Ownership"
                        />
                    </Tabs>
                </div>

                {value === 0 && <div className='tab1'>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                    />
                                </div>


                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Name*</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={name}
                                        required={true}
                                        onChange={this.handleChangeInput('name')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Birthday</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('dateOfBirth')}
                                        value={dateOfBirth}
                                        type="date"
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Age*</InputLabel>
                                    <TextField
                                        id="Age"
                                        required
                                        type="number"
                                        value={age}
                                        onChange={this.handleChangeInput('age')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Life Stage</InputLabel>
                                    <Select
                                        value={LifeStages}
                                        native
                                        onChange={this.handleChangeInput('LifeStages')}
                                    >
                                        <option value=""/>
                                        <option value='baby'>Baby</option>
                                        <option value='young'>Young</option>
                                        <option value='adult'>Adult</option>
                                        <option value='senior'>Senior</option>
                                    </Select>
                                </div>

                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Gender*</InputLabel>
                                    <Select
                                        value={gender}
                                        required
                                        native
                                        input={<Input id="name"/>}
                                        onChange={this.handleChangeInput('gender')}
                                    >
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Species*</InputLabel>
                                    <Select
                                        value={species}
                                        required
                                        native
                                        onChange={this.handleChangeInput('species')}
                                    >
                                        <option value='dogs'>Dogs</option>
                                        <option value='cats'>Cats</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Breed*</InputLabel>
                                    <Select
                                        value={breed}
                                        required
                                        native
                                        onChange={this.handleChangeInput('breed')}
                                    >
                                        <option value='dogs'>Dogs</option>
                                        <option value='cats'>Cats</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Species details</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={species_details}
                                        onChange={this.handleChangeInput('species_details')}
                                    />
                                </div>
                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Origin Country</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={origin_country}
                                        onChange={this.handleChangeInput('origin_country')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Pregnant</InputLabel>
                                    <Select
                                        value={pregnant}
                                        native
                                        onChange={this.handleChangeInput('pregnant')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Personality</InputLabel>
                                    <Select
                                        value={personality}
                                        native
                                        onChange={this.handleChangeInput('personality')}
                                    >
                                        <option value=""/>
                                        <option value='calm'>Calm</option>
                                        <option value='stable'>Stable</option>
                                        <option value='alert'>Alert</option>
                                        <option value='nervous'>Nervous</option>
                                        <option value='anxious'>Anxious</option>
                                        <option value='defensive'>Defensive</option>
                                        <option value='aggressive'>Aggressive</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Energy Level</InputLabel>
                                    <Select
                                        value={energy_level}
                                        native
                                        onChange={this.handleChangeInput('energy_level')}
                                    >
                                        <option value=""/>
                                        <option value='lazy'>1: Lazy</option>
                                        <option value='chill'>2: Chill</option>
                                        <option value='active'>3: Active</option>
                                        <option value='energetic'>4: Energetic</option>
                                        <option value='hyper'>5: Hyper</option>
                                    </Select>
                                </div>
                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Cats Friendly</InputLabel>
                                    <Select
                                        value={cats_friendly}
                                        native
                                        onChange={this.handleChangeInput('cats_friendly')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='only_females'>Only females</option>
                                        <option value='only_males'>Only males</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Dogs Friendly</InputLabel>
                                    <Select
                                        value={dogs_friendly}
                                        native
                                        onChange={this.handleChangeInput('dogs_friendly')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='only_females'>Only females</option>
                                        <option value='only_males'>Only males</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Animals Friendly</InputLabel>
                                    <Select
                                        value={animals_friendly}
                                        native
                                        onChange={this.handleChangeInput('animals_friendly')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='only_small_animals'>Only Small Animals</option>
                                        <option value='only_big_animals'>Only Big Animals</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Human Friendly</InputLabel>
                                    <Select
                                        value={human_friendly}
                                        native
                                        onChange={this.handleChangeInput('human_friendly')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='only_females'>Only females</option>
                                        <option value='only_males'>Only males</option>
                                    </Select>
                                </div>
                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Kids Friendly</InputLabel>
                                    <Select
                                        value={kids_friendly}
                                        native
                                        onChange={this.handleChangeInput('kids_friendly')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='only_females'>Only females</option>
                                        <option value='only_males'>Only males</option>
                                        <option value='only_young_kids'>Only young kids</option>
                                        <option value='only_old_kids'>Only old kids</option>
                                        <option value='both_young_and_old'>Both young & old</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Bites</InputLabel>
                                    <Select
                                        value={bites}
                                        native
                                        onChange={this.handleChangeInput('bites')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">For Adoption</InputLabel>
                                    <Select
                                        value={adoption}
                                        native
                                        onChange={this.handleChangeInput('adoption')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='hold'>Hold</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">For Foster</InputLabel>
                                    <Select
                                        value={foster}
                                        native
                                        onChange={this.handleChangeInput('foster')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='hold'>Hold</option>
                                    </Select>
                                </div>
                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Accommodation</InputLabel>
                                    <Select
                                        value={accommodation}
                                        native
                                        onChange={this.handleChangeInput('accommodation')}
                                    >
                                        <option value=""/>
                                        <option value='apartment'>Apartment</option>
                                        <option value='house'>House</option>
                                        <option value='villa'>Villa</option>
                                        <option value='farm'>Farm</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Tag number</InputLabel>
                                    <TextField
                                        id="name"
                                        type="number"
                                        value={tag_number}
                                        onChange={this.handleChangeInput('tag_number')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Microchip number</InputLabel>
                                    <TextField
                                        id="name"
                                        type="number"
                                        value={microchip_number}
                                        onChange={this.handleChangeInput('microchip_number')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Joined Reason</InputLabel>
                                    <Select
                                        value={joined_reason}
                                        native
                                        onChange={this.handleChangeInput('joined_reason')}
                                    >
                                        <option value=""/>
                                        <option value='apartment'>Apartment</option>
                                        <option value='house'>House</option>
                                        <option value='villa'>Villa</option>
                                        <option value='farm'>Farm</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </div>
                                {/*</div>*/}

                                {/*<div className='flex flex-row justify-between'>*/}
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Entry Date</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('entry_date')}
                                        value={entry_date}
                                        type="date"
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Leave Reason</InputLabel>
                                    <Select
                                        value={leave_reason}
                                        native
                                        onChange={this.handleChangeInput('leave_reason')}
                                    >
                                        <option value=""/>
                                        <option value='adoption'>Adoption</option>
                                        <option value='foster'>Foster</option>
                                        <option value='medical'>Medical</option>
                                        <option value='death'>Death</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Leave Date</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('leave_date')}
                                        value={leave_date}
                                        type="date"
                                    />
                                </div>

                                <div className={classes.formHistoryControl}>
                                    <InputLabel htmlFor="age-simple">History</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('history')}
                                        value={history}
                                        rows={3}
                                        fullWidth
                                        multiline={true}
                                        type="text"
                                    />
                                </div>
                            </div>


                            <DialogActions>
                                <Button onClick={onClose} color="secondary" className={classes.button}>
                                    Cancel
                                </Button>

                                <Button type='submit' color="secondary" className={classes.button}>
                                    Save
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </div>}
                {value === 1 && <div className='tab2'>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Height</InputLabel>
                                    <TextField
                                        id="name"
                                        type="number"
                                        value={height}
                                        onChange={this.handleChangeInput('height')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Length</InputLabel>
                                    <TextField
                                        id="name"
                                        type="number"
                                        value={length}
                                        onChange={this.handleChangeInput('length')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Weight</InputLabel>
                                    <TextField
                                        id="name"
                                        type="number"
                                        value={weight}
                                        onChange={this.handleChangeInput('weight')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Weight Condition</InputLabel>
                                    <Select
                                        value={weight_condition}
                                        native
                                        onChange={this.handleChangeInput('weight_condition')}
                                    >
                                        <option value=""/>
                                        <option value='normal'>Normal</option>
                                        <option value='underweight'>Underweight</option>
                                        <option value='overweight'>Overweight</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Disabled</InputLabel>
                                    <Select
                                        value={disabled}
                                        native
                                        onChange={this.handleChangeInput('disabled')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Injured</InputLabel>
                                    <Select
                                        value={injured}
                                        native
                                        onChange={this.handleChangeInput('injured')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Cryptorchid</InputLabel>
                                    <Select
                                        value={cryptorchid}
                                        native
                                        onChange={this.handleChangeInput('cryptorchid')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Sterilized</InputLabel>
                                    <Select
                                        value={sterilized}
                                        native
                                        onChange={this.handleChangeInput('sterilized')}
                                    >
                                        <option value=""/>
                                        <option value='spayed'>Spayed</option>
                                        <option value='neutered'>Neutered</option>
                                    </Select>
                                </div>


                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Sterilized Date</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('sterilized_date')}
                                        value={sterilized_date}
                                        type="date"
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Eyes Sight</InputLabel>
                                    <Select
                                        value={eyes_sight}
                                        native
                                        onChange={this.handleChangeInput('eyes_sight')}
                                    >
                                        <option value=""/>
                                        <option value='clear'>Clear</option>
                                        <option value='discharge'>Discharge</option>
                                        <option value='cloudy'>Cloudy</option>
                                        <option value='injuired'>Injuired</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Blind</InputLabel>
                                    <Select
                                        value={blind}
                                        native
                                        onChange={this.handleChangeInput('blind')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='one_eye'>One eye</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Deaf</InputLabel>
                                    <Select
                                        value={deaf}
                                        native
                                        onChange={this.handleChangeInput('deaf')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                        <option value='one_ear'>One ear</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Teeth</InputLabel>
                                    <Select
                                        value={teeth}
                                        native
                                        onChange={this.handleChangeInput('teeth')}
                                    >
                                        <option value=""/>
                                        <option value='clean'>Clean</option>
                                        <option value='tartar'>Tartar</option>
                                        <option value='rotten'>Rotten</option>
                                        <option value='abscess_sores'>Abscess/Sores</option>
                                        <option value='worn'>Worn</option>
                                        <option value='impacted'>Impacted</option>
                                        <option value='few_missing'>Few missing</option>
                                        <option value='none'>None</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Gums</InputLabel>
                                    <Select
                                        value={gums}
                                        native
                                        onChange={this.handleChangeInput('gums')}
                                    >
                                        <option value=""/>
                                        <option value='pink'>Pink</option>
                                        <option value='red'>Red</option>
                                        <option value='white'>White</option>
                                        <option value='abscess_sores'>Abscess/Sores</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Describe Health</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={describe_health}
                                        onChange={this.handleChangeInput('describe_health')}
                                    />
                                </div>
                            </div>


                            <DialogActions>
                                <Button onClick={onClose} color="secondary" className={classes.button}>
                                    Cancel
                                </Button>

                                <Button type='submit' color="secondary" className={classes.button}>
                                    Save
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </div>}
                {value === 2 && <div className='tab3'>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Size</InputLabel>
                                    <Select
                                        value={size}
                                        native
                                        onChange={this.handleChangeInput('size')}
                                    >
                                        <option value=""/>
                                        <option value='extra_small'>Extra small</option>
                                        <option value='small'>Small</option>
                                        <option value='medium'>Medium</option>
                                        <option value='large'>Large</option>
                                        <option value='extra_large'>Extra large</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">1st Coat Color</InputLabel>
                                    <Select
                                        value={st_coat_color}
                                        native
                                        onChange={this.handleChangeInput('st_coat_color')}
                                    >
                                        <option value=""/>
                                        <option value='black'>Black</option>
                                        <option value='grey'>Grey</option>
                                        <option value='white'>White</option>
                                        <option value='brown'>Brown</option>
                                        <option value='red'>Red</option>
                                        <option value='orange'>Orange</option>
                                        <option value='yellow'>Yellow</option>
                                        <option value='cream'>Cream</option>
                                        <option value='fawn'>Fawn</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">2nd Coat Color</InputLabel>
                                    <Select
                                        value={nd_coat_color}
                                        native
                                        onChange={this.handleChangeInput('nd_coat_color')}
                                    >
                                        <option value=""/>
                                        <option value='black'>Black</option>
                                        <option value='grey'>Grey</option>
                                        <option value='white'>White</option>
                                        <option value='brown'>Brown</option>
                                        <option value='red'>Red</option>
                                        <option value='orange'>Orange</option>
                                        <option value='yellow'>Yellow</option>
                                        <option value='cream'>Cream</option>
                                        <option value='fawn'>Fawn</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">3rd Coat Color</InputLabel>
                                    <Select
                                        value={rd_coat_color}
                                        native
                                        onChange={this.handleChangeInput('rd_coat_color')}
                                    >
                                        <option value=""/>
                                        <option value='black'>Black</option>
                                        <option value='grey'>Grey</option>
                                        <option value='white'>White</option>
                                        <option value='brown'>Brown</option>
                                        <option value='red'>Red</option>
                                        <option value='orange'>Orange</option>
                                        <option value='yellow'>Yellow</option>
                                        <option value='cream'>Cream</option>
                                        <option value='fawn'>Fawn</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Coat Marks</InputLabel>
                                    <Select
                                        value={coat_marks}
                                        native
                                        onChange={this.handleChangeInput('coat_marks')}
                                    >
                                        <option value=""/>
                                        <option value='stripped'>Stripped</option>
                                        <option value='dotted'>Dotted</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">1st Eye Color</InputLabel>
                                    <Select
                                        value={st_eye_color}
                                        native
                                        onChange={this.handleChangeInput('st_eye_color')}
                                    >
                                        <option value=""/>
                                        <option value='black'>Black</option>
                                        <option value='grey'>Grey</option>
                                        <option value='brown'>Brown</option>
                                        <option value='hazel'>Hazel</option>
                                        <option value='green'>Green</option>
                                        <option value='blue'>Blue</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">2nd Eye Color</InputLabel>
                                    <Select
                                        value={nd_eye_color}
                                        native
                                        onChange={this.handleChangeInput('nd_eye_color')}
                                    >
                                        <option value=""/>
                                        <option value='black'>Black</option>
                                        <option value='grey'>Grey</option>
                                        <option value='brown'>Brown</option>
                                        <option value='hazel'>Hazel</option>
                                        <option value='green'>Green</option>
                                        <option value='blue'>Blue</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Ears</InputLabel>
                                    <Select
                                        value={ears}
                                        native
                                        onChange={this.handleChangeInput('ears')}
                                    >
                                        <option value=""/>
                                        <option value='pointing'>Pointing</option>
                                        <option value='cropped'>Cropped</option>
                                        <option value='flapping'>Flapping</option>
                                        <option value='round'>Round</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Tail</InputLabel>
                                    <Select
                                        value={tail}
                                        native
                                        onChange={this.handleChangeInput('tail')}
                                    >
                                        <option value=""/>
                                        <option value='short'>Short</option>
                                        <option value='long'>Long</option>
                                        <option value='docked'>Docked</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Describe Appearance</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={describe_appearance}
                                        onChange={this.handleChangeInput('describe_appearance')}
                                    />
                                </div>
                            </div>


                            <DialogActions>
                                <Button onClick={onClose} color="secondary" className={classes.button}>
                                    Cancel
                                </Button>

                                <Button type='submit' color="secondary" className={classes.button}>
                                    Save
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>
                </div>}
                {value === 3 && <div className='tab4'>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Obedience</InputLabel>
                                    <Select
                                        value={obedience}
                                        native
                                        onChange={this.handleChangeInput('obedience')}
                                    >
                                        <option value=""/>
                                        <option value='none'>None</option>
                                        <option value='basic'>Basic</option>
                                        <option value='advanced'>Advanced</option>
                                        <option value='professional'>Professional</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">House trained</InputLabel>
                                    <Select
                                        value={house_trained}
                                        native
                                        onChange={this.handleChangeInput('house_trained')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Crate trained</InputLabel>
                                    <Select
                                        value={crate_trained}
                                        native
                                        onChange={this.handleChangeInput('crate_trained')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Fence required</InputLabel>
                                    <Select
                                        value={fence_required}
                                        native
                                        onChange={this.handleChangeInput('fence_required')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Describe Training</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={describe_training}
                                        onChange={this.handleChangeInput('describe_training')}
                                    />
                                </div>
                            </div>


                            <DialogActions>
                                <Button onClick={onClose} color="secondary" className={classes.button}>
                                    Cancel
                                </Button>

                                <Button type='submit' color="secondary" className={classes.button}>
                                    Save
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </div>}
                {value === 4 && <div className='tab5'>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Owner Status</InputLabel>
                                    <Select
                                        value={owner_status}
                                        native
                                        onChange={this.handleChangeInput('owner_status')}
                                    >
                                        <option value=""/>
                                        <option value='existing_owner'>Existing Owner</option>
                                        <option value='previous_owner'>Previous Owner</option>
                                        <option value='foster'>Foster</option>
                                        <option value='adopter'>Adopter</option>
                                        <option value='no_owner'>No Owner</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={owner_name}
                                        onChange={this.handleChangeInput('owner_name')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Last Name</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={owner_last_name}
                                        onChange={this.handleChangeInput('owner_last_name')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Email</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={email}
                                        onChange={this.handleChangeInput('email')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Phone</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={phone}
                                        onChange={this.handleChangeInput('phone')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Country</InputLabel>
                                    <Select
                                        value={country}
                                        native
                                        onChange={this.handleChangeInput('country')}
                                    >
                                        <option value=""/>
                                        <option value='us'>US</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Address</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={address}
                                        onChange={this.handleChangeInput('address')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Date</InputLabel>
                                    <TextField
                                        id="name"
                                        type="date"
                                        value={date}
                                        onChange={this.handleChangeInput('date')}
                                    />
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="name">Comments</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={comments}
                                        multiline={true}
                                        rows={3}
                                        onChange={this.handleChangeInput('comments')}
                                    />
                                </div>


                                <div className='drop-block owner-photos'>

                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Owner Photo'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                    />

                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Owner ID'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                    />
                                </div>
                            </div>


                            <DialogActions>
                                <Button onClick={onClose} color="secondary" className={classes.button}>
                                    Cancel
                                </Button>

                                <Button type='submit' color="secondary" className={classes.button}>
                                    Save
                                </Button>
                            </DialogActions>

                        </form>
                    </DialogContent>

                </div>}

            </Dialog>

        )
    }
}


export default withStyles(styles, {withTheme: true})(AnimalWindow);
