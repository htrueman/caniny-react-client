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
import moment from 'moment';
import {countryList} from './countryList';

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
    species: 'dog',
    joinDate: moment(new Date()).format('YYYY-MM-DD'),
};

class AnimalWindow extends Component {
    state = {
        animal: {
            ...animalFields
        },

        dogBreeds: [],
        catBreeds: [],
        value: 0,
    };

    handleSaveAnimal = async (e) => {
        e.preventDefault();
        const {animal} = this.state;

        if (animal.id) {
            let newAnimal = {};

            for (let key in animal) {
                if (animal[key] && key !== 'id') {
                    newAnimal[key] = animal[key]
                }
            }
            newAnimal.image = animal.avatar;

            await animalsService.updateAnimal(newAnimal, animal.id)
        } else {
            await animalsService.createNewAnimal(
                this.state.animal
            );
        }

        this.setState({
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
        this.setState({value}, () => console.log(this.state));
    };

    onDrop = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    avatar: result,
                },
                uploadImg: true
            })
        });
    };
    onDropUserId = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    userId: result,
                },
                uploadImg: true
            })
        });
    };

    onDropAnimalId = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                animal: {
                    ...this.state.animal,
                    animalId: result,
                },
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.animal.id) {
            this.setState({animal: {...nextProps.animal}})
        } else {
            this.setState({animal: {...animalFields}})
        }
    }


    handleChangeInput = name => ({target: value}) => {
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
            this.setState({
                animal: {
                    ...this.state.animal,
                    [name]: value
                }
            });
        }
    };

    handleChangeCheckbox = name => ({target: {checked}}) => {
        this.setState({
            animal: {
                ...this.state.animal,
                [name]: checked
            }
        })
    };

    componentDidMount() {
        this.getAnimalsList()
    }

    render() {
        const {
                name,
                chipProducer,
                species,
                comments,
                breed,
                age,
                joinDate,
                accommodation,
                dateOfBirth,
                lifeStage,
                gender,
                speciesDetails,
                pregnant,
                personality,
                energyLevel,
                kidsFriendly,
                dogsFriendly,
                animalsFriendly,
                coatType,
                humansFriendly,
                chipId,
                bites,
                adoption,
                foster,
                tagId,
                history,
                avatar,
                height,
                length,
                weight,
                shelteringBackground,
                weightCondition,
                disabled,
                state,
                injured,
                cryptorchid,
                sterilized,
                sterilizedDate,
                eyesSight,
                blind,
                deaf,
                teeth,
                gums,
                describe_health,
                describeHealth,
                size,
                stCoatColor,
                ndCoatColor,
                rdCoatColor,
                city,
                stEyeСolor,
                ndEyeColor,
                ears,
                zipCode,
                tail,
                describe_appearance,
                //4
                obedienceChoices,
                houseTrained,
                crateTrained,
                fenceNeeded,
                describe_training,
                //5
                ownerStatus,
                owner_name,
                owner_last_name,
                email,
                phone,
                country,
                address,
                //9
                userId,
                animalId,

            } = this.state.animal,

            {
                value,
                dogBreeds,
                catBreeds
            } = this.state,

            {
                classes,
                onClose,
                open
            } = this.props;


        return (
            <Dialog
                open={open}
                maxWidth={false}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
                className="new-user-window animal-window"
            >
                <DialogTitle id="form-dialog-title">New animal</DialogTitle>

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

                                <div className='width-80 ml-auto'>
                                    <div className='shadow-section'>
                                        <div className='flex justify-between width-100'>
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
                                        </div>

                                        {/*---------------------------------------------------------------------*/}

                                        <div className='flex justify-between width-100'>
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
                                                    disabled={dateOfBirth}
                                                    inputProps={{
                                                        min: 0,
                                                        pattern: '[0-9]{0,5}'
                                                    }}
                                                    type="number"
                                                    value={age}
                                                    onChange={this.handleChangeInput('age')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Life Stage</InputLabel>
                                                <Select
                                                    value={lifeStage}
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
                                                <InputLabel htmlFor="age-simple">Species*</InputLabel>
                                                <Select
                                                    value={species}
                                                    required={true}
                                                    native
                                                    onChange={this.handleChangeInput('species')}
                                                >
                                                    <option value='dog'>Dogs</option>
                                                    <option value='cat'>Cats</option>
                                                    <option value='other'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Breed*</InputLabel>
                                                <Select
                                                    value={breed}
                                                    required
                                                    native
                                                    disabled={species === 'other'}
                                                    onChange={this.handleChangeInput('breed')}
                                                >
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
                                                <InputLabel htmlFor="age-simple">Species details</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    value={speciesDetails}
                                                    onChange={this.handleChangeInput('speciesDetails')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*---------------------------------------------------------------------*/}

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Join Date</InputLabel>
                                            <TextField
                                                id="Age"
                                                type="date"
                                                value={joinDate}
                                                disabled
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Origin Country</InputLabel>
                                            <Select
                                                // value={origin_country}
                                                required={true}
                                                native
                                                onChange={this.handleChangeInput('originCountry')}
                                            >
                                                {countryList.map(item => (
                                                    <option value={item.id}>{item.title}</option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    {/*---------------------------------------------------------------------*/}

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Tag ID</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={tagId}
                                                onChange={this.handleChangeInput('tagId')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Chip Producer</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={chipProducer}
                                                onChange={this.handleChangeInput('chipProducer')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Chip ID</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={chipId}
                                                onChange={this.handleChangeInput('chipId')}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
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
                                                src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                        <span className='mt-6'>{name || 'Name'}</span>
                                    </div>

                                    <div className='width-80'>
                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Temperament</InputLabel>
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
                                                <InputLabel htmlFor="age-simple">Bites</InputLabel>
                                                <label className="switch">
                                                    <input type="checkbox" value={bites}
                                                           onChange={this.handleChangeCheckbox('bites')}/>
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Energy Level</InputLabel>
                                                <Select
                                                    value={energyLevel}
                                                    native
                                                    onChange={this.handleChangeInput('energyLevel')}
                                                >
                                                    <option value=""/>
                                                    <option value='lazy'>1: Lazy</option>
                                                    <option value='chill'>2: Chill</option>
                                                    <option value='active'>3: Active</option>
                                                    <option value='energetic'>4: Energetic</option>
                                                    <option value='hyper'>5: Hyper</option>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="shadow-section">
                                            <div className='flex justify-between width-100'>
                                                <div className={classes.formControl}>
                                                    <InputLabel htmlFor="age-simple">Human Friendly</InputLabel>
                                                    <Select
                                                        value={humansFriendly}
                                                        native
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
                                                    <InputLabel htmlFor="age-simple">Kids Friendly</InputLabel>
                                                    <Select
                                                        value={kidsFriendly}
                                                        native
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
                                                    <InputLabel htmlFor="age-simple">Animals Friendly</InputLabel>
                                                    <Select
                                                        value={animalsFriendly}
                                                        native
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
                                                    <InputLabel htmlFor="age-simple">Dogs Friendly</InputLabel>
                                                    <Select
                                                        value={dogsFriendly}
                                                        native
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
                                                    <InputLabel htmlFor="age-simple">Cats Friendly</InputLabel>
                                                    <Select
                                                        value={kidsFriendly}
                                                        native
                                                        onChange={this.handleChangeInput('cats_friendly')}
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
                                        <InputLabel htmlFor="name">Personality Description</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            rows={3}
                                            multiline={true}
                                            fullWidth
                                            value={describe_health}
                                            onChange={this.handleChangeInput('describe_health')}
                                        />
                                    </div>
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
                                                src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                        <span className='mt-6'>{name || 'Name'}</span>
                                    </div>

                                    <div className='width-80'>
                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Coat Type</InputLabel>
                                                <Select
                                                    value={coatType}
                                                    native
                                                    onChange={this.handleChangeInput('coatType')}
                                                >
                                                    <option value=""/>
                                                    <option value='short'>Short</option>
                                                    <option value='medium'>Medium</option>
                                                    <option value='long'>Long</option>
                                                    <option value='hairless'>Hairless</option>
                                                </Select>
                                            </div>

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
                                        </div>

                                        <div className='flex justify-between width-100 shadow-section'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">1st Coat Color</InputLabel>
                                                <Select
                                                    value={stCoatColor}
                                                    native
                                                    onChange={this.handleChangeInput('stCoatColor')}
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
                                                    value={ndCoatColor}
                                                    native
                                                    onChange={this.handleChangeInput('ndCoatColor')}
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
                                                    value={rdCoatColor}
                                                    native
                                                    onChange={this.handleChangeInput('rdCoatColor')}
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
                                        </div>
                                    </div>
                                </div>

                                <div className='width-80 ml-auto'>
                                    <div className="flex width-100">
                                        <div className='shadow-section flex flex-1 flex-col mr-16'>
                                            <div className={classes.formHistoryControl}>
                                                <InputLabel htmlFor="age-simple">1st Eye Color</InputLabel>
                                                <Select
                                                    value={stEyeСolor}
                                                    native
                                                    onChange={this.handleChangeInput('stEyeСolor')}
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
                                                <InputLabel htmlFor="age-simple">2nd Eye Color</InputLabel>
                                                <Select
                                                    value={ndEyeColor}
                                                    native
                                                    onChange={this.handleChangeInput('ndEyeColor')}
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

                                            <div className={classes.formHistoryControl}>
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
                                        </div>
                                    </div>

                                    <div className='flex justify-between width-100 shadow-section'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel htmlFor="name">Appearance Description</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                rows={3}
                                                multiline={true}
                                                fullWidth={true}
                                                value={describe_appearance}
                                                onChange={this.handleChangeInput('describe_appearance')}
                                            />
                                        </div>
                                    </div>
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
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 3 && <div className='tab4'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 shadow-section'>
                                    <div className='flex justify-around width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Obedience</InputLabel>
                                            <Select
                                                value={obedienceChoices}
                                                native
                                                onChange={this.handleChangeInput('obedienceChoices')}
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
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={houseTrained}
                                                    onChange={this.handleChangeCheckbox('houseTrained')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex justify-around width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Crate trained</InputLabel>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={crateTrained}
                                                    onChange={this.handleChangeCheckbox('crateTrained')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Fence Needed</InputLabel>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    value={fenceNeeded}
                                                    onChange={this.handleChangeCheckbox('fenceNeeded')}
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
                                        <InputLabel htmlFor="name">Training, Show or Competitions
                                            Description</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            fullWidth={true}
                                            multiline={true}
                                            rows={3}
                                            value={describe_training}
                                            onChange={this.handleChangeInput('describe_training')}
                                        />
                                    </div>
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
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 4 && <div className='tab5'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block' style={{margin: '0 4.4rem 0 0'}}>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 shadow-section'>
                                    <div className='flex justify-between width-100'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Height</InputLabel>
                                            <TextField
                                                id="name"
                                                type="number"
                                                inputProps={{
                                                    min: 0,
                                                    pattern: '[0-9]{0,5}'
                                                }}
                                                value={height}
                                                onChange={this.handleChangeInput('height')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Length</InputLabel>
                                            <TextField
                                                id="name"
                                                type="number"
                                                inputProps={{
                                                    min: 0,
                                                    pattern: '[0-9]{0,5}'
                                                }}
                                                value={length}
                                                onChange={this.handleChangeInput('length')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Weight</InputLabel>
                                            <TextField
                                                id="name"
                                                type="number"
                                                inputProps={{
                                                    min: 0,
                                                    pattern: '[0-9]{0,5}'
                                                }}
                                                value={weight}
                                                onChange={this.handleChangeInput('weight')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <div className='width-20 flex flex-col mr-36 shadow-section'>
                                    <div className={classes.formHistoryControl}>
                                        <InputLabel htmlFor="age-simple">Cryptorchid</InputLabel>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                value={cryptorchid}
                                                onChange={this.handleChangeCheckbox('cryptorchid')}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    <div className={classes.formHistoryControl}>
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

                                    <div className={classes.formHistoryControl}>
                                        <InputLabel htmlFor="age-simple">Sterilization Date</InputLabel>
                                        <TextField
                                            id="date"
                                            onChange={this.handleChangeInput('sterilizedDate')}
                                            value={sterilizedDate}
                                            type="date"
                                        />
                                    </div>
                                </div>

                                <div className='width-80 '>
                                    <div className="shadow-section">
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Pregnant</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        value={pregnant}
                                                        onChange={this.handleChangeCheckbox('pregnant')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Disabled</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        value={disabled}
                                                        onChange={this.handleChangeCheckbox('disabled')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Weight Condition</InputLabel>
                                                <Select
                                                    value={weightCondition}
                                                    native
                                                    onChange={this.handleChangeInput('weightCondition')}
                                                >
                                                    <option value=""/>
                                                    <option value='normal'>Normal</option>
                                                    <option value='underweight'>Underweight</option>
                                                    <option value='overweight'>Overweight</option>
                                                </Select>
                                            </div>


                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Injured</InputLabel>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        value={injured}
                                                        onChange={this.handleChangeCheckbox('injured')}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between width-100 shadow-section'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Eye Sight</InputLabel>
                                            <Select
                                                value={eyesSight}
                                                native
                                                onChange={this.handleChangeInput('eyesSight')}
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
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <div className='width-20 flex flex-col justify-around mr-36 shadow-section'>
                                    <div className={classes.formHistoryControl}>
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

                                    <div className={classes.formHistoryControl}>
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
                                </div>

                                <div className='width-80 flex flex-col shadow-section'>
                                    <div className='width-100'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel htmlFor="name">Health Description</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                style={{padding: '3px 0'}}
                                                rows={6}
                                                multiline={true}
                                                fullWidth
                                                value={describeHealth}
                                                onChange={this.handleChangeInput('describeHealth')}
                                            />
                                        </div>
                                    </div>
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
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 5 && <div className='tab6'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 flex-col flex'>
                                    {[0, 1, 2, 3, 4, 5].map(index => (
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Care Type</InputLabel>
                                                <Select
                                                    // value={lifeStage[index]}
                                                    native
                                                    onChange={this.handleChangeInput('lifeStage')}
                                                >
                                                    <option value=""/>
                                                    <option value='baby'>Vaccination</option>
                                                    <option value='young'>Medicine</option>
                                                    <option value='adult'>Grooming</option>
                                                    <option value='senior'>Boarding</option>
                                                    <option value='senior'>Other</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="name">Care Note</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    // value={describe_health[index]}
                                                    onChange={this.handleChangeInput('describe_health')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Care Date</InputLabel>
                                                <TextField
                                                    id="date"
                                                    onChange={this.handleChangeInput('dateOfBirth')}
                                                    // value={dateOfBirth[index]}
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 6 && <div className='tab7'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='flex width-80'>
                                    <div className='flex justify-between width-20 mr-36'>
                                        <div className={classes.formHistoryControl}>
                                            <InputLabel htmlFor="age-simple">Accommodation</InputLabel>
                                            <Select
                                                value={accommodation}
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

                                    <div className='flex flex-col justify-between width-80 shadow-section'>
                                        <div className='flex justify-around width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Adopted</InputLabel>
                                                <Select
                                                    value={adoption}
                                                    native
                                                    onChange={this.handleChangeInput('adoption')}
                                                >
                                                    <option value=""/>
                                                    <option value='yes'>Yes</option>
                                                    <option value='no'>No</option>
                                                    <option value='no'>To Be</option>
                                                    <option value='hold'>Hold</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Adoption Date</InputLabel>
                                                <TextField
                                                    id="date"
                                                    onChange={this.handleChangeInput('dateOfBirth')}
                                                    value={dateOfBirth}
                                                    type="date"
                                                />
                                            </div>
                                        </div>

                                        <div className='flex justify-around width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Fostered</InputLabel>
                                                <Select
                                                    value={foster}
                                                    native
                                                    onChange={this.handleChangeInput('foster')}
                                                >
                                                    <option value=""/>
                                                    <option value='yes'>Yes</option>
                                                    <option value='no'>No</option>
                                                    <option value='to_be'>To Be</option>
                                                    <option value='hold'>Hold</option>
                                                </Select>
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Fostering Date</InputLabel>
                                                <TextField
                                                    id="date"
                                                    onChange={this.handleChangeInput('dateOfBirth')}
                                                    value={dateOfBirth}
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between width-100 shadow-section'>
                                <div className={`${classes.formControl} mr-36`}>
                                    <InputLabel htmlFor="age-simple">Entry Reason</InputLabel>
                                    <Select
                                        value={foster}
                                        native
                                        onChange={this.handleChangeInput('foster')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Stray</option>
                                        <option value='no'>Rescue</option>
                                        <option value='hold'>Transfer</option>
                                        <option value='hold'>Medical</option>
                                        <option value='hold'>Temporary</option>
                                        <option value='hold'>Neglectance</option>
                                        <option value='hold'>Other</option>
                                    </Select>
                                </div>

                                <div className={`${classes.formControl} mr-36`}>
                                    <InputLabel htmlFor="age-simple">Entry Date</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('dateOfBirth')}
                                        value={dateOfBirth}
                                        type="date"
                                    />
                                </div>

                                <div className={`${classes.formControl} mr-36`}>
                                    <InputLabel htmlFor="age-simple">Leave Reason </InputLabel>
                                    <Select
                                        value={foster}
                                        native
                                        onChange={this.handleChangeInput('foster')}
                                    >
                                        <option value=""/>
                                        <option value='yes'>Adoption</option>
                                        <option value='no'>Foster</option>
                                        <option value='hold'>Transfer</option>
                                        <option value='hold'>Medical</option>
                                        <option value='hold'>Temporary</option>
                                        <option value='hold'>Death</option>
                                        <option value='hold'>Other</option>
                                    </Select>
                                </div>

                                <div className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Leave Date</InputLabel>
                                    <TextField
                                        id="date"
                                        onChange={this.handleChangeInput('dateOfBirth')}
                                        value={dateOfBirth}
                                        type="date"
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between width-100 shadow-section'>
                                <div className={classes.formHistoryControl}>
                                    <InputLabel htmlFor="name">Sheltering Background</InputLabel>
                                    <TextField
                                        id="name"
                                        type="text"
                                        rows={3}
                                        multiline={true}
                                        fullWidth
                                        value={shelteringBackground}
                                        onChange={this.handleChangeInput('shelteringBackground')}
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

                                    <div className='width-80 flex flex-col shadow-section'>
                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Group</InputLabel>
                                                <Select
                                                    value={ownerStatus}
                                                    native
                                                    onChange={this.handleChangeInput('ownerStatus')}
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
                                                <InputLabel htmlFor="name">First Name </InputLabel>
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
                                        </div>

                                        <div className='flex justify-between width-100'>
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
                                                <InputLabel htmlFor="name">City</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    value={city}
                                                    onChange={this.handleChangeInput('city')}
                                                />
                                            </div>
                                        </div>

                                        <div className='flex justify-between width-100'>
                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="name">State</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    value={state}
                                                    onChange={this.handleChangeInput('state')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="name">Zip Code</InputLabel>
                                                <TextField
                                                    id="name"
                                                    type="text"
                                                    value={zipCode}
                                                    onChange={this.handleChangeInput('zipCode')}
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">Country</InputLabel>
                                                <Select
                                                    value={country}
                                                    required={true}
                                                    native
                                                    onChange={this.handleChangeInput('country')}
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
                                                    <InputLabel htmlFor="name">Address</InputLabel>
                                                    <TextField
                                                        id="name"
                                                        type="text"
                                                        value={address}
                                                        onChange={this.handleChangeInput('address')}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{width: '25%'}}>
                                                <div className={classes.formHistoryControl}>
                                                    <InputLabel htmlFor="age-simple">Registration Date</InputLabel>
                                                    <TextField
                                                        id="date"
                                                        onChange={this.handleChangeInput('dateOfBirth')}
                                                        value={dateOfBirth}
                                                        type="date"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='width-80 shadow-section ml-auto'>
                                    <div className={classes.formHistoryControl}>
                                        <InputLabel htmlFor="name"> Comments</InputLabel>
                                        <TextField
                                            id="name"
                                            type="text"
                                            fullWidth={true}
                                            multiline={true}
                                            rows={5}
                                            value={comments}
                                            onChange={this.handleChangeInput('comments')}
                                        />
                                    </div>
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
                    </div>}

                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}
                    {/*----------------------------------------------------------------------------------------*/}

                    {value === 8 && <div className='tab9'>
                        <form className={classes.root} autoComplete="off" onSubmit={this.handleSaveAnimal}>
                            <div className='flex justify-between width-100'>
                                <div className='drop-block'>
                                    <Avatar className="w-96 h-96" alt="contact avatar"
                                            src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                    <span className='mt-6'>{name || 'Name'}</span>
                                </div>

                                <div className='width-80 flex flex-col'>
                                    <h4 className='width-100 flex justify-center'>Upload</h4>

                                    <div className='width-100 flex justify-around'>
                                        <div className='drop-block flex flex-col'>
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='User ID'
                                                onChange={this.onDropUserId}
                                                imgExtension={['.jpg', '.gif', '.png']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                            />

                                            <img src={userId} alt="" className='id-photo'/>
                                        </div>

                                        <div className='drop-block flex flex-col'>
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Animal ID'
                                                onChange={this.onDropAnimalId}
                                                imgExtension={['.jpg', '.gif', '.png']}
                                                maxFileSize={5242880}
                                                singleImage={true}
                                            />

                                            <img src={animalId} alt="" className='id-photo'/>
                                        </div>
                                    </div>
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
                    </div>}
                </DialogContent>
            </Dialog>
        )
    }
}


export default withStyles(styles, {withTheme: true})(AnimalWindow);
