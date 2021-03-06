import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosLogIn, IoIosMegaphone, IoIosCalendar, IoIosWarning, IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosCloseCircle, IoIosPerson, IoIosChatboxes, IoIosBook } from 'react-icons/io'
import { logout } from '../actions/authActions'
import { toggleAdminView, toggleFilter, updateSearch, toggleAdminUserView, getUsers } from '../actions/appActions'
import AnimateHeight from 'react-animate-height'
import Logo from '../globals/img/Logo.png'


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

    toggleFilter = (type) => {
        let directionDate = this.props.filter.type === type && type === 'date' ? !this.props.filter.directionDate : this.props.filter.directionDate
        let directionLike = this.props.filter.type === type && type === 'like' ? !this.props.filter.directionLike : this.props.filter.directionLike
        this.props.toggleFilter(type, directionDate, directionLike)
    }

    showDirection = (type) => {
        if (type === 'date')
            return this.props.filter.directionDate ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />
        else
            return this.props.filter.directionLike ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />
    }

    handleSearch = () => {
        this.props.updateSearch(this.refs.search.value)
    }

    handleClear = () => {
        this.props.updateSearch('')
    }
    
    render() {
        let filterStyle = this.props.searchValue !== '' ? { opacity: 0, zIndex: -1 } : { opacity: 1, zIndex: 100 }
        let closeStyle = this.props.searchValue === '' ? { opacity: 0, zIndex: 0 } : { opacity: 1, zIndex: 100 }
        let filterDivStyle = this.props.location.pathname === '/' ? { opacity: 1 } : { opacity: 0 }

        let admin = this.props.adminView ? 'admin' : ''

        return (
            <div id='navbar' className={admin} >
                {/* <h1 id="nav-title">Equal Report</h1> */}
                <span id="nav-logo"><img id='nav-logo-img' src={Logo} alt="the" /></span>
                <div id="nav-search-filter-div" className={admin} style={filterDivStyle}>
                    <input id="nav-search-bar" type="text" placeholder="Rechercher..." ref="search" value={this.props.searchValue } onChange={() => this.handleSearch()}></input>
                    <div id="nav-filter-btn-div" style={filterDivStyle}>
                        { this.props.adminView ? <span className="nav-filter-btn post-user-toggle selected" style={ filterStyle } onClick={this.props.toggleAdminUserView}>{this.props.adminUserView ? <IoIosChatboxes /> : <IoIosPerson />}</span> : '' }
                        <span className={ `nav-filter-btn date ${ this.props.filter.type === 'date' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('date') } style={ filterStyle }>{ this.props.adminUserView && this.props.adminView ? <IoIosBook /> : <IoIosCalendar /> } { this.showDirection('date') }</span>
                        <span className={ `nav-filter-btn signal ${ this.props.filter.type === 'like' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('like') } style={ filterStyle }>{ this.props.adminView ? <IoIosWarning /> : <IoIosMegaphone /> }{ this.showDirection('like') }</span>
                        <span id="nav-search-clear" style={closeStyle} onClick={() => this.handleClear()}><IoIosCloseCircle /> </span>
                    </div>
                </div>
                { this.props.loggedIn ?
                    <div id="nav-pseudo-menu-div"
                        onMouseEnter={ () => this.toggleHeight('enter') }
                        onMouseLeave={ () => this.toggleHeight('leave') }
                    >
                        <div id="pseudo-div" >
                            <img src={require(`../globals/img/${this.props.user.photo}.jpg`) } alt='r' id="nav-pseudo-photo"></img>
                            <h2 id="nav-pseudo">{ this.props.user.pseudo }</h2>
                        </div>
                        <AnimateHeight id="nav-rah" height={ this.state.height } easing="cubic-bezier(0.165, 0.84, 0.44, 1)" duration={300}>
                            <div id="nav-menu" >
                                <span id="nav-menu-spacer"></span>
                                <Link to="/monprofil" className="nav-menu-btn">Mon Profil</Link>
                                {this.props.user.isAdmin ? 
                                    this.props.adminView ?
                                        <span to="/"  className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView() }} >Accueil</span> 
                                        : <span to="/" className="nav-menu-btn nav-menu-link" onClick={ () => { this.props.toggleAdminView(); this.props.getUsers(this.props.token, this.props.users.length === 0) }} >Admin</span>
                                    : null }
                                <Link to='/' className="nav-menu-btn" onClick={ () => { this.toggleHeight('leave'); this.props.logout(); if (this.props.adminView)this.props.toggleAdminView() } }>Déconnexion</Link>
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
    adminView: state.app.adminView,
    adminUserView: state.app.adminUserView,
    activePost: state.app.activePost,
    filter: state.app.filter,
    searchValue: state.app.searchValue,
    token: state.auth.token,
    users: state.app.users
})

const mapDispatchToProps = {
    logout,
    toggleAdminView,
    toggleFilter,
    updateSearch,
    toggleAdminUserView,
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)