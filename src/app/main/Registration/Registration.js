import React, {Component, Fragment} from 'react'
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    FormControl,
} from '@material-ui/core';
import Autosuggest from 'react-autosuggest';

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
import axios from 'axios';


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
        canSubmit: false,

        organizations: [],
        selectOrganization: 'new',

        nicknameValue: '',
        nicknameSuggestions: [],
        newOrganization: true
    };

    onSubmit = (user) => {
        const {nicknameValue, newOrganization, selectOrganization} = this.state;

        this.props.history.push(`/registration/${newOrganization ? 'new/' + nicknameValue : 'request/' + selectOrganization.id}`)
    };

    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        const arr = this.state.organizations.filter(item => regex.test(item.name));

        if (arr.length === 0) {
            this.setState({
                newOrganization: true
            })
        } else {
            arr.forEach(item => {
                console.log(item.name.toLowerCase() === value.toLowerCase())

                if (item.name.toLowerCase() === value.toLowerCase()) {
                    this.setState({
                        newOrganization: false,
                        selectOrganization: item
                    })
                } else {
                    this.setState({
                        newOrganization: true
                    })

                }
            });
        }
        return arr;
    };

    getSuggestionNickname = (suggestion) => {
        return suggestion.name;
    };

    renderSuggestion = (suggestion) => {
        return (
            <span style={{color: '#000000'}}>{suggestion.name}</span>
        )
    };

    onNicknameChange = (event, {newValue}) => {
        this.setState({
            nicknameValue: newValue
        });
    };

    onNicknameSuggestionsFetchRequested = ({value}) => {
        this.setState({
            nicknameSuggestions: this.getSuggestions(value)
        });
    };

    onNicknameSuggestionsClearRequested = () => {
        this.setState({
            nicknameSuggestions: []
        });
    };

    onNicknameSuggestionSelected = (event, {suggestion}) => {
        this.setState({
            selectOrganization: suggestion,
            newOrganization: false
        });
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

//-----------------------------------------------------------------------

    async componentDidMount() {
        const url_string = window.location.href;
        const code = new URL(url_string).searchParams.get("code");

        const res = await
            axios.get('http://165.22.152.38:8000/api/v1/organizations/');

        this.setState({
            organizations: res.data
        })

        if (this.props.match.params.organization) {
            console.log('run')
        }
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

        const {
            nicknameValue,
            nicknameSuggestions,
            newOrganization
        } = this.state;

        const nicknameInputProps = {
            placeholder: "Organization Name",
            value: nicknameValue,
            onChange: this.onNicknameChange
        };


        return (
            <div
                className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 registration-page full-height")}>
                <div
                    className="background flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-center">
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
                            <Typography variant="h6" className="md:w-full">CREATE AN ACCOUNT</Typography>

                            <Formsy
                                onValidSubmit={this.onSubmit}
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full"
                            >
                                <Fragment>
                                    <FormControl className="flex w-full mt-32 autocom" variant="outlined">
                                        <label htmlFor="org-label">
                                            Organization
                                        </label>

                                        <Autosuggest
                                            suggestions={nicknameSuggestions}
                                            onSuggestionsFetchRequested={this.onNicknameSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onNicknameSuggestionsClearRequested}
                                            onSuggestionSelected={this.onNicknameSuggestionSelected}
                                            getSuggestionValue={this.getSuggestionNickname}
                                            renderSuggestion={this.renderSuggestion}
                                            inputProps={nicknameInputProps}
                                        />
                                    </FormControl>

                                    {nicknameValue.length > 0 ? (newOrganization ?
                                            <span className='organization-status'>
                                                The name is available. You can
                                                register your organization
                                             </span>
                                            :
                                            <span className='organization-status'>
                                                 The name exists. You can request an
                                                 account from the organization Admin
                                            </span>
                                    ) : ''}


                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 normal-case"
                                        disabled={nicknameValue.length > 0 ? !newOrganization : true}
                                    >
                                        Register
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 normal-case"
                                        disabled={newOrganization}
                                    >
                                        Request Account
                                    </Button>
                                </Fragment>

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
    }, dispatch);
}

function mapStateToProps({auth}) {
    return {
        login: auth.login,
        user: auth.user
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Register)));
