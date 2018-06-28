import React, { Component } from 'react';

class BackButton extends Component {
    static contextTypes = {
        router: () => true
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
