import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography, Button, InputAdornment, Icon} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Formsy from 'formsy-react';


const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class Login extends Component {

    state = {
        canSubmit: false,
        tabValue: 0

    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };


    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitLogin(model);
    };

    // componentDidUpdate(prevProps, prevState)
    // {
    //     if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
    //     {
    //         this.form.updateInputsWithError({
    //             ...this.props.login.error
    //         });
    //
    //         this.props.login.error = null;
    //         this.disableButton();
    //     }
    //
    //     return null;
    // }


    render() {
        const {classes} = this.props;
        const {tabValue, canSubmit} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    {/*<FuseAnimate animation="transition.expandIn">*/}
                    {/*<img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>*/}
                    {/*</FuseAnimate>*/}

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to the Caniny!
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

                            <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR
                                ACCOUNT</Typography>

                            <Formsy
                                onValidSubmit={this.onSubmit}
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full"
                            >
                                <TextFieldFormsy
                                    className="mb-16"
                                    type="text"
                                    name="organization"
                                    label="Organization"
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                                           color="action">account_balance</Icon></InputAdornment>
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <TextFieldFormsy
                                    className="mb-16"
                                    type="text"
                                    name="email"
                                    label="Email"
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
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
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
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
                                    Login
                                </Button>

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

export default withStyles(styles, {withTheme: true})(withRouter(Login));
