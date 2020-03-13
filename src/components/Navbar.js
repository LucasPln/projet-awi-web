import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosPower } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { logout } from '../actions/authActions'


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
            height: key === 'enter' ? "180px" : "0px",
            opacity: key === 'enter' ? 1 : 0
        })
    }

    render() {

        let btnStyle = this.state.opacity === 0 ? { display: 'none' } : {}

        return (
            <div id="navbar" >
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
                            <span style={ btnStyle } className="nav-menu-btn">Mon Profil</span>
                            <span style={ btnStyle } className="nav-menu-btn" onClick={ () => { this.toggleHeight('leave'); this.props.logout() } }>Déconnexion</span>
                        </div>
                    </div>
                    : <Link to="/login" id="nav-power"><IoIosPower /></Link>
                       
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
})


export default connect(mapStateToProps, {logout})(Navbar)