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
import Select from '@material-ui/core/Select';
import {withStyles} from "@material-ui/core/styles/index";
import {FormControlLabel, Checkbox, Avatar} from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {formatPhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input'
import jwtService from 'app/services/jwtService';
import moment from 'moment';

const styles = theme => ({
    layoutRoot: {}
});


class UserWindow extends Component {
    state = {
        firstName: '',
        lastName: '',
        avatar: '',
        email: '',
        phoneNumber: '',
        userType: 'helper',
        description: '',
        joinDate: moment(new Date()).format('DD-MM-YYYY'),
        isActive: true,
        isActiveOn: false,
        uploadImg: false
    };

    handleSaveUser = async () => {
        const {firstName, lastName, email, avatar, phoneNumber, userType, isActiveOn, isActive, joinDate, uploadImg} = this.state;

        if (this.state.id) {
            if (uploadImg) {
                await jwtService.updateUser({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    userType,
                    avatar,
                    isActive: isActiveOn ? isActiveOn : isActive,
                }, this.state.id)
            } else {
                await jwtService.updateUser({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    userType,
                    isActive: isActiveOn ? isActiveOn : isActive,
                }, this.state.id)
            }
        } else {
            if (avatar) {
                await jwtService.createNewUser({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    userType,
                    isActive,
                    avatar,
                    joinDate: moment(joinDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
                })
            } else {
                await jwtService.createNewUser({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    userType,
                    isActive,
                    joinDate: moment(joinDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
                })
            }
        }

        this.handleCloseWindow();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.setState({...nextProps.user})
        }
    }

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


    handleChangeInput = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleCloseWindow = () => {
        this.setState({
            id: null,
            avatar: null,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            userType: 'helper',
            description: '',
            joinDate: moment(new Date()).format('DD-MM-YYYY'),
            isActive: true,
            uploadImg: false
        });

        this.props.onClose();
    };


    render() {
        const {
                firstName,
                lastName,
                email,
                phoneNumber,
                userType,
                description,
                isActive,
                avatar,
                joinDate,

            } = this.state,

            {
                classes,
                open
            } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.handleCloseWindow}
                aria-labelledby="form-dialog-title"
                className="new-user-window"
            >
                <DialogTitle id="form-dialog-title">{this.state.id ? 'Edit' : 'New user'}</DialogTitle>

                <DialogContent>
                    <form className={classes.root} autoComplete="off">
                        <div className='flex'>
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

                            <div className='flex flex-col justify-around'>
                                <div>
                                    <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}
                                                className="custom-label">First Name</InputLabel>
                                    <TextField
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={this.handleChangeInput('firstName')}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}
                                                className="custom-label">Last Name</InputLabel>
                                    <TextField
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={this.handleChangeInput('lastName')}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}} className="custom-label">Email
                            Address</InputLabel>
                        <TextField
                            id="email"
                            type="email"
                            value={email}
                            onChange={this.handleChangeInput('email')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}
                                    className="custom-label">Phone</InputLabel>
                        <PhoneInput
                            placeholder=""
                            value={phoneNumber}
                            onChange={(phoneNumber, e) => {
                                this.setState({phoneNumber: formatPhoneNumberIntl(phoneNumber)})
                            }}/>

                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}} className="custom-label">Join
                            Date</InputLabel>
                        <TextField
                            id="date"
                            type="text"
                            value={joinDate}
                            disabled
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}>Group</InputLabel>
                        <Select
                            value={userType}
                            onChange={this.handleChangeInput('userType')}
                            fullWidth
                        >
                            <MenuItem value='helper'>Assistance</MenuItem>
                            <MenuItem value='admin'>Staff</MenuItem>
                            <MenuItem value='super_admin'>Admin</MenuItem>
                        </Select>

                        {!isActive && this.state.id ?
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember"
                                            onChange={() => this.setState({isActiveOn: true})}/>
                                    }
                                    label="Activate this user"
                                />
                            </FormControl> : ''
                        }


                        {description ? <FormControl className={classes.formControl} fullWidth>
                                <span htmlFor="age-simple" style={{color: 'rgba(0, 0, 0, 0.54)'}}>Description</span>
                                {description}
                            </FormControl>
                            : ''}
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleCloseWindow} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSaveUser} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}


export default withStyles(styles, {withTheme: true})(UserWindow);
