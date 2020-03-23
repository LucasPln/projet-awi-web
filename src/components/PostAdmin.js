import React, { Component } from "react";
import { connect } from 'react-redux';
import { supprimerPost, getPostById, toggleFilter } from '../actions/appActions'
import '../styles/PostAdmin.css'
import { IoIosThumbsUp, IoIosWarning, IoIosText, IoIosTrash, IoIosCalendar, IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { Link } from 'react-router-dom'
import { formatDate } from '../globals'
import { Redirect } from 'react-router-dom'


class PostAdmin extends Component{
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    componentDidUpdate = () => {
        if (this.state.redirect) this.setState({ ...this.state, redirect: false })
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

    handleRedirect = () => {
        this.setState({
            ...this.state,
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) 
            return <Redirect to={`/post/${ this.props.post._id }`} />
        

        let postView = this.props.postView ? "view" : "";
        let filterDivStyle = this.props.postView ? { opacity: 1 } : { opacity: 0 }

        return (
            <div className={ `post-admin ${ postView }` } id={ `post/${ this.props.post._id }` } onClick={ () => {this.props.getPostById(null, false, this.props.post); if (!this.props.postView) this.handleRedirect() }}>
                <div className="post-user-div-admin">
                    <img src={egg} className="post-photo" alt="tt"></img>
                    <h3 className="post-pseudo-admin">{this.props.post.createur.pseudo}</h3>
                    <span className="post-date-admin">{formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className="post-text-admin">{ this.props.post.texte }</p>
                <div className="post-info-div-admin">
                    <span className="post-info-badge-admin like"><span className="post-icon-admin like"><IoIosThumbsUp /></span></span>
                    <span className="post-info-admin like">{ this.props.post.reactions.length }</span>
                    <span className="post-info-badge-admin comment"><span className="post-icon-admin comment"><IoIosText /></span></span>
                    <span className="post-info-admin comment">{ this.props.post.numCommentaires }</span>
                    <span className="post-info-badge-admin signaler"><span className="post-icon-admin signaler"><IoIosWarning /></span></span>
                    <span className="post-info-admin signaler">{ this.props.post.signaler.length }</span>
                </div> 
                <div className="post-btn-div-admin">
                    <Link to={{ pathname: `/selectionform/${ this.props.post._id }`, state: {type: "vider", comment: false, data: this.props.post} }} style={ {textDecoration: "none"} } className="post-btn-admin signaler"  onClick={e => e.stopPropagation()}>Vider les signalements&nbsp;<span className="react-icon"><IoIosWarning /></span></Link>
                    <div className="post-filter-btn-div" style={filterDivStyle}>
                        <span className={ `post-filter-btn date ${ this.props.commentFilter.type === 'date' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('date')} ><IoIosCalendar /> { this.showDirection('date') }</span>
                        <span className={ `post-filter-btn signal ${ this.props.commentFilter.type === 'like' ? 'selected' : '' }` } onClick={ () => this.toggleFilter('like') } >{<IoIosWarning />}{ this.showDirection('like') }</span>
                    </div>
                    <Link to={{ pathname: `/selectionform/${ this.props.post._id }`, state: {type: "supprimer", comment: false, data: this.props.post} } } style={ {textDecoration: "none"} } className="post-btn-admin supprimer"  onClick={e => e.stopPropagation()}>Supprimer&nbsp;<span className="react-icon"><IoIosTrash /></span></Link> 
                    </div>
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


export default connect(mapStateToProps, { supprimerPost, getPostById, toggleFilter })(PostAdmin)