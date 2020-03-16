import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosLogIn } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { logout } from '../actions/authActions'
import { toggleAdminView } from '../actions/appActions'
import AnimateHeight from 'react-animate-height'


class Navbar extends Component{
    constructor(props) {
        super(props)

        this.state = {
            height: 0,
            opacity: 0
        }
    }

    toggleHeight = (key) => {
        this.setState({
            height: key === 'enter' ? "auto" : 0,
            opacity: key === 'enter' ? 1 : 0
        })
    }

    render() {
        return (
            <div id="navbar" >
                <h1 id="nav-title">Equal Report</h1>
                { this.props.loggedIn ?
                    <div id="nav-pseudo-menu-div"
                        onMouseEnter={ () => this.toggleHeight('enter') }
                        onMouseLeave={ () => this.toggleHeight('leave') }
                    >
                        
                        <div id="pseudo-div" >
                            <img src={ egg } alt='r' id="nav-pseudo-photo"></img>
                            <h2 id="nav-pseudo">{ this.props.user.pseudo }</h2>
                        </div>
                        <AnimateHeight id="nav-rah" height={ this.state.height } easing="cubic-bezier(0.165, 0.84, 0.44, 1)" duration={300}>
                            <div id="nav-menu" >
                                <span id="nav-menu-spacer"></span>
                                <span  className="nav-menu-btn">Mon Profil</span>
                                {this.props.user.isAdmin ? 
                                    this.props.adminView ?
                                        <Link to="/"  className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView() }} >Accueil</Link> 
                                        : <Link to="/admin"  className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView() }} >Admin</Link>
                                    : null }
                                <span className="nav-menu-btn" onClick={ () => { this.toggleHeight('leave'); this.props.logout(); if (this.props.adminView)this.props.toggleAdminView() } }>Déconnexion</span>
                            </div>
                        </AnimateHeight>
                    </div>
                    : <Link to="/login" id="nav-power"><IoIosLogIn /></Link>
                       
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    adminView: state.app.adminView
})


export default connect(mapStateToProps, {logout, toggleAdminView})(Navbar)