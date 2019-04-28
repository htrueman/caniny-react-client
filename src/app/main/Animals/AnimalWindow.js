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

import animalsService from 'app/services/animalsService';

const styles = theme => ({
    layoutRoot: {}
});


class AnimalWindow extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: '',
    };

    handleSaveAnimal = async () => {
        const {firstName, lastName, email, phoneNumber, userType} = this.state;

        if (this.state.id) {
            await animalsService.updateAnimal({
                firstName,
                lastName,
                email,
                phoneNumber,
                userType
            }, this.state.id);
        } else {
            await animalsService.createNewAnimal(this.state);
        }

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            userType: '',
        });

        this.props.onClose();
    };

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.user.id) {
    //         this.setState({...nextProps.user})
    //     }
    // }


    handleChangeInput = name => event => {
        this.setState({[name]: event.target.value});
    };


    render() {
        const {
                firstName,
                lastName,
                email,
                phoneNumber,
                userType,
            } = this.state,

            {
                classes,
                onClose,
                open
            } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
                className="new-user-window"
            >
                <DialogTitle id="form-dialog-title">New animal</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off">
                        <TextField
                            id="firstName"
                            label="Name"
                            type="text"
                            // value={firstName}
                            // onChange={this.handleChangeInput('firstName')}
                            fullWidth
                        />
                        <TextField
                            id="lastName"
                            label="Species"
                            type="text"
                            // value={lastName}
                            // onChange={this.handleChangeInput('lastName')}
                            fullWidth
                        />

                        <TextField
                            id="email"
                            label="Breed"
                            type="text"
                            // value={email}
                            // onChange={this.handleChangeInput('email')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Age"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Size"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Social"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Accommodation"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Tag"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                        <TextField
                            id="phone"
                            label="Microchip"
                            type="text"
                            // value={phoneNumber}
                            // onChange={this.handleChangeInput('phoneNumber')}
                            fullWidth
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
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


export default withStyles(styles, {withTheme: true})(AnimalWindow);
