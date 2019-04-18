import React, {Component} from 'react';

import img1 from '../../../img/c1.jpg';
import img2 from '../../../img/c2.jpg';
import img3 from '../../../img/dg4.jpg';
import img4 from '../../../img/ct5.jpg';

class LP extends Component {
    state = {};

    render() {
        return (
            <div className='landing-page'>
                <section className="banner-area relative" id="home">
                    <div className="container">
                        <div className="overlay overlay-bg"></div>

                        <div className="row fullscreen d-flex align-items-center justify-content-start banner-content">
                            <div className="banner-content col-lg-8 col-md-12">
                                <h2 className="text-uppercase">ANIMALS NEED</h2>
                                <h1 className="text-uppercase">Your Help!</h1>
                                <p className="text-white sub-head">
                                    You can chip in with money & effort! Cats, Dogs and <br/> Even Raccoons Adopt Any
                                    Pet You Like!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

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

                <footer className="footer-area">
                    <div className="container">
                        <div className="row pt-120 pb-80 content">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer-widget">
                                    <h6>About Us</h6>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer-widget">
                                    <h6>Useful Links</h6>
                                </div>
                            </div>
                            <div className="col-lg-4  col-md-6">
                                <div className="single-footer-widget mail-chimp">
                                    <h6 className="mb-20">Contact Us</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-text">
                        <div className="container">
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

export default LP;