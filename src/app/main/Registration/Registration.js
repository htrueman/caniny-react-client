import React, {Component, Fragment} from 'react'
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    FormControl, FormControlLabel, Checkbox, Dialog, DialogTitle, DialogActions,
} from '@material-ui/core';

import Autosuggest from 'react-autosuggest';

import {darken, showMessage} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
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


class Register extends Component {
    state = {
        canSubmit: false,

        organizations: [],
        selectOrganization: 'new',

        nicknameValue: '',
        nicknameSuggestions: [],
        newOrganization: true,

        openDialog: false
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
            axios.get('https://api.caniny.com/api/v1/organizations/');

        this.setState({
            organizations: res.data
        })

        if (this.props.match.params.organization) {
            console.log('run')
        }
    };

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
    };


    render() {
        const {classes} = this.props;

        const {
            nicknameValue,
            nicknameSuggestions,
            newOrganization,
            openDialog
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

                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="remember"
                                                    required={true}
                                                    // checked={remember}
                                                    onChange={this.handleChange}/>
                                            }
                                            label={<span>I accept and agree to the <span className="terms-link" onClick={() => this.setState({openDialog: true})}>Terms of Use</span></span>}
                                        />
                                    </FormControl>

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

                <Dialog
                    open={openDialog}
                    onClose={() => this.setState({openDialog: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Terms of Service"}</DialogTitle>


                    <div className='terms-dialog'>
                        <p>

                            Caniny is cloud based software provided as available and as-is, which means that users don’t own
                            the content nor services intellectual property rights. Users can upload and edit their own
                            content, which give them ownership of any intellectual property rights that they hold in that
                            content. At any given time, users have the right to delete their content. On the other hand,
                            Caniny reserves the right to terminate the service without further notice, if Caniny senses that
                            the users are misusing or violating the provided service.
                        </p>

                        <p>
                            Caniny provides its own services to the users based on a reasonable level of care. Having stated
                            that, Caniny has its own reservation on what promises to commit to the users. Neither Caniny or
                            any of its partners aim to share any specific commitments or promises about the provided or
                            future services. That means that Caniny doesn’t aim to give any commitments about the provided
                            services, the content within the services, the features of the services nor their reliability,
                            availability or ability to meet the user’s expectations or needs. Even if that occurs, any
                            commitments or promises are subject for change without further notice. That means that the
                            services presented by Caniny are provided as available and as-is. Some jurisdictions provide for
                            certain warranties, like the implied warranty of merchantability, fitness for purpose and
                            non-infringement. To the extent permitted by law, Caniny exclude all warranties.
                        </p>

                        <p>
                            When permitted by law, Caniny or any of its partners will not be responsible for any profits
                            lost, revenue lost, data misuse or lost, financial losses or indirect, special, consequential,
                            exemplary, or punitive damages. To the extent permitted by law, the total liability of Caniny
                            and its partners, for any claims under these terms, including for any implied warranties, is
                            limited to the amount that the user has paid to use the services, or if Caniny chooses to supply
                            the users the services again. In all cases, Caniny and its partners, will not be liable for any
                            loss or damage of any kind, and which is not reasonably foreseeable.
                        </p>

                        <p>
                            Caniny has the right to modify or add these terms at any given time, which can be a necessity in
                            some cases to reflect any changes to the law or the provided services. Users are therefore
                            required to check and be updated on these terms on a regular basis. Caniny might be applying
                            changes to the terms, services or features without further notice. As an example, changes that
                            are required for legal reasons will be taking place immediately to ensure compliance. However,
                            if for any reason a conflict occurs between these terms and additional terms, the additional
                            terms will control for that conflict. Users who disagree with the modified terms or services are
                            encouraged to discontinue using the provided services. The presented terms control the
                            relationship between Caniny and the users. They do not create any third-party beneficiary
                            rights. If users do not comply with these terms, and Caniny doesn’t act right away, this doesn’t
                            mean that Caniny is giving up any rights that it may have, as an example act in the future. If
                            it turns out that a term is not enforceable, this will not affect any other terms.
                        </p>
                    </div>

                    <DialogActions>
                        {/*<Button onClick={this.handleRemoveAnimals} style={{color: '#33ADFF'}} autoFocus>*/}
                            {/*Yes*/}
                        {/*</Button>*/}

                        <Button style={{color: '#33ADFF'}}
                                onClick={() => this.setState({openDialog: false})} color="primary">
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>

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
