import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button, Icon, Input, Label } from 'semantic-ui-react'
import { urlApi } from './../support/urlApi'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from './../1.actions'
import PageNotFound from './pagenotfound';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {}
  };

  componentDidMount() {
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/cart/')
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  checkout = () => {
      this.doneShopping()
      swal('Thank you for shopping!', 'Your items will be delivered soon!', 'success')
  }

  doneShopping = () => {
      Axios.delete(urlApi + '/cart/')
      .then(() => {
        this.getDataApi()
      })
      .catch((err) => console.log(err))
  }

  onBtnDelete = (id) => {
      Axios.delete(urlApi + '/cart/' + id)
      .then(() => {
        this.getDataApi()
      })
      .catch((err) => console.log(err))
  }


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  renderJsx = () => {
      var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
          return (
            <TableRow key={val.id}>
                <TableCell component="th" scope="row">
                {val.id}
                </TableCell>
                <TableCell>{val.nama}</TableCell>
                <TableCell>Rp.{val.harga * (val.qty)}</TableCell>
                <TableCell>{val.discount}%</TableCell>
                <TableCell>{val.kategori}</TableCell>
                <TableCell>{val.qty}</TableCell>
                <TableCell><img src = {val.img} style = {{width: '100px'}} alt = 'imager'></img></TableCell>
                <TableCell>{val.desc}</TableCell>
                <TableCell>
                    <Button animated color = 'red' onClick = {() => this.onBtnDelete(val.id)} >
                        <Button.Content visible>Delete</Button.Content>
                        <Button.Content hidden>
                        <Icon name = 'delete'></Icon>
                        </Button.Content>
                    </Button>
                </TableCell>
          </TableRow>
          )
      })
      return jsx
  }

  renderCartJsx = () => {
      var cartjsx = this.state.rows.map((val) => {
        return (
          <h2>Total Price: Rp. {val.harga * (val.qty)}</h2>
        )
      })
      return cartjsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    if (this.props.username !== "") {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      return (
          <div>
            {
              this.props.cart !== "" ?
              <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>ID</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>Nama</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>HARGA</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>DISCOUNT</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>CATEGORY</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>QUANTITY</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>IMAGE</TableCell>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>DESCRIPTION</TableCell>
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {this.renderJsx()}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            <Paper className = 'mt-3'>
                      <Table>
                          <TableHead>
                            <TableRow>
                                <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>Checkout</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                              <TableRow>
                                <TableCell>
                                {this.renderCartJsx()}
                                <div className = "row mt-4">
                                  <Link to = "/product-list"><input className = "btn btn-primary" style = {{marginLeft: '5px', width: '200px'}} value = "Continue Shopping"></input></Link>
                                  <Link to = "/"><input className = "btn btn-success" style = {{marginLeft: '20px', width: '200px'}} value = "Checkout" onClick = {() => this.checkout()}></input></Link>
                                </div>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                      </Table>
                  </Paper>
              </Paper>
              : <h1 style = {{textAlign: 'center'}}>Cart is Empty. Start Shopping!</h1>
             
            }
          
        </div>
      );
    } else  {
      return (
        <PageNotFound/>
      )
    }            
  }
}


CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    role: state.userstate.role,
    cart: state.cartstate.cart,
    username: state.userstate.username
  }
}

export default connect(mapStateToProps,{addToCart}) (withStyles(styles)(CustomPaginationActionsTable));