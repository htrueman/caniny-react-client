import React, {Component, Fragment} from 'react'
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    InputAdornment,
    Icon,
} from '@material-ui/core';

import {darken, showMessage} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import * as Actions from 'app/auth/store/actions';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button} from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import googleIcon from '../../../img/search.svg';
import googleIcon2 from '../../../img/search2.svg';
import facebookIcon from '../../../img/facebook.svg';
import facebookIcon2 from '../../../img/facebook2.svg';
import instagramIcon from '../../../img/instagram.svg';
import instagramIcon2 from '../../../img/instagram2.svg';


const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

const users = [
    {
        nickname: 'crazyfrog',
        email: 'frog@foobar.com'
    },
    {
        nickname: 'tatanka',
        email: 'ttt@hotmail.com'
    },
    {
        nickname: 'wild',
        email: 'www@mail.ru'
    },
    {
        nickname: 'race car',
        email: 'racing@gmail.com'
    },
    {
        nickname: 'cook',
        email: 'cooking@yahoo.com'
    },
];


class Register extends Component {
    state = {
        tabValue: 0,
        canSubmit: false,

        step: 1,
        organizations: [],
        selectOrganization: 'new',

        nicknameValue: '',
        nicknameSuggestions: [],
        newOrganization: true
    };


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        const arr = this.state.organizations.filter(item => regex.test(item.name));

        arr.forEach(item => {
            if (item.name.toLowerCase() === value.toLowerCase()) {
                this.setState({
                    newOrganization: false
                })
            } else {
                this.setState({
                    newOrganization: true
                })

            }
        });

        return arr;
    };


    onSubmit = async (user) => {
        if (this.props.match.params.type !== 'new') {
            this.props.RegisterInOrganization({
                email: user.email,
                firstName: user.name,
                description: user.description,
                organization: this.props.match.params.id
            })
                .then((res) => {
                    if (res.type === 'REGISTER_SUCCESS') {
                        this.props.showMessage({
                            message: 'Your request has\n' +
                            'been sent to the\n' +
                            'administrator',
                            variant: 'success'
                        });
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 1000)
                    } else {
                        for (let key in res.payload.data) {
                            console.log(res.payload.data[key]);
                            this.props.showMessage({
                                message: res.payload.data[key][0],
                                variant: 'error'
                            })
                        }
                    }
                })
        } else {
            this.props.Register({
                ...user,
                organizationDict: {
                    name: this.props.match.params.id
                }
            })
                .then((res) => {
                    if (res.type === 'REGISTER_SUCCESS') {
                        this.props.showMessage({
                            message: 'Email sent. Check your inbox.',
                            variant: 'success'
                        })
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 1000)
                    } else {
                        for (let key in res.payload.data) {
                            this.props.showMessage({
                                message: res.payload.data[key][0],
                                variant: 'error'
                            })
                        }
                    }
                })
        }
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

