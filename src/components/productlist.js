import React from 'react'
import Axios from 'axios'
import { urlApi } from './../support/urlApi'
import './../support/product.css'
import { Link } from 'react-router-dom'

class ProductList extends React.Component {
    state = {listProduct : []}

    componentDidMount() {
        this.getDataProduct()
    }
    

    getDataProduct = () => {
        Axios.get(urlApi + '/products')
        .then ((res) => this.setState({listProduct : res.data})) // gets array of objects (takes data from db.json)
        .catch ((err) => console.log(err))
    }

    renderProductJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
                return (
                <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                        <Link to = {"product-detail/" + val.id}><img className="card-img-top" width = '350px' height = '350px' src={val.img} alt="Card"/></Link>
                        {
                            val.discount > 0 ?
                            <div className = 'discount'>{val.discount}%</div>
                            : null
                        }
                        <div className="card-body">
                        <h4 className="card-text">{val.nama}</h4>
                        <h5 className="card-text" style = {{fontSize: '14px'}}> Category: {val.kategori}</h5>
                        {
                            val.discount > 0 ?
                            <p className="card-text" style = {{textDecoration: 'line-through', color: 'red', marginBottom: '0px'}}>Rp. {val.harga}</p>
                            : null
                        }
                        <p style = {{display: 'inline', marginLeft: '0px', fontWeight: '500', fontFamily: 'Proxima Nova'}}>Rp. {val.harga - (val.harga * (val.discount/100))} </p>
                        <button className="btn btn-primary d-block mt-50"><i className="fas fa-shopping-cart"></i> Add To Cart</button>
                        </div>
                    </div>
                )
        })
        return jsx
    }
    render() {
        return (
            <div className = "container">
            <div className = "row justify-content-center">
                {this.renderProductJsx()}
            </div>
            </div>
        )
    }
}

export default ProductList