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
import organizationService from 'app/services/organizationService';
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

class OrganizationProfile extends Component {
    state = {
        uploadImg: false
    };

    handleChangeInput = (name) => ({target: {value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleUpdateUser = async () => {
        let organization = {};

        for (let key in this.state) {
            if (this.state[key]) {
                organization[key] = this.state[key]
            }
        }

        if (!this.state.uploadImg) delete organization.logoImage;

        await organizationService.updateOrganization(organization);
        await this.props.setUserData();
        await this.props.setOrganizationData();

        this.setState({
            uploadImg: false
        })
    };

    onDrop = async (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                logoImage: result,
                uploadImg: true
            }, () => this.handleUpdateUser());
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

    componentDidMount() {
        organizationService.getOrganizationInfo()
            .then(res => {
                this.setState(res)
            })
    }

    render() {
        const {classes, user} = this.props,
            {
                name,
                email,
                address,
                logoImage,
                phoneNumber
            } = this.state;


        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page profile-header">
                            <h4>Hello {this.state.firstName ? this.state.firstName : (user.firstName ? user.firstName : 'User')}</h4>
                        </div>
                    }
                    content={
                        <div className='user-profile-page'>
                            <div className="profile-form">
                                <div className="general-title">
                                    Organization Profile

                                    <button className='save-btn' onClick={this.handleUpdateUser}>Save</button>
                                </div>

                                <section className='first-section'>
                                    <div className="section-title">
                                        ORGANIZATION INFORMATION
                                    </div>

                                    <div className='flex justify-between flex-wrap ml-36'>
                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Name</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={this.handleChangeInput('name')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Email address</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                value={email}
                                                onChange={this.handleChangeInput('email')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple" className="custom-label">Phone</InputLabel>
                                            <PhoneInput
                                                placeholder=""
                                                value={phoneNumber}
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
                                                value={address}
                                                onChange={this.handleChangeInput('address')}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="user-avatar">
                                <Avatar className="photo" alt="contact avatar"
                                        src={logoImage ? logoImage : 'assets/images/avatars/avatar.svg'}/>

                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                />

                                <div className='name'
                                     style={{color: '#32ADFF'}}>{this.state.firstName ? this.state.firstName : (name ? name : 'Organization')}</div>

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
        setUserData: Actions.setUserData,
        setOrganizationData: Actions.setOrganizationData,
    }, dispatch);
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationProfile)));


