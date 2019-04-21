import React, {Component} from 'react';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    Button,
    InputAdornment,
    Icon,
    FormControl,
    FormControlLabel, Checkbox
} from '@material-ui/core';

import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';

import Formsy from 'formsy-react';
import GoogleLogin from 'react-google-login';
import InstagramLogin from 'react-instagram-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {Link, withRouter} from 'react-router-dom';
import * as authActions from 'app/auth/store/actions';

import googleIcon from '../../../img/search.svg';
import googleIcon2 from '../../../img/search2.svg';
import facebookIcon from '../../../img/facebook.svg';
import facebookIcon2 from '../../../img/facebook2.svg';
import instagramIcon from '../../../img/instagram.svg';
import instagramIcon2 from '../../../img/instagram2.svg';

import video from '../../../img/video/CaninyIntro1.mp4';
import img1 from '../../../img/c1.jpg';
import img2 from '../../../img/c2.jpg';
import img3 from '../../../img/dg4.jpg';
import img4 from '../../../img/ct5.jpg';
import imgAbout from '../../../img/home-about.jpg';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {darken} from "@material-ui/core/styles/colorManipulator";


const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

let interval = '';

class LP extends Component {
    state = {canSubmit: false};
    myRef = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };


    onSubmit = (model) => {
        console.log(model);
        this.props.defaultLogin(model);
    };

    componentDidMount() {
        document.querySelector('.login-link').classList.add("active");

        // interval = setInterval(() => {
        //     this.refs.player.load();
        // }, 12000)
    }

    componentWillUnmount() {
        clearInterval(interval)
    }

    render() {
        const {canSubmit} = this.state;

        return (
            <div className='landing-page'>
                <div className='login-form'>
                    <CardContent className="flex flex-col items-center justify-center">

                        <Typography variant="h6" className="text-center md:w-full">LOGIN TO YOUR
                            ACCOUNT</Typography>

                        <Formsy
                            onValidSubmit={this.onSubmit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            ref={(form) => this.form = form}
                            className="flex flex-col justify-center w-full"
                        >

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


                            {/*<TextFieldFormsy*/}
                            {/*className="mb-16"*/}
                            {/*type="text"*/}
                            {/*name="organization"*/}
                            {/*label="Organization"*/}
                            {/*validations={{*/}
                            {/*minLength: 4*/}
                            {/*}}*/}
                            {/*validationErrors={{*/}
                            {/*minLength: 'Min character length is 4'*/}
                            {/*}}*/}
                            {/*InputProps={{*/}
                            {/*endAdornment: <InputAdornment position="end"><Icon className="text-20"*/}
                            {/*color="action">account_balance</Icon></InputAdornment>*/}
                            {/*}}*/}
                            {/*variant="outlined"*/}
                            {/*/>*/}

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

                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember"
                                            // checked={remember}
                                            onChange={this.handleChange}/>
                                    }
                                    label="Remember Me"
                                />
                            </FormControl>

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
                            <Link className="font-medium" to="/registration">Create an account</Link>
                            <div className='mt-16' onClick={() => document.querySelector('.login-link').classList.remove("active")}>
                                <Link className="font-medium" to="/reset_password">Reset password</Link>
                            </div>
                        </div>
                    </CardContent>
                </div>

                <section className="banner-area relative" id="home">
                    <div className="container">
                        <div className="overlay overlay-bg">
                            {/*<Player*/}
                                {/*autoPlay={true}*/}
                                {/*ref="player"*/}
                                {/*fluid={false}*/}
                                {/*muted*/}
                                {/*height='130%'*/}
                                {/*playsInline*/}
                                {/*poster="/assets/poster.png"*/}
                                {/*src={video}*/}
                            {/*/>*/}

                            <video loop={true} preload={true} autoPlay={true} muted height='auto' width='100%'>
                                <source src={video} />
                            </video>

                            <div className='overlay-bg2'></div>
                        </div>

                        <div className="row fullscreen d-flex align-items-center justify-content-start banner-content">
                            <div className="banner-content ">
                                <div className='testBaner'>
                                    <h2 className="text-uppercase">WELCOME TO</h2>
                                    <h1 className="text-uppercase">Caniny</h1>
                                    <p className="text-white sub-head">
                                        We seek to enhance the animal’s lives by <br/>
                                        organizing and managing their information
                                    </p>

                                    <h3>FREE SIGN UP</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about size-container" id="about">
                    <div className='about-description'>
                        <h2>ABOUT US</h2>

                        <p>
                            Caniny is an initiative done by volunteers who care about
                            animal’s lives and wellbeing.
                        </p>

                        <p>
                            The application provides animal rescuers, shelters, vets,
                            governments or any animal related services an easy to use
                            database to enter, search, retrieve and manage the animal’s
                            information.
                        </p>

                        <p>
                            Caniny is an evolving initiative and is intended to grow
                            bigger in the future by sharing more services, while
                            enriching the animal’s quality of life.
                        </p>

                        <p>
                            Caniny shares the following values:
                        </p>

                        <p>
                            <span>
                                “Animals are put in the centrum and should be treated with respect”
                            </span>
                        </p>
                        <p>
                            <span>
                                “Every animal deserves a better chance in life”
                            </span>
                        </p>
                        <p>
                            <span>
                                “No animal should be left behind”
                            </span>
                        </p>
                    </div>

                    <div className='image'>
                        <img src={imgAbout} alt=""/>
                    </div>

                </section>

                <section className="animals size-container" id="home">
                    <div className='images'>
                        <div>
                            <img src={img1} alt=""/>
                        </div>
                        <div>
                            <img src={img2} alt=""/>
                        </div>
                        <div>
                            <img src={img3} alt=""/>
                        </div>
                        <div>
                            <img src={img4} alt=""/>
                        </div>
                    </div>
                </section>


                <footer className="footer-area">
                    {/*<div className="container">*/}
                    {/*<div className="row pt-120 pb-80 content">*/}
                    {/*<div className="col-lg-4 col-md-6">*/}
                    {/*<div className="single-footer-widget">*/}
                    {/*<h6>About Us</h6>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-lg-4 col-md-6">*/}
                    {/*<div className="single-footer-widget">*/}
                    {/*<h6>Useful Links</h6>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-lg-4  col-md-6">*/}
                    {/*<div className="single-footer-widget mail-chimp">*/}
                    {/*<h6 className="mb-20">Contact Us</h6>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="copyright-text">
                        <div className="container flex-row justify-center">
                            <div className="row footer-bottom d-flex justify-content-between">
                                <p className="col-lg-8 col-sm-6 footer-text m-0 text-white">
                                    &copy; 2019 Nexu
                                    All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}


const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        defaultLogin: authActions.defaultLogin,
        googleLogin: authActions.googleLogin,
        facebookLogin: authActions.facebookLogin,
        instagramLogin: authActions.instagramLogin,
    }, dispatch);
};

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LP)));

