import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class Landing extends Component {
    render() {
        if (this.props.auth) {
            const route = `dashboard/${moment().format('MM-D-YYYY')}`;
            return <Redirect to={route} />;
        }
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Welcome To GrubQuest</h1>
                <p>A place to manage your meals</p>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);
