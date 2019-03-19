import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin } from './../1.actions'
import Loader from 'react-loader-spinner'
import cookie from 'universal-cookie'

const Cookie = new cookie()
 
class Login extends React.Component{ 
    // TRIGGERED IF THERE IS A CHANGE OF PROPS (GLOBAL STATE HAS CHANGED)
    componentWillReceiveProps(newProps) {
        Cookie.set('userData', newProps.username, {path: '/'})

    }
    onBtnLoginClick = () => {
        var username = this.refs.username.value 
        var password = this.refs.password.value
        this.props.onLogin(username, password)

    }

    renderBtnOrLoading = () => {
        if (this.props.loading === true) {
            return <Loader
                    type = "Bars"
                    color = "#00BFFF"
                    height = "40"
                    weight = "100"/>
        } else {
            return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"350px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
        }
    }

    renderErrorMessage() {
        if (this.props.error !== "") {
            return <div className = "alert alert-danger" role = "alert" style = {{marginTop: '10px'}}>
                        {this.props.error}
                    </div> 
        }
    }

    render(){
        if (this.props.username !== "") {
            return <Redirect to = '/'/>
        }
        return(
            <div className="container myBody" style={{minHeight:"600px", fontFamily: 'Poppins'}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12" style = {{textAlign: "center"}}>
                                 {this.renderBtnOrLoading()}
                                 {this.renderErrorMessage()}
                                </div>
                                    
                            </div>
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userstate.username,
        loading: state.userstate.loading,
        error: state.userstate.error
    }
}

export default connect (mapStateToProps, {onLogin}) (Login) // null is used since there's no mapStateToProps