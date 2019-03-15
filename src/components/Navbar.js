import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {resetUser} from './../1.actions'
import Cookies from 'universal-cookie'

const objCookie = new Cookies()
class HeaderKu extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    onBtnLogout = () => {
        objCookie.remove('userData')
        this.props.resetUser()
    }

    render(){ 
        if (this.props.username === "") {
            return(
                <div style={{marginBottom:"75px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                
                                <NavItem>
                                    <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Masuk</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/product-list"><NavLink className="btn btn-default" style={{fontSize:"14px"}}>Product List</NavLink></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        } else {
            return (
            <div style={{marginBottom:"75px"}}>
                    <Navbar color="light" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                <div className="input-group border-right" style={{width:"350px"}}>
                                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                    <div className="input-group-append mr-2">
                                        <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                    </div>
                                </div> 
                                </NavItem>
                                <NavItem>
                                    <NavLink> Hi, {this.props.username}</NavLink>
                                </NavItem>
                                <NavItem>
                                <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Cart</NavLink></Link>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Menu
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    <DropdownItem>
                                        Transaction History
                                    </DropdownItem>
                                    <DropdownItem>
                                        Edit Profile
                                    </DropdownItem>
                                    <DropdownItem>
                                        {
                                            this.props.role === "admin" ? 
                                            <Link to = '/product-list'>Manage Products</Link>
                                            : null
                                        }
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick = {this.onBtnLogout}>
                                        Log Out
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );

        } 
        }
            
        }

const mapStateToProps = (state) => {
    return {
        username : state.userstate.username,
        role : state.userstate.role
    }

}


export default connect (mapStateToProps,{resetUser})(HeaderKu);