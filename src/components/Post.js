import React, { Component } from "react";
import { connect } from 'react-redux';
import { modifierLike, modifierSignaler, getPostById, toggleFilter } from '../actions/appActions'
import { IoIosMegaphone, IoIosThumbsUp, IoIosWarning, IoIosText, IoIosMore, IoIosTrash, IoIosConstruct, IoIosCalendar, IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import { Redirect, Link } from 'react-router-dom'
import { formatDate } from '../globals'
import AnimateHeight from 'react-animate-height'


class Post extends Component{
    constructor(props) {
        super(props)

        this.state = {
            liked: this.props.post.reactions.includes(this.props.user._id),
            signaler: this.props.post.signaler.includes(this.props.user._id),
            redirect: false,
            menuOpen: 0
        }
    }

    componentDidUpdate = () => {
        if (this.props.post.reactions.includes(this.props.user._id) !== this.state.liked) {
            this.setState({
                liked: !this.state.liked
            })
        }
        if (this.props.post.signaler.includes(this.props.user._id) !== this.state.signaler) {
            this.setState({
                signaler: !this.state.signaler
            })
        }
        if (this.state.redirect) this.setState({ ...this.state, redirect: false })
    }

    handleLike = (e) => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            liked: !this.state.liked
        })
        this.props.modifierLike(this.props.post, this.props.user._id, this.props.token, this.state.liked)
    }

    handleSignaler = (e) => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            signaler: !this.state.signaler
        })
        this.props.modifierSignaler(this.props.post, this.props.user._id, this.props.token, this.state.signaler)
    }

    handleRedirect = () => {
        this.setState({
            ...this.state,
            redirect: true
        })
    }

    showDirection = (type) => {
        if (type === 'date')
            return this.props.commentFilter.directionDate ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />
        else
            return this.props.commentFilter.directionLike ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />
    }

    toggleFilter = (type) => {
        let directionDate = this.props.commentFilter.type === type && type === 'date' ? !this.props.commentFilter.directionDate : this.props.commentFilter.directionDate
        let directionLike = this.props.commentFilter.type === type && type === 'like' ? !this.props.commentFilter.directionLike : this.props.commentFilter.directionLike
        this.props.toggleFilter(type, directionDate, directionLike, true)
    }

    toggleMenu = (type) => {
        this.setState({
            ...this.state,
            menuOpen: type === 'enter' ? 'auto' : 0
        })
    }

    render() {
        let likeStyle = this.state.liked ? { background: "rgb(93, 93, 187)", color: "white" } : {};
        let signalStyle = this.state.signaler ? { background: "red", color: "white" } : {};
        let postView = this.props.postView ? "view" : "";
        let filterDivStyle = this.props.postView ? { opacity: 1 } : { opacity: 0 }

        if (this.state.redirect) 
            return <Redirect to={`/post/${ this.props.post._id }`} />
        
        return (
            <div className={ `post ${ postView }` } id={ this.props.postView ? '' : `post/${ this.props.post._id }` } onClick={ () => {
                this.props.getPostById(null, false, this.props.post); if(!this.props.postView) this.handleRedirect() }}>
                { this.props.user._id === this.props.post.createur._id
                    ?
                    <div className="post-menu-div" onClick={ e => { e.stopPropagation() } } onMouseEnter={ () => this.toggleMenu('enter') }
                        onMouseLeave={ () => this.toggleMenu('leave') }>
                        <span className="post-more" ><IoIosMore /></span>
                        <AnimateHeight className="post-menu-rah" height={this.state.menuOpen} easing="cubic-bezier(0.165, 0.84, 0.44, 1)" duration={300}>
                            <div className="post-menu">
                                <Link to={{ pathname: '/texteform', state: {type: "modifier", id: this.props.post._id} }} style={ {textDecoration: "none"} } className="post-btn modifier">Modifier&nbsp;<span className="react-icon"><IoIosConstruct /></span></Link>
                                <Link to={{ pathname: `/selectionform/${ this.props.post._id }`, state: {type: "supprimer", comment: false, data: this.props.post} }} style={ { textDecoration: "none" } } className="post-btn supprimer" >Supprimer&nbsp;<span className="react-icon"><IoIosTrash /></span></Link>
                            </div>
                        </AnimateHeight>
                    </div>
                    : "" }
                
                <div className={ `post-user-div ${postView}` }>
                    <img src={ require(`../globals/img/${this.props.post.createur.photo}.jpg`) } className={ `post-photo ${postView}` } alt="tt"></img>
                    <h3 className={ `post-pseudo ${postView}` }>{this.props.post.createur.pseudo}</h3>
                <span className={`post-date ${postView}` }>{formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className={`post-text ${postView}` }>{ this.props.post.texte }</p>
                <div className={`post-info-div ${postView}` }>
                    <span className={`post-info-badge like ${postView}` }><span className={`post-icon like ${postView}` }><IoIosMegaphone /></span></span>
                    <span className={`post-info like ${postView}` }>{ this.props.post.reactions.length }</span>
                    <span className={`post-info-badge comment ${postView}` }><span className={`post-icon comment ${postView}` }><IoIosText /></span></span>
                    <span className={`post-info comment ${postView}` }>{ this.props.post.numCommentaires }</span>
                </div>
                {this.props.loggedIn ? 
                <div className={`post-btn-div ${postView}` }>
                    <span className={ `post-btn like ${ postView }` } style={ likeStyle } onClick={ e => this.handleLike(e) }>J'ai entendu &nbsp;<span className="react-icon"><IoIosMegaphone /></span></span>
                    <div className="post-filter-btn-div" style={ filterDivStyle }>
                        <span className={ `post-filter-btn date ${ this.props.commentFilter.type === 'date' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('date')} ><IoIosCalendar /> { this.showDirection('date') }</span>
                        <span className={ `post-filter-btn signal ${ this.props.commentFilter.type === 'like' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('like') } >{<IoIosThumbsUp />}{ this.showDirection('like') }</span>
                    </div>
                    <span className={`post-btn signaler ${postView}` } style={signalStyle} onClick={e => this.handleSignaler(e)}>Signaler&nbsp;<span className="react-icon"><IoIosWarning /></span></span> 
                </div> 
                : ""}
                </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token,
    commentFilter: state.app.commentFilter
})

const mapDispatchToProps = {
    modifierLike,
    modifierSignaler,
    getPostById,
    toggleFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)