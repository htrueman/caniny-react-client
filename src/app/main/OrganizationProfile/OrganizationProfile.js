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
import {NotificationManager} from "react-notifications";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from "axios";

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
    django_admin: 'Django adm in'
};

class OrganizationProfile extends Component {
    state = {
        uploadImg: false,
        openRemove: false,

        scheduleMonday: '',
        scheduleTuesday: '',
        scheduleWednesday: '',
        scheduleThursday: '',
        scheduleFriday: '',
        scheduleSaturday: '',
        scheduleSunday: '',
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
        NotificationManager.success('Information Saved');

        this.setState({
            uploadImg: false
        })
    };

    onDrop = async (file) => {
        this.getBase64(file[file.length - 1], (result) => {
            this.setState({
                logoImage: result,
                uploadImg: true
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

    handleRemoveUser = () => {
        organizationService.removeOrgProfile();
        window.scroll(0, 0);
        sessionStorage.removeItem('token');
        delete axios.defaults.headers.common["Authorization"];
        this.props.history.push('/');
    };

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
                phoneNumber,
                openRemove,

                scheduleMonday,
                scheduleTuesday,
                scheduleWednesday,
                scheduleThursday,
                scheduleFriday,
                scheduleSaturday,
                scheduleSunday,
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

                                    {user.userType === 'super_admin' ?
                                        <button className='save-btn' onClick={this.handleUpdateUser}>Save</button> : ''}
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
                                                disabled={user.userType !== 'super_admin'}
                                                value={name}
                                                onChange={this.handleChangeInput('name')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="name">Email address</InputLabel>
                                            <TextField
                                                id="name"
                                                type="text"
                                                disabled={user.userType !== 'super_admin'}
                                                value={email}
                                                onChange={this.handleChangeInput('email')}
                                            />
                                        </div>

                                        <div className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple" className="custom-label">Phone</InputLabel>
                                            <PhoneInput
                                                placeholder=""
                                                value={phoneNumber}
                                                disabled={user.userType !== 'super_admin'}
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
                                                disabled={user.userType !== 'super_admin'}
                                                onChange={this.handleChangeInput('address')}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="user-avatar">
                                <Avatar className="photo" alt="contact avatar"
                                        src={logoImage ? logoImage : 'assets/images/avatars/avatar.svg'}/>

                                {user.userType === 'super_admin' ?
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png']}
                                        maxFileSize={5242880}
                                        singleImage={true}
                                    />
                                    : ''
                                }

                                <div className='name'
                                     style={{color: '#32ADFF'}}>{this.state.firstName ? this.state.firstName : (name ? name : 'Organization')}</div>

                                <div className="opening-block">
                                    <h3>Opening Hours</h3>

                                    <div>
                                        <span>Monday</span>
                                        <input
                                            type="text"
                                            value={scheduleMonday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleMonday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Tuesday</span>
                                        <input
                                            type="text"
                                            value={scheduleTuesday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleTuesday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Wednesday</span>
                                        <input
                                            type="text"
                                            value={scheduleWednesday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleWednesday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Thursday</span>
                                        <input
                                            type="text"
                                            value={scheduleThursday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleThursday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Friday</span>
                                        <input
                                            type="text"
                                            value={scheduleFriday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleFriday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Saturday</span>
                                        <input
                                            type="text"
                                            value={scheduleSaturday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleSaturday')}
                                        />
                                    </div>
                                    <div>
                                        <span>Sunday</span>
                                        <input
                                            type="text"
                                            value={scheduleSunday}
                                            disabled={user.userType !== 'super_admin'}
                                            onChange={this.handleChangeInput('scheduleSunday')}
                                        />
                                    </div>
                                </div>

                                {user.userType === 'super_admin' ? <button className='delete-account-btn'
                                                                           onClick={() => this.setState({openRemove: true})}>Delete
                                        Organization
                                    </button>
                                    : ''}
                            </div>
                        </div>
                    }
                />

                <Dialog
                    open={openRemove}
                    onClose={() => this.setState({openRemove: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Are you sure you want to delete your organization?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleRemoveUser} style={{color: '#33ADFF'}} autoFocus>
                            Yes
                        </Button>

                        <Button style={{color: '#b61423'}}
                                onClick={() => this.setState({openRemove: false})} color="primary">
                            No
                        </Button>

                    </DialogActions>
                </Dialog>

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


