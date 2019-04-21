import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Icon from '@material-ui/core/Icon';
import UsersList from './UsersList';


const styles = theme => ({
    layoutRoot: {}
});

class Users extends Component {

    render() {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24 size-container header-users-page">
                        <h4><Icon>account_box</Icon>Users </h4>

                        <div className='search-block'>
                            <Icon>search</Icon>
                            <input type="text" placeholder='Search for anything'/>
                        </div>
                    </div>
                }
                contentToolbar={
                    <div className="toolbar-users-page">
                        <h4>Filters</h4>
                    </div>
                }
                content={
                    <div className="p-24">
                        <UsersList />
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Users);