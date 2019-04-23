import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import AnimalsList from './AnimalsList';
import jwtService from 'app/services/jwtService';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    layoutRoot: {}
});

class Animals extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getUsers = async () => {
        const res = await jwtService.getUsers();
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot
                    }}
                    header={
                        <div className="p-24 size-container header-users-page">
                            <h4><Icon>pets</Icon>Animals </h4>

                            <div className='search-block'>
                                <Icon>search</Icon>
                                <input type="text" placeholder='Search for anything'/>
                            </div>
                        </div>
                    }
                    contentToolbar={
                        <div className="toolbar-users-page">
                            {/*<h4>Filters</h4>*/}
                        </div>
                    }
                    content={
                        <div className="p-24">
                            <AnimalsList
                                onAddUser={this.handleClickOpen}
                            />
                        </div>
                    }
                />

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New user</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="First Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Last Name"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Phone"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }
}

export default withStyles(styles, {withTheme: true})(Animals);