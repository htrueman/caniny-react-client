import React, {Component, Fragment} from 'react'
import {withStyles, Card, CardContent, Typography, Button, InputAdornment, Icon} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import jwtService from 'app/services/jwtService';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class ActivateAccount extends Component {

    state = {
        canSubmit: false,
        tabValue: 0,

        newPass: false
    };


    form = React.createRef();

    // onSubmit = (model) => {
    //     console.log(model);
    //     const url_string = window.location.href;
    //     const id = new URL(url_string).searchParams.get("id");
    //     const token = new URL(url_string).searchParams.get("token");
    //
    //     if (!this.state.newPass) {
    //         jwtService.resetPassword(model);
    //     } else {
    //         jwtService.updatePassword(model, id, token)
    //             .then(() => {
    //                 this.props.history.push('/login')
    //             })
    //     }
    // };

    componentDidMount() {
        const url_string = window.location.href;
        const token = new URL(url_string).searchParams.get("token");
        const id = new URL(url_string).searchParams.get("token");

        jwtService.activate(id, token);
    }


    render() {
        const {classes} = this.props;
        const {canSubmit, newPass} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>
                <div
                    className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-center md:flex-no-shrink md:flex-1 md:text-center">

                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to the Caniny!
                    </Typography>

                    <Link to='/login'>Login </Link>
                </div>

            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(ActivateAccount));
