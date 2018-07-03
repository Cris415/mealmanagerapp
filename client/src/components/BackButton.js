import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BackButton extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <button
                className="btn"
                onClick={this.context.router.history.goBack}>
                Back
            </button>
        );
    }
}

export default BackButton;
