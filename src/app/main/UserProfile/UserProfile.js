import React, {Component, Fragment} from 'react';
import {FusePageSimple} from '@fuse';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import {Avatar} from "@material-ui/core";
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import jwtService from 'app/services/jwtService';
import {formatPhoneNumberIntl} from "react-phone-number-input";
import PhoneInput from 'react-phone-number-input'
import * as Actions from 'app/auth/store/actions';
import ImageUploader from 'react-images-upload';

const styles = theme => ({
    layoutRoot: {},
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        margin: '20px 0'
    },
    formControlAddress: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '20px 0'
    },
});


const userTypes = {
    helper: 'Assistance',
    admin: 'Staff',
    super_admin: 'Admin',
    django_admin: 'Django admin'
};

class UserProfile extends Component {
    state = {};

    handleChangeInput = (name) => ({target: {value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleUpdateUser = async () => {
        await this.props.updateUserData(this.state);
    };

    onDrop = async (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                avatar: result,
            });

            this.props.updateUserData({
                avatar: result
            });
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

    onResetPass = async (pass) => {
        jwtService.resetPassword({
            pass
        });
        console.log(pass);
    };

    // getUserInfo = () => {
    //     this.setState(this.props.user)
    // };
    //
    // componentDidMount() {
    //     this.getUserInfo();
    // }
    //
    // componentWillReceiveProps() {
    //     this.getUserInfo();
    // }

    render() {
        const {classes} = this.props,
            {
                firstName,
                lastName,
                email,
                address,

                avatar,
                userType,
                phoneNumber
            } = this.props.user;


        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page profile-header">
                            <h4>Hello {this.state.firstName ? this.state.firstName : (firstName ? firstName : 'User')}</h4>
                        </div>
                    }
                    content={
                        <div className='user-profile-page'>
                            <div className="profile-form">
                                <div className="general-title">
                                    User Profile

                                    <button className='save-btn' onClick={this.handleUpdateUser}>Save</button>
                                </div>

                                <section className='first-section'>
                                    <div className="section-title">
                                        USER INFORMATION
                                    </div>

                                    <div className='flex justify-between flex-wrap ml-36'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">First name</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={this.state.firstName ? this.state.firstName : firstName}
                                                onChange={this.handleChangeInput('firstName')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Last name</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={this.state.lastName ? this.state.lastName : lastName}
                                                onChange={this.handleChangeInput('lastName')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Email address</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={this.state.email ? this.state.email : email}
                                                onChange={this.handleChangeInput('email')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple" className="custom-label">Phone</InputLabel>
                                            <PhoneInput
                                                placeholder=""
                                                value={this.state.phoneNumber ? this.state.phoneNumber : phoneNumber}
                                                onChange={(phoneNumber, e) => {
                                                    this.setState({phoneNumber: formatPhoneNumberIntl(phoneNumber)})
                                                }}/>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="section-title">
                                        CONTACT INFORMATION
                                    </div>

                                    <div className='flex justify-between flex-row flex-wrap ml-36'>
                                        <div className={classes.formControlAddress}>
                                            <InputLabel htmlFor="name">Address</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={this.state.address ? this.state.address : address}
                                                onChange={this.handleChangeInput('address')}
                                            />
                                        </div>

                                        {/*<div className={classes.formControl}>*/}
                                        {/*<InputLabel htmlFor="name">City</InputLabel>*/}
                                        {/*<TextField*/}
                                        {/*id="name"*/}
                                        {/*type="text"*/}
                                        {/*value={city}*/}
                                        {/*onChange={this.handleChangeInput('city')}*/}
                                        {/*/>*/}
                                        {/*</div>*/}

                                        {/*<div className={classes.formControl}>*/}
                                        {/*<InputLabel htmlFor="name">Country</InputLabel>*/}
                                        {/*<TextField*/}
                                        {/*id="name"*/}
                                        {/*type="text"*/}
                                        {/*value={country}*/}
                                        {/*onChange={this.handleChangeInput('country')}*/}
                                        {/*/>*/}
                                        {/*</div>*/}
                                    </div>
                                </section>

                                <div className="general-title">
                                    Password Reset

                                </div>

                                <Formsy
                                    onValidSubmit={this.onResetPass}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                    ref={(form) => this.form = form}
                                    className="flex flex-col justify-center reset-block ml-36"
                                >
                                    <TextFieldFormsy
                                        className="mb-16"
                                        type="text"
                                        name="currentPassword"
                                        autocomplete={false}
                                        label="Current Password"
                                        // validations="equalsField:password2"
                                        // validationErrors={{
                                        //     equalsField: 'Passwords do not match'
                                        // }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextFieldFormsy
                                        className="mb-16"
                                        type="password"
                                        autocomplete={false}
                                        name="password1"
                                        label="New Password"
                                        validations="equalsField:password2"
                                        validationErrors={{
                                            equalsField: 'Passwords do not match'
                                        }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextFieldFormsy
                                        className="mb-16"
                                        type="password"
                                        autocomplete={false}
                                        name="password2"
                                        label="Confirm Password"
                                        validations="equalsField:password1"
                                        validationErrors={{
                                            equalsField: 'Passwords do not match'
                                        }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <button className='save-btn reset-btn'>Reset</button>
                                </Formsy>
                            </div>

                            <div className="user-avatar">
                                <Avatar className="photo" alt="contact avatar"
                                        src={avatar ? avatar : 'assets/images/avatars/avatar.svg'}/>

                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                />

                                <div
                                    className='name'>{this.state.firstName ? this.state.firstName : (firstName ? firstName : 'User')} {this.state.lastName ? this.state.lastName : lastName}</div>
                                <div className='role'>{userTypes[userType]}</div>

                            </div>
                        </div>
                    }
                />
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
    return bindActionCreators({
        updateUserData: Actions.updateUserData
    }, dispatch);
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile)));


