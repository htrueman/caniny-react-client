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
import {FormControlLabel, Checkbox} from '@material-ui/core';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {formatPhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input'

import jwtService from 'app/services/jwtService';

const styles = theme => ({
    layoutRoot: {}
});


class UserWindow extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: '',
        description: '',
        isActive: true,
        isActiveOn: false
    };

    handleSaveUser = async () => {
        const {firstName, lastName, email, phoneNumber, userType, isActiveOn, isActive} = this.state;

        if (this.state.id) {
            await jwtService.updateUser({
                firstName,
                lastName,
                email,
                phoneNumber,
                userType,
                isActive: isActiveOn ? isActiveOn : isActive
            }, this.state.id)
        } else {
            await jwtService.createNewUser(this.state);
        }

        this.handleCloseWindow();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.setState({...nextProps.user})
        }
    }


    handleChangeInput = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleCloseWindow = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            userType: '',
            description: '',
            isActive: true
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
                isActive
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
                <DialogTitle id="form-dialog-title">New user</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off">
                        <TextField
                            id="firstName"
                            label="First Name"
                            type="text"
                            value={firstName}
                            onChange={this.handleChangeInput('firstName')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            type="text"
                            value={lastName}
                            onChange={this.handleChangeInput('lastName')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={this.handleChangeInput('email')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}>Phone</InputLabel>
                        <PhoneInput
                            placeholder=""
                            value={phoneNumber}
                            onChange={(phoneNumber, e) => {
                                this.setState({phoneNumber: formatPhoneNumberIntl(phoneNumber)})
                            }}/>


                        {/*<FormControl className={classes.formControl} fullWidth>*/}
                        <InputLabel htmlFor="age-simple" style={{fontWeight: '100'}}>Group</InputLabel>
                        <Select
                            value={userType}
                            onChange={this.handleChangeInput('userType')}
                            fullWidth
                        >
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='helper'>Assistant</MenuItem>
                        </Select>
                        {/*</FormControl>*/}

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
