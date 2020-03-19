import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IoIosCloseCircle } from 'react-icons/io'
import { Redirect } from 'react-router-dom'
import egg from '../globals/egg.jpg'
import Post from './Post'
import { modifierUser } from '../actions/appActions'

class MonProfil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false,
            modif: false,
            msg: '',
            pseudo: '',
            email: '',
            mdp: '',
            newMdp: '',
            newMdpConf: ''
        }
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({
            ...this.state,
            opacity: 1,
            pseudo: this.props.user.pseudo,
            email: this.props.user.email
        }), 1)
    }

    // componentDidUpdate = () => {
    //     if (this.state.modif) {
    //         this.handleModif();
    //     }
    // }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 100)
    }

    handleModif = () => {
        this.setState({
            ...this.state,
            modif: !this.state.modif
        })
    }

    sendModifInfo = () => {
        let fail = false

        let params = {}
        
        if (this.state.pseudo !== this.props.user.pseudo) Object.defineProperty(params, "pseudo", { value : this.state.pseudo,
                           writable : true,
                           enumerable : true,
                           configurable : true});
        if (this.state.email !== this.props.user.email) Object.defineProperty(params, "email", { value : this.state.email,
                           writable : true,
                           enumerable : true,
                           configurable : true});
        if (this.state.mdp !== '') Object.defineProperty(params, "mdp", { value : this.state.mdp,
                           writable : true,
                           enumerable : true,
                           configurable : true});
        if (this.state.newMdp === this.state.newMdpConf) {
            if (this.state.newMdp !== '') {
                if (this.state.mdp !== '')
                    Object.defineProperty(params, "newMdp", {
                        value: this.state.newMdp,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                else {
                    fail = true
                    this.setState({ ...this.state, msg: 'Vous devez entrer votre mot de passe actuel pour le modifier.' })
                }
            }

            if (!fail) {
                this.setState({ ...this.state, match: '', modif: false })
                this.props.modifierUser(this.props.user._id, this.props.user.pseudo, this.props.token, params)
            }
        } else this.setState({ ...this.state, msg: 'Les mots de passe doivent être identiques.' })
    }

    onChange = () => {
        this.setState({
            ...this.state,
            pseudo: this.refs.pseudo.value,
            email: this.refs.email.value,
            mdp: this.refs.mdp.value,
            newMdp: this.refs.newMdp.value,
            newMdpConf: this.refs.newMdpConf.value
        })
    }

    render() {
         let style = {
            width: this.props.width,
            height: this.props.height - 60,
            opacity: this.state.opacity
         }
        
        let isAdmin = this.props.isAdmin ? {} : { display: 'none' } 
        let modif = this.state.modif ? { opacity: 1 } : { opacity: 0 }
        let modifSpan = !this.state.modif ? { opacity: 1 } : { opacity: 0 }
        let error = this.state.msg === '' ? { opacity: 0 } : { opacity: 1 }
        

        if (this.state.redirect)
            return <Redirect to="/" />
        
        return (
            <div id="mon-profil" className="mon-profil" style={ style } onKeyPress={ e => (e.key === "Enter" ? this.sendModifInfo() : '') }>
                <span id="mon-profil-close" onClick={ this.handleClose }><IoIosCloseCircle /></span>
                <div id="mon-profil-div">
                    <div id="mon-profil-pseudo-div">
                        <img id="mon-profil-photo" src={ egg } alt="egg"></img>
                        <div id="mon-profil-pseudo-info-div">
                            <span id="mon-profil-admin-badge" style={isAdmin}>Admin</span>
                            <span id="mon-profil-pseudo">{ this.props.user.pseudo }</span>
                            <span id="mon-profil-email">{ this.props.user.email }</span>
                        </div>
                    </div>
                    <div id="mon-profil-changer-div">
                        <span id="mon-profil-changer-mdp" style={ modifSpan } onClick={() => this.handleModif()}>Modifier mes informations...</span>
                        <div style={modif} id="mon-profil-form" onChange={() => this.onChange()}>
                            <span className="mon-profil-modif-label">Pseudo :</span>
                            <input id="mon-profil-modif-pseudo" placeholder="Pseudo" ref="pseudo" value={this.state.pseudo} />
                            <span className="mon-profil-modif-label">Email :</span>
                            <input id="mon-profil-modif-email" placeholder="Email" ref="email" value={this.state.email} />
                            <span className="mon-profil-modif-label">Mot de passe :</span>
                            <input id="mon-profil-modif-mdp" type="password" placeholder="Mot de passe" ref="mdp" value={this.state.mdp} />
                            <span className="mon-profil-modif-label">Nouveau mot de passe :</span>
                            <input id="mon-profil-modif-new-mdp" type="password" placeholder="Nouveau mot de passe" ref="newMdp" value={this.state.newMdp} />
                            <span className="mon-profil-modif-label">Confirmation du nouveau mot de passe:</span>
                            <input id="mon-profil-modif-new-mdp-conf" type="password" placeholder="Confirmation" ref="newMdpConf" value={this.state.newMdpConf} />
                            <button id="login-submit" onClick={ this.sendModifInfo }>Modifier</button>
                            <span id="mon-profil-error" style={ error }>{ this.state.msg }</span>
                        </div>
                    </div>
                </div>
                <div id="mon-profil-mes-posts-div">
                    <span id="mon-profil-mes-posts-titre">Mes Posts</span>
                    <div id="mon-profil-post-liste">
                        <div id="mon-profil-spacer"></div>
                        { this.props.posts.filter(p => p.createur._id === this.props.user._id).map(p => <Post key={p._id }post={p} />)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    width: state.app.width,
    height: state.app.height,
    loggedIn: state.auth.loggedIn,
    isAdmin: state.auth.user.isAdmin,
    posts: state.app.posts,
    token: state.auth.token
})

export default connect(mapStateToProps, {modifierUser})(MonProfil)