import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/PersonAdd';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';

let counter = 0;
//
// function createData(firstName, lastName, email, phoneNumber, userType) {
//     counter += 1;
//     return {id: counter, firstName, lastName, email, phoneNumber, userType};
// }

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`,
            },
        },
    };
}


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
        position: 'absolute',
        fontSize: 6,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
        backgroundColor: theme.palette.common.black,
    },
    bootstrapPlacementLeft: {
        margin: '0 8px',
    },
    bootstrapPlacementRight: {
        margin: '0 8px',
    },
    bootstrapPlacementTop: {
        margin: '8px 0',
    },
    bootstrapPlacementBottom: {
        margin: '8px 0',
    },
    htmlPopper: arrowGenerator('#dadde9'),
    htmlTooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        '& b': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
});


const rows = [
    {id: 'avatar', numeric: false, disablePadding: true, label: 'Photo'},
    {id: 'firstName', numeric: false, disablePadding: true, label: 'First Name'},
    {id: 'lastName', numeric: true, disablePadding: false, label: 'Last Name'},
    {id: 'email', numeric: true, disablePadding: false, label: 'Email'},
    {id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone'},
    {id: 'userType', numeric: true, disablePadding: false, label: 'Group'},
];

class EnhancedTableHead extends React.Component {
    state = {
        arrowRef: null,
    };
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    createSortHandler = property => event => {
        if(property !== 'avatar') this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {/*<Checkbox*/}
                        {/*indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                        {/*checked={numSelected === rowCount}*/}
                        {/*onChange={onSelectAllClick}*/}
                        {/*/>*/}
                    </TableCell>

                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'center' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={row.id ===  'avatar' ? order : false}
                            >
                                <Tooltip
                                    title={row.label === 'Group' || row.label === 'Photo' ? '' : 'Sort'}
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}

                                        {row.label === 'Group' ?
                                            <Tooltip
                                                classes={{
                                                    popper: classes.htmlPopper,
                                                    tooltip: classes.htmlTooltip,
                                                }}
                                                PopperProps={{
                                                    popperOptions: {
                                                        modifiers: {
                                                            arrow: {
                                                                enabled: Boolean(this.state.arrowRef),
                                                                element: this.state.arrowRef,
                                                            },
                                                        },
                                                    },
                                                }}
                                                title={
                                                    <React.Fragment>
                                                        <Typography color="inherit"><u>Super Admin</u>: Full permissions</Typography>
                                                        <Typography color="inherit"><u>Admin</u>: Edit permissions</Typography>
                                                        <Typography color="inherit"><u>Assistant</u>: View permissions</Typography>
                                                        {/*<em>{"And here's"}</em> <b>{'some'}</b>*/}
                                                        {/*<u>{'amazing content'}</u>.{' '}*/}
                                                        {/*{"It's very engaging. Right?"}*/}
                                                        <span className={classes.arrow} ref={this.handleArrowRef}/>
                                                    </React.Fragment>
                                                }
                                            >
                                                <Icon className='exclamation-icon'>priority_high</Icon>
                                            </Tooltip>
                                            : ''}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead = withStyles(toolbarStyles)(EnhancedTableHead);


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

let EnhancedTableToolbar = props => {
    const {numSelected, classes, open} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Users
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon className='jss2113'/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add user">
                        <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={open}>
                            <PlusIcon/>
                        </Fab>
                    </Tooltip>

                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onAddUser: PropTypes.object,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: this.props.data,
        page: 0,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        console.log(page);
        this.setState({page});

        this.props.onChangePagination(event, page)
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, onAddUser, onEdit, onRemove} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const types = {
            helper: 'Assistant',
            admin: 'Admin',
            super_admin: 'Super admin',
            django_admin: 'Django admin'
        };

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} open={onAddUser}/>


                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(this.props.data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            style={{background: !n.isActive ? '#ffbebe' : ''}}
                                        >
                                            <TableCell padding="checkbox">
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                <div className='img-block-in-table'>
                                                    <div className="img">
                                                        <img src={n.avatar ? n.avatar : 'assets/images/avatars/avatar.svg'} alt=""/>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                    {n.firstName}
                                            </TableCell>

                                            <TableCell align="center">
                                                {n.lastName}
                                            </TableCell>

                                            <TableCell align="center">
                                                {n.email}
                                            </TableCell>

                                            <TableCell align="center">
                                                {n.phoneNumber}
                                            </TableCell>

                                            <TableCell align="center">
                                                {types[n.userType]}
                                            </TableCell>

                                            <TableCell align="right">
                                                <div className='user-actions'>
                                                    <Icon onClick={() => onEdit(n)}>create</Icon>
                                                    <Icon onClick={() => onRemove(n.id)}>delete</Icon>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.props.count}
                    rowsPerPage={rowsPerPage}
                    page={this.props.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);