//-----------------------------------------------------------------------

    responseGoogle = res => {
        const user = {
            googleKey: res.tokenObj.login_hint,
            email: res.profileObj.email,
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            // imageUrl: res.profileObj.imageUrl,
        };

        this.props.googleRegister(user, 'google')
    };

    responseFacebook = res => {
        const url_string = window.location.href;
        const code = new URL(url_string).searchParams.get("code");
        if (!code) {
            const user = {
                facebookKey: res.accessToken,
                email: res.email,
                firstName: res.name ? res.name.split(" ")[0] : '',
                lastName: res.name ? res.name.split(" ")[1] : '',
                // imageUrl: res.picture.data.url,
            };

            this.props.facebookRegister(user, 'facebook')
        }
    };

    responseInstagram = res => {
        this.props.instagramRegister({
            token: res
        }, 'instagram')
    };

    componentWillMount() {
        if (this.props.match.params.type !== 'new') {

            this.setState({
                step: 2
            })
        }
    }

    renderForm = () => {
        if (this.state.step === 1) {
            return (
                <Fragment>
                    <Typography variant="h6" className="md:w-full mb-8">SIGN UP</Typography>

                    <div className='social-login'>
                        <GoogleLogin
                            clientId="901607497184-hacbsio74tfqtub0cmn3karb4jrhpmgk.apps.googleusercontent.com"
                            // buttonText=""
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <div className='icon-block'>
                                    <img onClick={renderProps.onClick} src={googleIcon} alt=""
                                         className='social-icon default'/>
                                    <img onClick={renderProps.onClick} src={googleIcon2} alt=""
                                         className='social-icon hover'/>
                                </div>
                            )}
                        />

                        <FacebookLogin
                            appId="409332796524821"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            render={renderProps => (
                                <div className='icon-block'>
                                    <img onClick={renderProps.onClick} src={facebookIcon} alt=""
                                         className='social-icon default'/>
                                    <img onClick={renderProps.onClick} src={facebookIcon2} alt=""
                                         className='social-icon hover'/>
                                </div>
                            )}
                        />

                        <InstagramLogin
                            clientId="f3348e7068014838b57204b555950e39"
                            // buttonText=""
                            onSuccess={this.responseInstagram}
                            onFailure={this.responseInstagram}
                        >
                            <div className='icon-block'>
                                <img src={instagramIcon} alt="" className='social-icon default'/>
                                <img src={instagramIcon2} alt="" className='social-icon hover'/>
                            </div>
                        </InstagramLogin>
                    </div>

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="email"
                        label="Email"
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'Please enter a valid email'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password1"
                        label="Password"
                        validations="equalsField:password2"
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password2"
                        label="Confirm Password"
                        validations="equalsField:password1"
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER WITH FIREBASE"
                        disabled={!this.state.canSubmit}
                    >
                        Sign Up
                    </Button>
                </Fragment>
            )
        } else if (this.state.step === 2) {
            return (
                <div className='mt-32 w-full'>
                    <Typography variant="h6" className="md:w-full mb-32">REQUEST AN ACCOUNT</Typography>

                    <TextFieldFormsy
                        className="mb-16 w-full"
                        type="text"
                        name="name"
                        label="Name"
                        validationErrors={{
                            isEmail: 'Please enter a name'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">perm_identity</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16 w-full"
                        type="text"
                        name="email"
                        label="Email"
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'Please enter a valid email'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16 w-full"
                        type="text"
                        rows={7}
                        multiline={true}
                        name="description"
                        label="Tell us about yourself (Optional)"
                        variant="outlined"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER WITH FIREBASE"
                        disabled={!this.state.canSubmit}
                    >
                        Request
                    </Button>
                </div>
            )
        }
    };

    async componentDidMount() {
        const url_string = window.location.href;
        const code = new URL(url_string).searchParams.get("code");

        // if(code) {
        //    const res = await axios.get('https://api.instagram.com/oauth/access_token?client_id=f3348e7068014838b57204b555950e39&redirect_uri=http://localhost:3000/registration&code=d02ba2b17fc84921958f1079253fde96');
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.login.error && (this.props.login.error.displayName || this.props.login.error.password || this.props.login.error.email)) {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        if (this.props.user.role !== 'guest') {
            const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
            this.props.history.push({
                pathname
            });
        }
        return null;
    }


    render() {
        const {classes} = this.props;
        const {step, canSubmit, selectOrganization} = this.state;

        return (
            <div
                className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 registration-page full-height")}>
                <div
                    className="background flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <div className='welcome-title'>
                            <h2 className="text-uppercase">WELCOME TO</h2>
                            <h1 className="text-uppercase">Caniny</h1>
                        </div>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>
                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                            <Formsy
                                onValidSubmit={this.onSubmit}
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full"
                            >
                                {this.renderForm()}
                            </Formsy>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <span className="font-medium">Already have an account?</span>
                                <Link className="font-medium" to="/login">Login</Link>
                            </div>

                            <div className="flex flex-col items-center">
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        Register: Actions.Register,
        RegisterInOrganization: Actions.RegisterInOrganization,
        googleRegister: Actions.googleRegister,
        facebookRegister: Actions.facebookRegister,
        instagramRegister: Actions.instagramRegister,
        showMessage: Actions.showMessage,
    }, dispatch);
}

function mapStateToProps({auth}) {
    return {
        login: auth.login,
        user: auth.user
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Register)));
