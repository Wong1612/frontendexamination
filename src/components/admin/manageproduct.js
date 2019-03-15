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
import { urlApi } from '../../support/urlApi'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import PageNotFound from './../pagenotfound'

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
      Axios.get(urlApi + '/products')
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  onBtnDelete = (id) => {
      Axios.delete(urlApi + '/products/' + id)
      swal('Product Deleted Successfully!','Product will be no longer available in Products.','success')
      .then ((res) => {
        this.getDataApi()
      })
      .catch((err) => console.log(err))
  }

  onBtnAdd = () => {
        var namaProduct = this.nama.inputRef.value
        var hargaProduct = parseInt(this.harga.inputRef.value)
        var discountProduct = parseInt(this.discount.inputRef.value)
        var kategoriProduct = this.kategori.inputRef.value
        var imgProduct = this.img.inputRef.value
        var descProduct = this.desc.inputRef.value
  
        var newData = {
          nama : namaProduct,
          harga : hargaProduct,
          discount : discountProduct,
          kategori : kategoriProduct,
          img : imgProduct,
          desc : descProduct
        }

        Axios.post(urlApi + '/products/', newData)
        .then((res) => {
          swal('Product Added Successfully!','Product is now available in Products.','success')
          this.getDataApi()
        })
        .catch((err) => console.log(err))
        
        this.nama.inputRef.value = ""
        this.harga.inputRef.value = ""
        this.discount.inputRef.value = ""
        this.kategori.inputRef.value = ""
        this.img.inputRef.value = ""
        this.desc.inputRef.value = ""
        

  }

  onBtnEdit = (param) => {
    this.setState({isEdit: true, editItem : param})
  }

  onBtnCancel = () => {
    this.setState({isEdit: false})
  }

  onBtnSave = () => {
    var namaProduct = this.namaEdit.inputRef.value === "" ? this.state.editItem.nama : this.namaEdit.inputRef.value
    var hargaProduct = this.hargaEdit.inputRef.value === "" ? this.state.editItem.harga : this.hargaEdit.inputRef.value
    var discountProduct = this.discountEdit.inputRef.value === "" ? this.state.editItem.discount : this.discountEdit.inputRef.value
    var kategoriProduct = this.kategoriEdit.inputRef.value === "" ? this.state.editItem.kategori : this.kategoriEdit.inputRef.value
    var imgProduct = this.imgEdit.inputRef.value === "" ? this.state.editItem.img : this.imgEdit.inputRef.value
    var descProduct = this.descEdit.inputRef.value === "" ? this.state.editItem.desc : this.descEdit.inputRef.value
    var newData = 
    {
      nama : namaProduct,
      harga : hargaProduct,
      discount : discountProduct,
      kategori : kategoriProduct,
      img : imgProduct,
      desc : descProduct
    }

    Axios.put(urlApi + '/products/' + this.state.editItem.id, newData)
    .then((res) => {
      this.getDataApi()
      swal('Product Edited Successfully!', 'Product is now updated!', 'success')
      this.setState({isEdit: false, editItem: {}})
    })
    .catch((err) => {
      console.log(err)
    })
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
                <TableCell>Rp.{val.harga}</TableCell>
                <TableCell>{val.discount}%</TableCell>
                <TableCell>{val.kategori}</TableCell>
                <TableCell><img src = {val.img} style = {{width: '100px'}} alt = 'imager'></img></TableCell>
                <TableCell>{val.desc}</TableCell>
                <TableCell>
                    <Button animated color = 'teal' onClick = {() => this.onBtnEdit(val)}>
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>
                        <Icon name = 'edit'></Icon>
                        </Button.Content>
                    </Button>
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

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if (this.props.role === 'admin') {
    var {nama, harga, discount, desc, img, kategori } = this.state.editItem
      return (
          <div>
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
        </Paper>
  {/* ============================== Add Product ================================ */}
        <Paper className = 'mt-3'>
            <Table>
                <TableHead>
                  <TableRow>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>Add Product</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>
                      <Input ref = {input => this.nama = input} placeholder = "Insert Product Name Here!" className = "mt-2 ml-2 mb-2"></Input>
                          <Input ref = {input => this.harga = input}labelPosition='right' type='text' placeholder='Amount'>
                          <Label basic>Rp</Label>
                          <input />
                          <Label>Rupiah</Label>
                      </Input>
                      <Input ref = {input => this.discount = input} placeholder = "Insert Discount Here" className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.kategori = input} placeholder = "Insert Category Here" className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.img = input} placeholder = "Insert Image Here" className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.desc = input} placeholder = "Insert Description Here" className = "mt-2 ml-2 mb-2"></Input>
                      <Button animated color = 'blue' className = " mt-2 ml-2 mb-2" onClick = {this.onBtnAdd} >
                          <Button.Content visible>Add Product</Button.Content>
                          <Button.Content hidden>
                          <Icon name = 'add'></Icon>
                          </Button.Content>
                      </Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
  {/* ============================== Edit Product ================================ */}
  {
        this.state.isEdit === true ?
        <Paper className = 'mt-3'>
            <Table>
                <TableHead>
                  <TableRow>
                      <TableCell style = {{fontSize: '18px', fontWeight: '500'}}>Edit Product for {' ' + this.state.editItem.nama}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>
                      <Input ref = {input => this.namaEdit = input} placeholder = {nama} className = "mt-2 ml-2 mb-2"></Input>
                          <Input ref = {input => this.hargaEdit = input}labelPosition='right' type='text' placeholder={harga}>
                          <Label basic>Rp</Label>
                          <input />
                          <Label>Rupiah</Label>
                      </Input>
                      <Input ref = {input => this.discountEdit = input} placeholder = {discount}className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.kategoriEdit = input} placeholder = {kategori} className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.imgEdit = input} placeholder = {img} className = "mt-2 ml-2 mb-2"></Input>
                      <Input ref = {input => this.descEdit = input} placeholder = {desc} className = "mt-2 ml-2 mb-2"></Input>
                      <Button animated color = 'teal' className = "mt-2 ml-2 mb-2" onClick = {this.onBtnSave} >
                          <Button.Content visible>Save</Button.Content>
                          <Button.Content hidden>
                          <Icon name = 'save'></Icon>
                          </Button.Content>
                      </Button><Button animated color = 'red' className = "mt-2 ml-2 mb-2" onClick = {this.onBtnCancel} >
                          <Button.Content visible>Cancel</Button.Content>
                          <Button.Content hidden>
                          <Icon name = 'cancel'></Icon>
                          </Button.Content>
                      </Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
        : null
      }
        </div>
      );
    } else {
      return <PageNotFound/>
    }
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    role: state.userstate.role
  }
}

export default connect(mapStateToProps) (withStyles(styles)(CustomPaginationActionsTable));