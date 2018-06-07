import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/header.css';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google"> Login With Google </a>
                    </li>
                );
            default:
                return [
                    <li key="logout">
                        <a href="/api/logout">Logout</a>
                    </li>,
                    <li key="placeholder" />,
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper deep-orange lighten-1">
                    <Link to={this.props.auth ? '/dashboard' : '/'}>
                        <div className="logo left brand-logo ">
                            <span className="logo--first">Grub</span>
                            <span className="logo--second">Quest</span>
                        </div>
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
