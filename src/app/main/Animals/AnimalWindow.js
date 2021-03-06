import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from "@material-ui/core/styles/index";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Input} from '@material-ui/core';
import animalsService from 'app/services/animalsService';
import "react-datepicker/dist/react-datepicker.css";
import Select from '@material-ui/core/Select';
import {Avatar} from "@material-ui/core";
import ImageUploader from 'react-images-upload';
import moment from 'moment';
import {countryList} from './countryList';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMars} from "@fortawesome/free-solid-svg-icons";
import {faPaw, faVenus} from "@fortawesome/free-solid-svg-icons/index";
import Tooltip from '@material-ui/core/Tooltip';
import {formatPhoneNumberIntl} from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const styles = theme => ({
    layoutRoot: {},
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
        margin: '20px 0'
    },
    formHistoryControl: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '20px 0'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    dialogContent: {
        width: '960px',
        height: '630px',
        overflow: 'auto'
    },
    root: {
        flexGrow: 1,
        margin: '0 0 20px 0',
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
    name: '',
    gender: 'male',
    species: '',
    joinDate: new Date(),

    appearance: {},
    training: {},
    owners: [{}],
    health: {}
};

class AnimalWindow extends Component {
    state = {
        animal: {
            ...animalFields,
        },

        dogBreeds: [],
        catBreeds: [],
        value: 0,

        uploadAnimalAvatar: false,
        uploadOwnerAvatar: false,
        disabledSave: false
    };

    handleSaveAnimal = async (e) => {
        e.preventDefault();
        const {animal} = this.state;
        this.setState({
            disabledSave: true
        });

        if (animal.id) {
            let newAnimal = {};

            for (let key in animal) {
                if (animal[key] && key !== 'id') {
                    newAnimal[key] = animal[key]
                }
            }

            if (animal.health) {
                if (animal.health.careValues) {
                    newAnimal.health.careValues = await newAnimal.health.careValues.map(item => {
                        if (item.date) {
                            return ({
                                ...item,
                                date: moment(item.date).format('YYYY-MM-DD')
                            })
                        } else {
                            return (item)
                        }
                    });

                    newAnimal.health.careValues = newAnimal.health.careValues.filter(e => e !== null)
                }
            }

            if (animal.dateOfBirth) delete newAnimal.age;

            if (animal.dateOfBirth) newAnimal.dateOfBirth = moment(animal.dateOfBirth).format('YYYY-MM-DD');
            if (animal.health) if (animal.health.sterilizedDate) newAnimal.health.sterilizedDate = moment(animal.health.sterilizedDate).format('YYYY-MM-DD');
            if (animal.adoptionDate) newAnimal.adoptionDate = moment(animal.adoptionDate).format('YYYY-MM-DD');
            if (animal.fosteringDate) newAnimal.fosteringDate = moment(animal.fosteringDate).format('YYYY-MM-DD');
            if (animal.entryDate) newAnimal.entryDate = moment(animal.entryDate).format('YYYY-MM-DD');
            if (animal.leaveDate) newAnimal.leaveDate = moment(animal.leaveDate).format('YYYY-MM-DD');
            if (animal.joinDate) newAnimal.joinDate = moment(animal.joinDate).format('YYYY-MM-DD');
            if (animal.owners[0]) if (animal.owners[0].registrationDate) newAnimal.owners[0].registrationDate = moment(animal.owners[0].registrationDate).format('YYYY-MM-DD');

            try {
                await animalsService.updateAnimal(newAnimal, animal.id)
            } catch (e) {
                this.setState({
                    disabledSave: false,
                });
            }
        } else {
            let newAnimal = {};

            for (let key in animal) {
                if (animal[key] && key !== 'id') {
                    newAnimal[key] = animal[key]
                }
            }

            if (animal.health) {
                if (animal.health.careValues) {
                    newAnimal.health.careValues = await newAnimal.health.careValues.map(item => {
                        if (item.date) {
                            return ({
                                ...item,
                                date: moment(item.date).format('YYYY-MM-DD')
                            })
                        } else {
                            return (item)
                        }
                    });

                    newAnimal.health.careValues = newAnimal.health.careValues.filter(e => e !== null)
                }
            }

            if (animal.dateOfBirth) delete newAnimal.age;
            if (animal.dateOfBirth) newAnimal.dateOfBirth = moment(animal.dateOfBirth).format('YYYY-MM-DD');
            if (animal.health) if (animal.health.sterilizedDate) newAnimal.health.sterilizedDate = moment(animal.health.sterilizedDate).format('YYYY-MM-DD');
            if (animal.adoptionDate) newAnimal.adoptionDate = moment(animal.adoptionDate).format('YYYY-MM-DD');
            if (animal.fosteringDate) newAnimal.fosteringDate = moment(animal.fosteringDate).format('YYYY-MM-DD');
            if (animal.entryDate) newAnimal.entryDate = moment(animal.entryDate).format('YYYY-MM-DD');
            if (animal.leaveDate) newAnimal.leaveDate = moment(animal.leaveDate).format('YYYY-MM-DD');
            newAnimal.joinDate = animal.joinDate ? moment(animal.joinDate).format('YYYY-MM-DD') : '';
            if (animal.owners[0]) if (animal.owners[0].registrationDate) newAnimal.owners[0].registrationDate = moment(animal.owners[0].registrationDate).format('YYYY-MM-DD');

            try {
                await animalsService.createNewAnimal(
                    newAnimal
                );
            } catch (e) {
                this.setState({
                    disabledSave: false,
                });
            }
        }


        this.setState({
            disabledSave: false,
            animal: {
                ...animalFields
            }
        });

        this.props.onUpdate();
    };

    getAnimalsList = async () => {
        const [dogBreeds, catBreeds] = await Promise.all([animalsService.getBreeds('dog'), animalsService.getBreeds('cat')]);

        this.setState({
            dogBreeds: dogBreeds,
            catBreeds: catBreeds
        })
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    onDrop = (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    image: result,
                },
                uploadAnimalAvatar: true
            })
        });
    };

    onDropOwnerAvatar = (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    owners: [{
                        ...this.state.animal.owners[0],
                        profileImageBase: result,
                    }]
                },
                uploadOwnerAvatar: true
            })
        });
    };

    onDropImageId = (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    imageId: result,
                },
                uploadImg: true
            })
        });
    };

    onDropUserId = (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    owners: [{
                        ...this.state.animal.owners[0],
                        profileIdImageBase: result,
                    }]
                },
                uploadImg: true
            })
        });
    };

    getBase64(file, cb) {
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result.split('base64,')[1])
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        } else {
            cb(null)
        }

    }

    handleChangeDatePicker = (name, object) => (value) => {
        if (name === 'dateOfBirth') {
            let mdate = moment(value).format('YYYY-MM-DD').toString();
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

            this.setState({
                animal: {
                    ...this.state.animal,
                    dateOfBirth: value,
                    age: `${year_age}y ${month_age}m ${day_age}d`
                }
            })
        } else {
            if (object) {
                if (object === 'owners') {
                    this.setState({
                        animal: {
                            ...this.state.animal,
                            owners: [{
                                ...this.state.animal.owners,
                                [name]: value
                            }]
                        }
                    })

                } else {
                    this.setState({
                        animal: {
                            ...this.state.animal,
                            [object]: {
                                ...this.state.animal[object],
                                [name]: value
                            }
                        }
                    })
                }
            } else {
                this.setState({
                    animal: {
                        ...this.state.animal,
                        [name]: value,
                    }
                })
            }
        }
    };

    handleChangeInput = (name, object) => (e) => {
        const value = e.target.value;
        console.log(name);
        console.log(value);

        if (name === 'dateOfBirth') {
            const age = moment().diff(new Date(value), 'years');
            this.setState({
                animal: {
                    ...this.state.animal,
                    dateOfBirth: value,
                    age
                }
            })
        } else if (name === 'age') {
            this.setState({
                animal: {
                    ...this.state.animal,
                    age: value.replace(/\D/, '')
                }
            });
        } else {
            if (object) {
                if (object === 'owners') {
                    let ownership = [];
                    ownership[0] = {
                        ...this.state.animal.owners[0],
                        [name]: value
                    };

                    this.setState({
                        animal: {
                            ...this.state.animal,
                            owners: ownership
                        }
                    })
                } else {

                    this.setState({
                        animal: {
                            ...this.state.animal,
                            [object]: {
                                ...this.state.animal[object],
                                [name]: value
                            }
                        }
                    })
                }
            } else {
                this.setState({
                    animal: {
                        ...this.state.animal,
                        [name]: value
                    }
                });
            }
        }
    };

    handleChangeInputCare = (name, index) => (e) => {
        let newCareValues = [];

        if (this.state.animal.health) {
            newCareValues = this.state.animal.health.careValues ? this.state.animal.health.careValues : [];
            newCareValues[index] = {
                ...(this.state.animal.health.careValues ? this.state.animal.health.careValues[index] : {}),
                [name]: e.target.value
            };
        } else {
            newCareValues[index] = {
                [name]: e.target.value
            };
        }


        this.setState({
            animal: {
                ...this.state.animal,
                health: {
                    ...this.state.animal.health,
                    careValues: newCareValues
                }
            }
        })
    };

    handleChangeDatePickerCare = (name, index) => (value) => {
        console.log(value);
        let newCareValues = this.state.animal.health.careValues ? this.state.animal.health.careValues : [];
        newCareValues[index] = {
            ...(this.state.animal.health.careValues ? this.state.animal.health.careValues[index] : {}),
            [name]: new Date(value)
        };

        this.setState({
            animal: {
                ...this.state.animal,
                health: {
                    ...this.state.animal.health,
                    careValues: newCareValues
                }
            }
        }, () => console.log(this.state))
    };

    handleChangeCheckbox = (name, object) => (e) => {
        const checked = e.target.checked;
        if (object) {
            this.setState({
                animal: {
                    ...this.state.animal,
                    [object]: {
                        ...this.state.animal[object],
                        [name]: checked ? 'yes' : 'no'
                    }
                }
            })
        } else {
            this.setState({
                animal: {
                    ...this.state.animal,
                    [name]: checked ? 'yes' : 'no'
                }
            })
        }
    };

    handleChangeCheckboxBool = (name, object) => (e) => {
        const checked = e.target.checked;
        if (object) {
            this.setState({
                animal: {
                    ...this.state.animal,
                    [object]: {
                        ...this.state.animal[object],
                        [name]: checked
                    }
                }
            })
        } else {
            this.setState({
                animal: {
                    ...this.state.animal,
                    [name]: checked
                }
            })
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.animal.id) {
            let newAnimal = nextProps.animal;

            if (newAnimal.dateOfBirth) {
                let mdate = moment(newAnimal.dateOfBirth).format('YYYY-MM-DD').toString();
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

                newAnimal.age = `${year_age}y ${month_age}m ${day_age}d`;
            }


            if (newAnimal.dateOfBirth) newAnimal.dateOfBirth = new Date(newAnimal.dateOfBirth);
            if (newAnimal.health) if (newAnimal.health.sterilizedDate) newAnimal.health.sterilizedDate = new Date(newAnimal.health.sterilizedDate);
            if (newAnimal.owners[0]) if (newAnimal.owners[0].registrationDate) newAnimal.owners[0].registrationDate = new Date(newAnimal.owners[0].registrationDate);
            if (newAnimal.adoptionDate) newAnimal.adoptionDate = new Date(newAnimal.adoptionDate);
            if (newAnimal.fosteringDate) newAnimal.fosteringDate = new Date(newAnimal.fosteringDate);
            if (newAnimal.entryDate) newAnimal.entryDate = new Date(newAnimal.entryDate);
            if (newAnimal.leaveDate) newAnimal.leaveDate = new Date(newAnimal.leaveDate);
            if (newAnimal.joinDate) newAnimal.joinDate = new Date(newAnimal.joinDate);

            if (newAnimal.health) {
                if (newAnimal.health.careValues) {
                    newAnimal.health.careValues = newAnimal.health.careValues.map(item => {
                        if (item.date) {
                            return ({
                                ...item,
                                date: new Date(item.date)
                            })
                        } else {
                            return (item)
                        }
                    })
                }
            }


            this.setState({
                animal: {...nextProps.animal},
                value: 0,
                uploadAnimalAvatar: false,
                uploadOwnerAvatar: false,

            })
        } else {
            this.setState({
                animal: {...animalFields},
                value: 0,
                uploadAnimalAvatar: false,
                uploadOwnerAvatar: false,

            })
        }
    }

    componentDidMount() {
        this.getAnimalsList()
    }

    render() {
        const {
                //1
                name,
                gender,
                dateOfBirth,
                age,
                personalityDescription,
                fosteringDate,
                imageId,
                adoptionDate,
                chipProducer,
                species,
                comments,
                breed,
                joinDate,
                accommodation,
                lifeStage,
                speciesDetails,
                pregnant,
                personality,
                energyLevel,
                kidsFriendly,
                dogsFriendly,
                animalsFriendly,
                humansFriendly,
                chipId,
                bites,
                leaveDate,
                forAdoption,
                forFoster,
                tagId,
                history,
                image,
                entryDate,
                catsFriendly,
                shelteringBackground,
                describe_health,
                leaveReason,
                joinedReason,
                //5
                userId,
                animalId,

            } = this.state.animal,

            {
                ownerStatus,
                firstName,
                lastName,
                email,
                phoneNumber,
                city,
                state,
                zipCode,
                address,
                comment,
                profileImageBase,
                profileIdImageBase,
                registrationDate
            } = this.state.animal.owners[0] ? this.state.animal.owners[0] : {},

            {
                value,
                dogBreeds,
                catBreeds,
                disabledSave
            } = this.state,

            {
                classes,
                onClose,
                open,
                openHelperAnimal
            } = this.props;

        const {
            coatType,
            size,
            firstCoatColor,
            secondCoatColor,
            thirdCoatColor,
            firstEyeColor,
            secondEyeColor,
            ears,
            tail,
            describeAppearance
        } = this.state.animal.appearance ? this.state.animal.appearance : {};

        const {
            obedience,
            houseTrained,
            crateTrained,
            fenceRequired,
            describeTraining
        } = this.state.animal.training ? this.state.animal.training : {};

        const {
            height,
            length,
            weight,
            weightCondition,
            disabled,
            injured,
            cryptorchid,
            sterilized,
            sterilizedDate,
            eyesSight,
            blind,
            deaf,
            teeth,
            gums,
            describeHealth,
            careValues
        } = this.state.animal.health ? this.state.animal.health : {};


        return (
            <Dialog
                open={open}
                maxWidth={false}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
                className="new-user-window animal-window"
            >
                <DialogTitle id="form-dialog-title">Animal Profile</DialogTitle>

                <DialogContent className={classes.dialogContent}>
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
                                label="Personality"
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
                                label="Health"
                            />
                            <Tab
                                disableRipple
                                classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                label="Care"
                            />
                            <Tab
                                disableRipple
                                classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                label="Sheltering"
                            />
                            <Tab
                                disableRipple
                                classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                label="Ownership"
                            />
                            <Tab
                                disableRipple
                                classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                label="Dossier"
                            />
                        </Tabs>
                    </div>

                    {value === 0 && <div className='tab1'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className='drop-block width-20'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                    {!openHelperAnimal ?
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Choose images'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                                            maxFileSize={5242880}
                                            singleImage={true}
                                        /> : <span className='mt-6'>{name || 'Name'}</span>}
                                </div>

                                <div className='width-80 ml-auto'>
                                    <div className='shadow-section'>
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Name*</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    disabled={openHelperAnimal}
                                                    required={true}
                                                    onChange={this.handleChangeInput('name')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Gender*</InputLabel>

                                                <div className='gender-block flex '>

                                                    <Tooltip title="Male">
                                                        <div>
                                                            <input onChange={this.handleChangeInput('gender')}
                                                                   value='male'
                                                                   type="radio"
                                                                   id="Male"
                                                                   disabled={openHelperAnimal}
                                                                   name="radio-group"
                                                                   checked={gender === 'male'}
                                                            />
                                                            <label htmlFor="Male">
                                                                <FontAwesomeIcon icon={faMars}/>
                                                            </label>
                                                        </div>
                                                    </Tooltip>

                                                    <Tooltip title="Female">
                                                        <div>
                                                            <input onChange={this.handleChangeInput('gender')}
                                                                   value='female'
                                                                   type="radio"
                                                                   id="Female"
                                                                   disabled={openHelperAnimal}
                                                                   name="radio-group"
                                                                   checked={gender === 'female'}
                                                            />
                                                            <label htmlFor="Female">
                                                                <FontAwesomeIcon icon={faVenus}/>
                                                            </label>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                                {/*<Select*/}
                                                {/*value={gender}*/}
                                                {/*required*/}
                                                {/*disabled={openHelperAnimal}*/}
                                                {/*native*/}
                                                {/*input={<Input id="name"/>}*/}
                                                {/*onChange={this.handleChangeInput('gender')}*/}
                                                {/*>*/}
                                                {/*<option value=''></option>*/}
                                                {/*<option value='male'>Male</option>*/}
                                                {/*<option value='female'>Female</option>*/}
                                                {/*</Select>*/}
                                            </div>
                                        </div>

                                        {/*---------------------------------------------------------------------*/}

                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Birthday</InputLabel>
                                                <DatePicker
                                                    showYearDropdown
                                                    selected={dateOfBirth ? new Date(dateOfBirth) : ''}
                                                    onChange={this.handleChangeDatePicker('dateOfBirth')}
                                                    disabled={openHelperAnimal}
                                                    maxDate={new Date()}
                                                    className="date-filter"
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>

                                            {dateOfBirth ? <div className={classes.formControl}>
                                                    <InputLabel className="custom-label"
                                                                htmlFor="age-simple">Age*</InputLabel>
                                                    <TextField
                                                        id="Age"
                                                        disabled={dateOfBirth}
                                                        inputProps={{
                                                            min: 0,
                                                            pattern: '[0-9]{0,5}'
                                                        }}
                                                        type="text"
                                                        value={age}
                                                        onChange={this.handleChangeInput('age')}
                                                    />
                                                </div>
                                                :
                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label"
                                                                htmlFor="age-simple">Age*</InputLabel>
                                                    <TextField
                                                        id="Age"
                                                        required
                                                        disabled={openHelperAnimal}
                                                        inputProps={{
                                                            min: 0,
                                                            pattern: '[0-9]{0,5}'
                                                        }}
                                                        type="number"
                                                        value={age}
                                                        onChange={this.handleChangeInput('age')}
                                                    />
                                                </div>
                                            }


                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Life
                                                    Stage</InputLabel>
                                                <Select
                                                    value={lifeStage}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('lifeStage')}
                                                >
                                                    <option value=""/>
                                                    <option value='baby'>Baby</option>
                                                    <option value='young'>Young</option>
                                                    <option value='adult'>Adult</option>
                                                    <option value='senior'>Senior</option>
                                                </Select>
                                            </div>
                                        </div>

                                        {/*---------------------------------------------------------------------*/}


                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Species*</InputLabel>
                                                <Select
                                                    value={species}
                                                    disabled={openHelperAnimal}
                                                    required={true}
                                                    native
                                                    onChange={this.handleChangeInput('species')}
                                                >
                                                    <option value=''></option>
                                                    <option value='dog'>Dogs</option>
                                                    <option value='cat'>Cats</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Breed*</InputLabel>
                                                <Select
                                                    value={breed}
                                                    required
                                                    native
                                                    disabled={species === 'other' || openHelperAnimal}
                                                    onChange={this.handleChangeInput('breed')}
                                                >
                                                    <option value=''></option>

                                                    {species === 'dog' && dogBreeds.map(item => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))}

                                                    {species === 'cat' && catBreeds.map(item => (
                                                        <option value={item.id}>{item.name}</option>

                                                    ))}

                                                    {species === 'other' && <option value=''></option>}
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Species
                                                    details</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    disabled={openHelperAnimal}
                                                    value={speciesDetails}
                                                    onChange={this.handleChangeInput('speciesDetails')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*---------------------------------------------------------------------*/}

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Animal
                                                Registration</InputLabel>
                                            <DatePicker
                                                showYearDropdown
                                                selected={joinDate ? new Date(joinDate) : ''}
                                                className="date-filter"
                                                dateFormat="dd-MM-yyyy"
                                                disabled
                                            />

                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Origin
                                                Country</InputLabel>
                                            <Select
                                                value={this.state.animal.originCountry}
                                                native
                                                disabled={openHelperAnimal}
                                                onChange={this.handleChangeInput('originCountry')}
                                            >
                                                <option value=''></option>
                                                {countryList.map(item => (
                                                    <option value={item.id}>{item.title}</option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    {/*---------------------------------------------------------------------*/}

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Tag
                                                ID</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                disabled={openHelperAnimal}
                                                value={tagId}
                                                onChange={this.handleChangeInput('tagId')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Chip
                                                Producer</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                disabled={openHelperAnimal}
                                                value={chipProducer}
                                                onChange={this.handleChangeInput('chipProducer')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Chip
                                                ID</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                disabled={openHelperAnimal}
                                                value={chipId}
                                                onChange={this.handleChangeInput('chipId')}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel className="custom-label"
                                                        htmlFor="age-simple">History</InputLabel>
                                            <TextField
                                                id="date"
                                                onChange={this.handleChangeInput('history')}
                                                value={history}
                                                disabled={openHelperAnimal}
                                                rows={3}
                                                fullWidth
                                                multiline={true}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ? <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions>
                                : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 1 && <div className='tab2'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className='flex justify-between width-100'>
                                    <div className='drop-block'>
                                        <Avatar className="w-96 h-96" alt="contact avatar"
                                                src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                        <span className='mt-6'>{name || 'Name'}</span>
                                    </div>

                                    <div className='width-80'>
                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Temperament</InputLabel>
                                                <Select
                                                    value={personality}
                                                    native
                                                    disabled={openHelperAnimal}
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

                                            <div className={`${classes.formControl} items-center`}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Bites</InputLabel>
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={bites}
                                                           disabled={openHelperAnimal}
                                                           checked={bites === 'yes' && true}
                                                           onChange={this.handleChangeCheckbox('bites')}/>
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Energy
                                                    Level</InputLabel>

                                                <div className="rating">
                                                    <label>
                                                        <input type="radio" name="stars" value="lazy"
                                                               onChange={this.handleChangeInput('energyLevel')}
                                                               checked={energyLevel === 'lazy'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <Tooltip title="Lazy">
                                                            <span className="icon" title="Lazy">★</span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="chill"
                                                               onChange={this.handleChangeInput('energyLevel')}
                                                               checked={energyLevel === 'chill'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">★</span>
                                                        <Tooltip title="Chill">
                                                            <span className="icon" title="Chill">★</span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="active"
                                                               onChange={this.handleChangeInput('energyLevel')}
                                                               checked={energyLevel === 'active'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">★</span>
                                                        <span className="icon" title="Chill">★</span>
                                                        <Tooltip title="Active">
                                                            <span className="icon" title="Active">★</span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="energetic"
                                                               onChange={this.handleChangeInput('energyLevel')}
                                                               checked={energyLevel === 'energetic'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">★</span>
                                                        <span className="icon" title="Chill">★</span>
                                                        <span className="icon" title="Active">★</span>
                                                        <Tooltip title="Energetic">
                                                            <span className="icon" title="Energetic">★</span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="hyper"
                                                               onChange={this.handleChangeInput('energyLevel')}
                                                               checked={energyLevel === 'hyper'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">★</span>
                                                        <span className="icon" title="Chill">★</span>
                                                        <span className="icon" title="Active">★</span>
                                                        <span className="icon" title="Energetic">★</span>
                                                        <Tooltip title="Hyper">
                                                            <span className="icon" title="Hyper">★</span>
                                                        </Tooltip>
                                                    </label>
                                                </div>


                                                {/*<Select*/}
                                                {/*value={energyLevel}*/}
                                                {/*native*/}
                                                {/*disabled={openHelperAnimal}*/}
                                                {/*onChange={this.handleChangeInput('energyLevel')}*/}
                                                {/*>*/}
                                                {/*<option value=""/>*/}
                                                {/*<option value='lazy'>1: Lazy</option>*/}
                                                {/*<option value='chill'>2: Chill</option>*/}
                                                {/*<option value='active'>3: Active</option>*/}
                                                {/*<option value='energetic'>4: Energetic</option>*/}
                                                {/*<option value='hyper'>5: Hyper</option>*/}
                                                {/*</Select>*/}
                                            </div>
                                        </div>

                                        <div className="shadow-section">
                                            <div className='flex justify-between width-100'>
                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Human
                                                        Friendly</InputLabel>
                                                    <Select
                                                        value={humansFriendly}
                                                        native
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeInput('humansFriendly')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='only_females'>Only females</option>
                                                        <option value='only_males'>Only males</option>
                                                        <option value='unknown'>Unknown</option>
                                                    </Select>
                                                </div>

                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Kids
                                                        Friendly</InputLabel>
                                                    <Select
                                                        value={kidsFriendly}
                                                        native
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeInput('kidsFriendly')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='only_females'>Only females</option>
                                                        <option value='only_males'>Only males</option>
                                                        <option value='only_young_kids'>Only young kids</option>
                                                        <option value='only_old_kids'>Only older kids</option>
                                                        <option value='both_young_and_old'>Both young & old</option>
                                                        <option value='unknown'>Unknown</option>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className='flex justify-between width-100'>
                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Animals
                                                        Friendly</InputLabel>
                                                    <Select
                                                        value={animalsFriendly}
                                                        native
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeInput('animalsFriendly')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='only_small_animals'>Only Small Animals</option>
                                                        <option value='only_big_animals'>Only Big Animals</option>
                                                        <option value='unknown'>Unknown</option>
                                                    </Select>
                                                </div>

                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Dogs
                                                        Friendly</InputLabel>
                                                    <Select
                                                        value={dogsFriendly}
                                                        native
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeInput('dogsFriendly')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='only_females'>Only females</option>
                                                        <option value='only_males'>Only males</option>
                                                        <option value='unknown'>Unknown</option>
                                                    </Select>
                                                </div>

                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Cats
                                                        Friendly</InputLabel>
                                                    <Select
                                                        value={catsFriendly}
                                                        native
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeInput('catsFriendly')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='only_females'>Only females</option>
                                                        <option value='only_males'>Only males</option>
                                                        <option value='unknown'>Unknown</option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='width-80 ml-auto shadow-section'>
                                    <div className={classes.formHistoryControl}>
                                        <InputLabel className="custom-label" htmlFor="name">Personality
                                            Description</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            rows={3}
                                            disabled={openHelperAnimal}
                                            multiline={true}
                                            fullWidth
                                            value={personalityDescription}
                                            onChange={this.handleChangeInput('personalityDescription')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 2 && <div className='tab3'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className='flex justify-between width-100'>
                                    <div className='drop-block'>
                                        <Avatar className="w-96 h-96" alt="contact avatar"
                                                src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                        <span className='mt-6'>{name || 'Name'}</span>
                                    </div>

                                    <div className='width-80'>
                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Coat
                                                    Type</InputLabel>
                                                <Select
                                                    value={coatType ? coatType : ''}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('coatType', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='short'>Short</option>
                                                    <option value='medium'>Medium</option>
                                                    <option value='long'>Long</option>
                                                    <option value='hairless'>Hairless</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Size</InputLabel>

                                                <div className="rating">
                                                    <label>
                                                        <input type="radio" name="stars" value="extra_small"
                                                               onChange={this.handleChangeInput('size', 'appearance')}
                                                               checked={size === 'extra_small'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <Tooltip title="Extra small">

                                                            <span className="icon" title="Lazy">
                        <FontAwesomeIcon style={{fontSize: '20px'}}
                                         icon={faPaw}/>
                        </span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="small"
                                                               onChange={this.handleChangeInput('size', 'appearance')}
                                                               checked={size === 'small'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">
                        <FontAwesomeIcon style={{fontSize: '20px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <Tooltip title="Small">

                                                            <span className="icon" title="Chill">
                        <FontAwesomeIcon style={{fontSize: '22px'}}
                                         icon={faPaw}/>
                        </span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="medium"
                                                               onChange={this.handleChangeInput('size', 'appearance')}
                                                               checked={size === 'medium'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">
                        <FontAwesomeIcon style={{fontSize: '20px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Chill">
                        <FontAwesomeIcon style={{fontSize: '22px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <Tooltip title="Medium">

                                                            <span className="icon" title="Active">
                        <FontAwesomeIcon style={{fontSize: '24px'}}
                                         icon={faPaw}/>
                        </span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="large"
                                                               onChange={this.handleChangeInput('size', 'appearance')}
                                                               checked={size === 'large'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">
                        <FontAwesomeIcon style={{fontSize: '20px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Chill">
                        <FontAwesomeIcon style={{fontSize: '22px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Active">
                        <FontAwesomeIcon style={{fontSize: '24px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <Tooltip title="Large">
                                                            <span className="icon" title="Energetic">
                        <FontAwesomeIcon style={{fontSize: '26px'}}
                                         icon={faPaw}/>
                        </span>
                                                        </Tooltip>
                                                    </label>

                                                    <label>
                                                        <input type="radio" name="stars" value="extra_large"
                                                               onChange={this.handleChangeInput('size', 'appearance')}
                                                               checked={size === 'extra_large'}
                                                               disabled={openHelperAnimal}
                                                        />
                                                        <span className="icon" title="Lazy">
                        <FontAwesomeIcon style={{fontSize: '20px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Chill">
                        <FontAwesomeIcon style={{fontSize: '22px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Active">
                        <FontAwesomeIcon style={{fontSize: '24px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <span className="icon" title="Energetic">
                        <FontAwesomeIcon style={{fontSize: '26px'}}
                                         icon={faPaw}/>
                        </span>
                                                        <Tooltip title="Extra large">

                                                            <span className="icon" title="Hyper">
                        <FontAwesomeIcon style={{fontSize: '28px'}}
                                         icon={faPaw}/>
                        </span>
                                                        </Tooltip>
                                                    </label>
                                                </div>


                                                {/*<Select*/}
                                                {/*value={size}*/}
                                                {/*native*/}
                                                {/*disabled={openHelperAnimal}*/}
                                                {/*onChange={this.handleChangeInput('size', 'appearance')}*/}
                                                {/*>*/}
                                                {/*<option value=""/>*/}
                                                {/*<option value='extra_small'>Extra small</option>*/}
                                                {/*<option value='small'>Small</option>*/}
                                                {/*<option value='medium'>Medium</option>*/}
                                                {/*<option value='large'>Large</option>*/}
                                                {/*<option value='extra_large'>Extra large</option>*/}
                                                {/*</Select>*/}
                                            </div>
                                        </div>

                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">1st Coat
                                                    Color</InputLabel>
                                                <Select
                                                    value={firstCoatColor}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('firstCoatColor', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='Black'>Black</option>
                                                    <option value='Grey'>Grey</option>
                                                    <option value='White'>White</option>
                                                    <option value='Brown'>Brown</option>
                                                    <option value='Red'>Red</option>
                                                    <option value='Orange'>Orange</option>
                                                    <option value='Yellow'>Yellow</option>
                                                    <option value='Cream'>Cream</option>
                                                    <option value='Fawn'>Fawn</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">2nd Coat
                                                    Color</InputLabel>
                                                <Select
                                                    value={secondCoatColor}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('secondCoatColor', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='Black'>Black</option>
                                                    <option value='Grey'>Grey</option>
                                                    <option value='White'>White</option>
                                                    <option value='Brown'>Brown</option>
                                                    <option value='Red'>Red</option>
                                                    <option value='Orange'>Orange</option>
                                                    <option value='Yellow'>Yellow</option>
                                                    <option value='Cream'>Cream</option>
                                                    <option value='Fawn'>Fawn</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">3rd Coat
                                                    Color</InputLabel>
                                                <Select
                                                    value={thirdCoatColor}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('thirdCoatColor', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='Black'>Black</option>
                                                    <option value='Grey'>Grey</option>
                                                    <option value='White'>White</option>
                                                    <option value='Brown'>Brown</option>
                                                    <option value='Red'>Red</option>
                                                    <option value='Orange'>Orange</option>
                                                    <option value='Yellow'>Yellow</option>
                                                    <option value='Cream'>Cream</option>
                                                    <option value='Fawn'>Fawn</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='width-80 ml-auto'>
                                    <div className="flex width-100">
                                        <div className='shadow-section flex flex-1 flex-col mr-16'>
                                            <div className={classes.formHistoryControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">1st Eye
                                                    Color</InputLabel>
                                                <Select
                                                    value={firstEyeColor}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('firstEyeColor', 'appearance')}
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

                                            <div className={classes.formHistoryControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">2nd Eye
                                                    Color</InputLabel>
                                                <Select
                                                    value={secondEyeColor}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('secondEyeColor', 'appearance')}
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
                                        </div>

                                        <div className='flex flex-col flex-1 shadow-section ml-16'>
                                            <div className={classes.formHistoryControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Ears</InputLabel>
                                                <Select
                                                    value={ears}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('ears', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='pointing'>Pointing</option>
                                                    <option value='cropped'>Cropped</option>
                                                    <option value='flapping'>Flapping</option>
                                                    <option value='round'>Round</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formHistoryControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Tail</InputLabel>
                                                <Select
                                                    value={tail}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('tail', 'appearance')}
                                                >
                                                    <option value=""/>
                                                    <option value='short'>Short</option>
                                                    <option value='long'>Long</option>
                                                    <option value='docked'>Docked</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel className="custom-label" htmlFor="name">Appearance
                                                Description</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                rows={3}
                                                disabled={openHelperAnimal}
                                                multiline={true}
                                                fullWidth={true}
                                                value={describeAppearance}
                                                onChange={this.handleChangeInput('describeAppearance', 'appearance')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 3 && <div className='tab4'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 shadow-section'>
                                    <div className='flex justify-around width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label"
                                                        htmlFor="age-simple">Obedience</InputLabel>
                                            <Select
                                                value={obedience}
                                                native
                                                disabled={openHelperAnimal}
                                                onChange={this.handleChangeInput('obedience', 'training')}
                                            >
                                                <option value=""/>
                                                <option value='none'>None</option>
                                                <option value='basic'>Basic</option>
                                                <option value='advanced'>Advanced</option>
                                                <option value='professional'>Professional</option>
                                            </Select>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">House
                                                trained</InputLabel>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={houseTrained}
                                                    disabled={openHelperAnimal}
                                                    checked={houseTrained}
                                                    onChange={this.handleChangeCheckboxBool('houseTrained', 'training')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex justify-around width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Crate
                                                trained</InputLabel>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={crateTrained}
                                                    disabled={openHelperAnimal}
                                                    checked={crateTrained}
                                                    onChange={this.handleChangeCheckboxBool('crateTrained', 'training')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Fence
                                                Needed</InputLabel>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={fenceRequired}
                                                    disabled={openHelperAnimal}
                                                    checked={fenceRequired}
                                                    onChange={this.handleChangeCheckboxBool('fenceRequired', 'training')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='width-100'>
                                <div className='width-80 shadow-section ml-auto'>
                                    <div className={classes.formHistoryControl}>
                                        <InputLabel className="custom-label" htmlFor="name">Training, Show or
                                            Competitions
                                            Description</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            fullWidth={true}
                                            multiline={true}
                                            disabled={openHelperAnimal}
                                            rows={3}
                                            value={describeTraining}
                                            onChange={this.handleChangeInput('describeTraining', 'training')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 4 && <div className='tab5'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 flex flex-col'>
                                    <div className='shadow-section'>
                                        <div className='flex justify-around width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Height</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="number"
                                                    disabled={openHelperAnimal}
                                                    inputProps={{
                                                        min: 0,
                                                        pattern: '[0-9]{0,5}'
                                                    }}
                                                    value={height}
                                                    onChange={this.handleChangeInput('height', 'health')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Length</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="number"
                                                    disabled={openHelperAnimal}
                                                    inputProps={{
                                                        min: 0,
                                                        pattern: '[0-9]{0,5}'
                                                    }}
                                                    value={length}
                                                    onChange={this.handleChangeInput('length', 'health')}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-around width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Weight</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="number"
                                                    disabled={openHelperAnimal}
                                                    inputProps={{
                                                        min: 0,
                                                        pattern: '[0-9]{0,5}'
                                                    }}
                                                    value={weight}
                                                    onChange={this.handleChangeInput('weight', 'health')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Weight
                                                    Condition</InputLabel>
                                                <Select
                                                    value={weightCondition}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('weightCondition', 'health')}
                                                >
                                                    <option value=""/>
                                                    <option value='normal'>Normal</option>
                                                    <option value='underweight'>Underweight</option>
                                                    <option value='overweight'>Overweight</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex shadow-section justify-around width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label"
                                                        htmlFor="age-simple">Sterilized</InputLabel>
                                            <Select
                                                value={sterilized}
                                                native
                                                disabled={openHelperAnimal}
                                                onChange={this.handleChangeInput('sterilized', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='spayed'>Spayed</option>
                                                <option value='neutered'>Neutered</option>
                                                <option value='no'>No</option>
                                            </Select>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Sterilization
                                                Date</InputLabel>
                                            <DatePicker
                                                showYearDropdown
                                                selected={sterilizedDate ? new Date(sterilizedDate) : ''}
                                                disabled={openHelperAnimal}
                                                onChange={this.handleChangeDatePicker('sterilizedDate', 'health')}
                                                className="date-filter"
                                                dateFormat="dd-MM-yyyy"
                                            />
                                        </div>
                                    </div>

                                    <div className="shadow-section width-100">
                                        <div className='flex justify-around width-100'>
                                            <div className={`${classes.formControl} items-center`}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Pregnant</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        value={pregnant}
                                                        disabled={openHelperAnimal}
                                                        checked={pregnant}
                                                        onChange={this.handleChangeCheckboxBool('pregnant')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                            <div className={`${classes.formControl} items-center`}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Injured</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={injured}
                                                        disabled={openHelperAnimal}
                                                        value={injured}
                                                        onChange={this.handleChangeCheckboxBool('injured', 'health')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className='flex justify-around width-100'>
                                            <div className={`${classes.formControl} items-center`}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Cryptorchid</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={cryptorchid}
                                                        disabled={openHelperAnimal}
                                                        value={cryptorchid}
                                                        onChange={this.handleChangeCheckboxBool('cryptorchid', 'health')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                            <div className={`${classes.formControl} items-center`}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Disabled</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={disabled}
                                                        disabled={openHelperAnimal}
                                                        value={disabled}
                                                        onChange={this.handleChangeCheckboxBool('disabled', 'health')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='width-100 flex justify-around shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Teeth</InputLabel>
                                            <Select
                                                value={teeth}
                                                disabled={openHelperAnimal}
                                                native
                                                onChange={this.handleChangeInput('teeth', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='clean'>Clean</option>
                                                <option value='tartar'>Tartar</option>
                                                <option value='rotten'>Rotten</option>
                                                <option value='abscess_or_sores'>Abscess/Sores</option>
                                                <option value='worn'>Worn</option>
                                                <option value='impacted'>Impacted</option>
                                                <option value='few_missing'>Few missing</option>
                                                <option value='none'>None</option>
                                            </Select>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Gums</InputLabel>
                                            <Select
                                                value={gums}
                                                disabled={openHelperAnimal}
                                                native
                                                onChange={this.handleChangeInput('gums', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='pink'>Pink</option>
                                                <option value='red'>Red</option>
                                                <option value='white'>White</option>
                                                <option value='abscess_or_sores'>Abscess/Sores</option>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Eye
                                                Sight</InputLabel>
                                            <Select
                                                value={eyesSight}
                                                disabled={openHelperAnimal}
                                                native
                                                onChange={this.handleChangeInput('eyesSight', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='clear'>Clear</option>
                                                <option value='discharge'>Discharge</option>
                                                <option value='cloudy'>Cloudy</option>
                                                <option value='injured'>Injured</option>
                                            </Select>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Blind</InputLabel>
                                            <Select
                                                value={blind}
                                                disabled={openHelperAnimal}
                                                native
                                                onChange={this.handleChangeInput('blind', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='yes'>Yes</option>
                                                <option value='no'>No</option>
                                                <option value='one_eye'>One eye</option>
                                            </Select>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel className="custom-label" htmlFor="age-simple">Deaf</InputLabel>
                                            <Select
                                                value={deaf}
                                                disabled={openHelperAnimal}
                                                native
                                                onChange={this.handleChangeInput('deaf', 'health')}
                                            >
                                                <option value=""/>
                                                <option value='yes'>Yes</option>
                                                <option value='no'>No</option>
                                                <option value='one_ear'>One ear</option>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='width-100 flex flex-col shadow-section'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel className="custom-label" htmlFor="name">Health
                                                Description</InputLabel>
                                            <TextField
                                                id="name"
                                                disabled={openHelperAnimal}
                                                type="text"
                                                style={{padding: '3px 0'}}
                                                rows={6}
                                                multiline={true}
                                                fullWidth
                                                value={describeHealth}
                                                onChange={this.handleChangeInput('describeHealth', 'health')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 5 && <div className='tab6'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>
                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 flex-col flex shadow-section'>
                                    {[0, 1, 2, 3, 4, 5].map(index => (
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Care
                                                    Type</InputLabel>
                                                <Select
                                                    value={careValues ? (careValues[index] ? careValues[index].careType : '') : ''}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInputCare('careType', index)}
                                                >
                                                    <option value=""/>
                                                    <option value='vaccination'>Vaccination</option>
                                                    <option value='medicine'>Medicine</option>
                                                    <option value='grooming'>Grooming</option>
                                                    <option value='boarding'>Boarding</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Care
                                                    Note</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    disabled={openHelperAnimal}
                                                    value={careValues ? (careValues[index] ? careValues[index].note : '') : ''}
                                                    onChange={this.handleChangeInputCare('note', index)}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Care
                                                    Date</InputLabel>

                                                <DatePicker
                                                    showYearDropdown
                                                    selected={careValues ? (careValues[index] ? (careValues[index].date ? new Date(careValues[index].date) : '') : '') : ''}
                                                    onChange={this.handleChangeDatePickerCare('date', index)}
                                                    className="date-filter"
                                                    disabled={openHelperAnimal}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 6 && <div className='tab7'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='flex flex-col width-80'>
                                    <div className='shadow-section width-100 flex'>
                                        <div className='flex justify-between width-20 mr-36'>
                                            <div className={classes.formHistoryControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Accommodation</InputLabel>
                                                <Select
                                                    value={accommodation}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('accommodation')}
                                                >
                                                    <option value=""/>
                                                    <option value='apartment'>Apartment</option>
                                                    <option value='townhouse'>Townhouse</option>
                                                    <option value='house'>House</option>
                                                    <option value='villa'>Villa</option>
                                                    <option value='farm'>Farm</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className='flex flex-col justify-between width-80 '>
                                            <div className='flex justify-around width-100'>
                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label"
                                                                htmlFor="age-simple">Adopted</InputLabel>
                                                    <Select
                                                        value={forAdoption}
                                                        disabled={openHelperAnimal}
                                                        native
                                                        onChange={this.handleChangeInput('forAdoption')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='to_be'>To Be</option>
                                                        <option value='hold'>Hold</option>
                                                    </Select>
                                                </div>

                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Adoption
                                                        Date</InputLabel>
                                                    <DatePicker
                                                        showYearDropdown
                                                        selected={adoptionDate ? new Date(adoptionDate) : ''}
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeDatePicker('adoptionDate')}
                                                        className="date-filter"
                                                        dateFormat="dd-MM-yyyy"
                                                    />

                                                </div>
                                            </div>

                                            <div className='flex justify-around width-100'>
                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label"
                                                                htmlFor="age-simple">Fostered</InputLabel>
                                                    <Select
                                                        value={forFoster}
                                                        disabled={openHelperAnimal}
                                                        native
                                                        onChange={this.handleChangeInput('forFoster')}
                                                    >
                                                        <option value=""/>
                                                        <option value='yes'>Yes</option>
                                                        <option value='no'>No</option>
                                                        <option value='to_be'>To Be</option>
                                                        <option value='hold'>Hold</option>
                                                    </Select>
                                                </div>

                                                <div className={classes.formControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Fostering
                                                        Date</InputLabel>
                                                    <DatePicker
                                                        showYearDropdown
                                                        selected={fosteringDate ? new Date(fosteringDate) : ''}
                                                        disabled={openHelperAnimal}
                                                        onChange={this.handleChangeDatePicker('fosteringDate')}
                                                        className="date-filter"
                                                        dateFormat="dd-MM-yyyy"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col width-100 shadow-section'>
                                        <div className='flex justify-around'>
                                            <div className={`${classes.formControl}`}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Entry
                                                    Reason</InputLabel>
                                                <Select
                                                    value={joinedReason}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('joinedReason')}
                                                >
                                                    <option value=""/>
                                                    <option value='stray'>Stray</option>
                                                    <option value='rescue'>Rescue</option>
                                                    <option value='transfer'>Transfer</option>
                                                    <option value='medical'>Medical</option>
                                                    <option value='temporary'>Temporary</option>
                                                    <option value='neglected'>Neglectance</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={`${classes.formControl}`}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Entry
                                                    Date</InputLabel>
                                                <DatePicker
                                                    showYearDropdown
                                                    selected={entryDate ? new Date(entryDate) : ''}
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeDatePicker('entryDate')}
                                                    className="date-filter"
                                                    dateFormat="dd-MM-yyyy"
                                                />

                                            </div>
                                        </div>

                                        <div className='flex justify-around'>
                                            <div className={`${classes.formControl}`}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Leave
                                                    Reason</InputLabel>
                                                <Select
                                                    value={leaveReason}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('leaveReason')}
                                                >
                                                    <option value=""/>
                                                    <option value='adoption'>Adoption</option>
                                                    <option value='foster'>Foster</option>
                                                    <option value='transfer'>Transfer</option>
                                                    <option value='medical'>Medical</option>
                                                    <option value='temporary'>Temporary</option>
                                                    <option value='death'>Death</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="age-simple">Leave
                                                    Date</InputLabel>
                                                <DatePicker
                                                    showYearDropdown
                                                    selected={leaveDate ? new Date(leaveDate) : ''}
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeDatePicker('leaveDate')}
                                                    className="date-filter"
                                                    dateFormat="dd-MM-yyyy"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel className="custom-label" htmlFor="name">Sheltering
                                                Background</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                disabled={openHelperAnimal}
                                                rows={3}
                                                multiline={true}
                                                fullWidth
                                                value={shelteringBackground}
                                                onChange={this.handleChangeInput('shelteringBackground')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 7 && <div className='tab8'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex flex-row justify-between flex-wrap'>
                                <div className='flex justify-between width-100'>
                                    <div className='drop-block width-20'>
                                        <Avatar className="w-96 h-96" alt="contact avatar"
                                                src={profileImageBase ? `data:image/jpeg;base64,${profileImageBase}` : 'assets/images/avatars/avatar.svg'}/>

                                        {!openHelperAnimal ?
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Choose images'
                                                onChange={this.onDropOwnerAvatar}
                                                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                            /> : ''}
                                    </div>

                                    <div className='width-80 flex flex-col shadow-section'>
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Group</InputLabel>
                                                <Select
                                                    value={ownerStatus}
                                                    disabled={openHelperAnimal}
                                                    native
                                                    onChange={this.handleChangeInput('ownerStatus', 'owners')}
                                                >
                                                    <option value=""/>
                                                    <option value='existing_owner'>Existing Owner</option>
                                                    <option value='previous_owner'>Previous Owner</option>
                                                    <option value='foster'>Foster</option>
                                                    <option value='adopter'>Adopter</option>
                                                    <option value='no_owner'>No Owner</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">First
                                                    Name </InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={firstName}
                                                    onChange={this.handleChangeInput('firstName', 'owners')}
                                                />
                                            </div>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Last
                                                    Name</InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={lastName}
                                                    onChange={this.handleChangeInput('lastName', 'owners')}
                                                />
                                            </div>
                                        </div>

                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Email</InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={email}
                                                    onChange={this.handleChangeInput('email', 'owners')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Phone</InputLabel>
                                                <PhoneInput
                                                    placeholder=""
                                                    value={phoneNumber}
                                                    disabled={openHelperAnimal}
                                                    onChange={(phoneNumber, e) => {
                                                        this.setState({
                                                            animal: {
                                                                ...this.state.animal,
                                                                owners: [{
                                                                    ...this.state.animal.owners[0],
                                                                    phoneNumber: formatPhoneNumberIntl(phoneNumber)
                                                                }]
                                                            }
                                                        })
                                                    }}
                                                />
                                            </div>


                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">City</InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={city}
                                                    onChange={this.handleChangeInput('city', 'owners')}
                                                />
                                            </div>
                                        </div>

                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">State</InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={state}
                                                    onChange={this.handleChangeInput('state', 'owners')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label" htmlFor="name">Zip
                                                    Code</InputLabel>
                                                <TextField
                                                    id="name"
                                                    disabled={openHelperAnimal}
                                                    type="text"
                                                    value={zipCode}
                                                    onChange={this.handleChangeInput('zipCode', 'owners')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel className="custom-label"
                                                            htmlFor="age-simple">Country</InputLabel>
                                                <Select
                                                    value={this.state.animal.owners[0] ? this.state.animal.owners[0].originCountry : ''}
                                                    native
                                                    disabled={openHelperAnimal}
                                                    onChange={this.handleChangeInput('originCountry', 'owners')}
                                                >
                                                    <option value=""/>
                                                    {countryList.map(item => (
                                                        <option value={item.id}>{item.title}</option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className='flex justify-between width-100'>
                                            <div style={{width: '63%'}}>
                                                <div className={classes.formHistoryControl}>
                                                    <InputLabel className="custom-label"
                                                                htmlFor="name">Address</InputLabel>
                                                    <TextField
                                                        id="name"
                                                        type="text"
                                                        disabled={openHelperAnimal}
                                                        value={address}
                                                        onChange={this.handleChangeInput('address', 'owners')}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{width: '25%'}}>
                                                <div className={classes.formHistoryControl}>
                                                    <InputLabel className="custom-label" htmlFor="age-simple">Owner
                                                        Registration</InputLabel>
                                                    <DatePicker
                                                        showYearDropdown
                                                        selected={registrationDate ? new Date(registrationDate) : ''}
                                                        onChange={this.handleChangeDatePicker('registrationDate', 'owners')}
                                                        className="date-filter"
                                                        disabled={openHelperAnimal}
                                                        dateFormat="dd-MM-yyyy"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='width-80 shadow-section ml-auto'>
                                    <div className={classes.formHistoryControl}>
                                        <InputLabel className="custom-label" htmlFor="name"> Comments</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            fullWidth={true}
                                            multiline={true}
                                            rows={5}
                                            disabled={openHelperAnimal}
                                            value={comment}
                                            onChange={this.handleChangeInput('comment', 'owners')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 8 && <div className='tab9'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={image ? `data:image/jpeg;base64,${image}` : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 flex flex-col shadow-section'>
                                    <InputLabel className="custom-label" htmlFor="age-simple"
                                                style={{margin: '0 auto'}}>Upload</InputLabel>

                                    <div className='width-100 flex flex-col justify-around upload-file-block'>
                                        <div className='drop-block flex flex-col'>
                                            {!openHelperAnimal ? <ImageUploader
                                                withIcon={true}
                                                buttonText='User ID'
                                                onChange={this.onDropUserId}
                                                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                            /> : ''}

                                            <div className='id-photo'>
                                                <img
                                                    src={profileIdImageBase ? `data:image/jpeg;base64,${profileIdImageBase}` : ''}
                                                    alt=""/>
                                            </div>
                                        </div>

                                        <div className='drop-block flex flex-col'>
                                            {!openHelperAnimal ? <ImageUploader
                                                withIcon={true}
                                                buttonText='Animal ID'
                                                onChange={this.onDropImageId}
                                                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                            /> : ''}

                                            <div className='id-photo'>
                                                <img src={imageId ? `data:image/jpeg;base64,${imageId}` : ''} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!openHelperAnimal ?
                                <DialogActions className='dialog-actions'>
                                    <Button onClick={onClose} color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                                    <Button type='submit' color="secondary" className={classes.button}
                                            disabled={disabledSave}>
                                        Save
                                    </Button>
                                </DialogActions> : ''}
                        </form>
                    </div>}
                </DialogContent>
            </Dialog>
        )
    }
}


export default withStyles(styles, {withTheme: true})(AnimalWindow);
