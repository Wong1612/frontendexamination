import React from 'react'
import Axios from 'axios';
import swal from 'sweetalert'
import { urlApi } from '../support/urlApi'
import { connect } from 'react-redux'
import { addToCart } from './../1.actions'

class ProductDetail extends React.Component {
    state = {products : {}, cart: []}


    componentDidMount() {
        this.getDataApi()
    }

    componentWillReceiveProps(newProps) {
        this.setState({cart: newProps.cart})
    }

    getDataApi = () => {
        var idUrl = this.props.match.params.id
        console.log(this.props.match)
        Axios.get(urlApi + '/products/' + idUrl)
        .then((res) => {
            this.setState({products : res.data}) // res

        })
        .catch((err) => {
            console.log(err)
        })
    }

    productQuantity = () => {
        var num = this.refs.inputQty.value
        if (num < 1) {
            this.refs.inputQty.value = 1
        }
    }

    addToCart = () => {
        if (this.refs.inputQty.value === "") {
            swal('Quantity is empty!','Please add quantity for your selected product.','error')
        } else {
            swal('Product added successfully!','Your cart has been updated.','success')
            var nama = this.state.products.nama
            var harga = parseInt(this.state.products.harga)
            var img = this.state.products.img
            var desc = this.state.products.desc
            var kategori = this.state.products.kategori
            var discount = parseInt(this.state.products.discount)
            var qty = this.refs.inputQty.value 

            var newData = {
                nama: nama,
                harga: harga,
                discount: discount,
                desc: desc,
                img: img,
                kategori: kategori,
                qty : qty
            }

            Axios.get(urlApi + '/cart/', newData)
            .then((res) => {
                Axios.post(urlApi + '/cart/', newData)
            })
            .catch((err)=>{
                console.log(err)
            })

            }
    }

    render() {
        var {nama, img, discount, desc, harga} = this.state.products
            return (
                <div className = "container" style = {{marginTop: '70px'}}>
                    <div className = "row">
                        <div className = 'col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img className="card-img-top" src={img} alt="Card image cap" />
                        </div>
                        </div>
                        {/* ======================================================================= */}
                        <div className = 'col-md-8'>
                            <h1 style = {{color: 'black'}}>{nama}</h1>
                            {
                                discount > 0 ?
                                <div style = {{backgroundColor: '#ea3135', width: '80px', height: '22px', color: 'white', textAlign: 'center', display: 'inline-block'}}>{discount}% OFF</div>
                                : null
                            }
                            {
                                discount > 0 ?
                                <span style = {{fontWeight: '600', fontSize: '12px', color: '#606060', marginLeft: '10px', textDecoration: 'line-through'}}>Rp. {harga}</span>
                                : null
                            }
    
                            <div style = {{fontWeight: '700', fontSize: '24px', color: 'darkred'}}>Rp. {harga - (harga * (discount/100))}</div>
                            {/* ======================================================================= */}
                            <div className = 'row'>
                                <div className = 'col-md-2'>
                                    <div style = {{marginTop: '15px', color: 'black', fontWeight: '700'}}>Amount</div>
                                    <input type = 'number' onChange={this.productQuantity} ref='inputQty' width = '20px' className = 'form-control' style = {{width: '60px', marginTop: '10px'}}/>
                                </div>
                            {/* ======================================================================= */}
                                <div className = 'col-md-6'>
                                    <div style = {{marginTop: '15px', color: 'black', fontWeight: '700', fontSize: '14px'}}>Notes to Seller (Optional)</div>
                                    <input type = "text" style = {{marginTop: '10px'}} placeholder = "Example: Please wrap package in bubble wrap. " className = "form-control"></input>
                                </div>
                            </div>
                            {/* ======================================================================= */}
                            <div className = "row">
                                <div className = "col-md-8 mt-4">
                                <p style = {{color: 'black', fontStyle: 'Italic'}}>{desc}</p>
                                </div>
                            </div>
                            {/* ======================================================================= */}
                            <div className = "row mt-4">
                                <input className = "btn border-secondary col-md-2" value = "Add To Wishlist" style = {{marginLeft: '15px'}}></input>
                                {
                                    this.props.username !== "" ? 
                                    <input className = "btn btn-primary col-md-3" style = {{marginLeft: '15px'}} value = "Buy"></input>
                                    : <input className = "btn btn-primary col-md-3 disabled" style = {{marginLeft: '15px'}} value = "Buy"></input>
                                }
                                {
                                    this.props.username !== "" ? 
                                    <input className = "btn btn-success col-md-3" style = {{marginLeft: '15px'}} value = "Add To Cart" onClick = {this.addToCart}></input>
                                    : <input className = "btn btn-success col-md-3 disabled" style = {{marginLeft: '15px'}} value = "Add To Cart"></input>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                )
        }
        
    }

const mapStateToProps = (state) => {
    return {
        username: state.userstate.username,
        cart: state.userstate.cart
    }   
}

export default connect(mapStateToProps,{addToCart})(ProductDetail)