import React, { Component } from "react";
import { connect } from 'react-redux'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { IoIosPower } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { logout } from '../actions/authActions'
import { toggleAdminView } from '../actions/appActions'


class Navbar extends Component{
    constructor(props) {
        super(props)

        this.state = {
            height: "0px",
            opacity: 0
        }

        
    }

    toggleHeight = (key) => {
        this.setState({
            height: key === 'enter' ? "230px" : "0px",
            opacity: key === 'enter' ? 1 : 0
        })
    }

    render() {
        console.log(this.props.user.isAdmin)
        let style = this.props.location.pathname === '/login' ? {boxShadow: "0px 0px 0px rgb(235, 235, 235)"} : {}

        return (
            <div id="navbar" style={style}>
                <h1 id="nav-title">Equal Report</h1>
                { this.props.loggedIn ?
                    <div id="nav-pseudo-div"
                        onMouseEnter={ () => this.toggleHeight('enter') }
                        onMouseLeave={ () => this.toggleHeight('leave') }
                    >
                        <img src={ egg } alt='r' id="nav-pseudo-photo"></img>
                        <h2 id="nav-pseudo">{ this.props.user.pseudo }</h2>
                        <div id="nav-menu" style={ this.state }>
                            <span id="nav-menu-spacer"></span>
                            <span className="nav-menu-btn">Mon Profil</span>
                            {this.props.user.isAdmin ? 
                                this.props.adminView ?
                                    <Link to="/" className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView() }} >Accueil</Link> 
                                    : <Link to="/admin" className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView() }} >Admin</Link>
                                : null }
                            <span className="nav-menu-btn" onClick={ () => { this.toggleHeight('leave'); this.props.logout() } }>Déconnexion</span>
                            
                        </div>
                    </div>
                    : this.props.location.pathname !== '/login'
                        ?
                        <Link to="/login" id="nav-power"><IoIosPower /></Link>
                        : ""
                       
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