import React, {Component, Fragment} from 'react'
import {withStyles, Card, CardContent, Typography, Button, InputAdornment, Icon} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'app/auth/store/actions';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/auth/store/actions';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class ResetPassword extends Component {

    state = {
        canSubmit: false,
        tabValue: 0,

        newPass: false
    };


    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        const url_string = window.location.href;
        const id = new URL(url_string).searchParams.get("id");
        const token = new URL(url_string).searchParams.get("token");

        if (!this.state.newPass) {
            jwtService.resetPassword(model)
                .then((res) => {
                    console.log(res);
                    this.props.showMessage({
                        message: 'Email sent. Check your inbox.',
                        variant: 'success'
                    })
                })
        } else {
            jwtService.updatePassword(model, id, token)
                .then((res) => {
                    this.props.history.push('/login')
                })
        }
    };

    componentDidMount() {
        const url_string = window.location.href;
        const id = new URL(url_string).searchParams.get("id");
        const token = new URL(url_string).searchParams.get("token");
        if (id && token) {
            this.setState({newPass: true})
        }

    }


    render() {
        const {classes} = this.props;
        const {canSubmit, newPass} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 registration-page full-height")}>

                <div
                    className="background flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    {/*<FuseAnimate animation="transition.expandIn">*/}
                    {/*<img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>*/}
                    {/*</FuseAnimate>*/}

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h2" color="inherit" className="font-light welcome-title">
                            WELCOME TO Caniny
                        </Typography>
                    </FuseAnimate>

                    {/*<FuseAnimate delay={400}>*/}
                    {/*<Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel*/}
                    {/*convallis elit fermentum pellentesque. Sed mollis velit*/}
                    {/*facilisis facilisis.*/}
                    {/*</Typography>*/}
                    {/*</FuseAnimate>*/}
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                            <Typography variant="h6" className="text-center md:w-full mb-32">RESET PASSWORD</Typography>
                            <Formsy
                                onValidSubmit={this.onSubmit}
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full"
                            >
                                {!newPass ?
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

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="w-full mx-auto mt-16 normal-case"
                                            aria-label="LOG IN"
                                            disabled={!canSubmit}
                                            value="legacy"
                                        >
                                            Send
                                        </Button>
                                    </Fragment>
                                    :
                                    <Fragment>
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
                                            aria-label="LOG IN"
                                            disabled={!canSubmit}
                                            value="legacy"
                                        >
                                            Save
                                        </Button>

                                    </Fragment>
                                }

                            </Formsy>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium">Don't have an account?</span>
                                <Link className="font-medium" to="/registration">Create an account</Link>
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    }, dispatch);
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword)));
