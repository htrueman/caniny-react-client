import React, {Component, Fragment} from 'react'
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    Icon
} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import * as Actions from 'app/auth/store/actions';

import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button} from '@material-ui/core';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

const organizations = [
    {
        id: 1,
        name: 'Test1'
    },
    {
        id: 2,
        name: 'Test2'
    },
    {
        id: 3,
        name: 'Test3'
    },
]


class Register extends Component {
    state = {
        tabValue: 0,
        canSubmit: false,

        step: 0,
        selectOrganization: ''
    };

    onSubmit = () => {
        this.setState({
            step: this.state.selectOrganization === 'new' ? 1 : 2
        })
        // this.props.registerWithFirebase(model);
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    setOrganization = (e) => {
        console.log(e.target.value);
        this.setState({selectOrganization: e.target.value});
    };

    renderForm = () => {
        if (this.state.step === 0) {
            return (
                <Fragment>
                    <FormControl className="flex w-full sm:w-320" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder">
                            Organization
                        </InputLabel>
                        <Select
                            value={this.state.selectOrganization}
                            onChange={this.setOrganization}
                            input={
                                <OutlinedInput
                                    labelWidth={("Organization".length * 9)}
                                    name="organization"
                                    id="category-label-placeholder"
                                />
                            }
                        >
                            <MenuItem value="new">
                                <em>New organization</em>
                            </MenuItem>

                            {organizations.map(category => (
                                <MenuItem
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER WITH FIREBASE"
                    >
                        Check Availability
                    </Button>
                </Fragment>
            )
        } else if (this.state.step === 1) {
            return (
                <Fragment>
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
                        name="password"
                        label="Password"
                        validations="equalsField:password-confirm"
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
                        name="password-confirm"
                        label="Confirm Password"
                        validations="equalsField:password"
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
                <Fragment>
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="name"
                        label="Name"
                        validations="isName"
                        validationErrors={{
                            isEmail: 'Please enter a name'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">user</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

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
                        type="text"
                        name="description"
                        label="Description"
                        validations="isEmail"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                               color="action">email</Icon></InputAdornment>
                        }}
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
                </Fragment>
            )
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
        const {step, canSubmit, selectOrganization} = this.state;


        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to the K9 Digital!
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="md:w-full mb-32">CREATE AN ACCOUNT</Typography>

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
        registerWithFirebase: Actions.registerWithFirebase
    }, dispatch);
}

function mapStateToProps({auth}) {
    return {
        login: auth.login,
        user: auth.user
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Register)));
