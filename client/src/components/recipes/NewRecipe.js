import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createRecipe } from '../../actions';

class NewRecipe extends Component {
    renderField(field) {
        const {
            meta: { touched, error },
        } = field;

        const className = `form-group ${touched && error ? 'red-text ' : ''}`;
        if (field.input.name === 'steps') {
            return (
                <div className={className}>
                    <label>{field.label}</label>
                    <textarea
                        className="form-control materialize-textarea"
                        // cols="30"
                        // rows="300"
                        {...field.input}
                    />
                    <div className="text-help">{touched ? error : ''}</div>
                </div>
            );
        }
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.createRecipe(values, () => {
            this.props.history.push('/recipes');
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                className="container"
            >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Ingredients"
                    name="ingredients"
                    component={this.renderField}
                />
                <Field
                    label="Recipe Steps"
                    name="steps"
                    component={this.renderField}
                />
                <Field
                    label="Image URl"
                    name="image"
                    component={this.renderField}
                />
                <Field
                    label="Recipe Total Time"
                    name="time"
                    component={this.renderField}
                />
                <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light right"
                >
                    Submit
                </button>
                <Link className="btn red left" to="/dashboard">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is atleast three characters';
    }
    if (!values.ingredients) {
        errors.ingredients = 'Enter atleast one ingredient';
    }
    if (!values.steps) {
        errors.steps = 'Enter instructions for this recipe';
    }
    //TODO: Validate time to be number
    return errors;
}

export default reduxForm({ validate, form: 'PostsNewForm' })(
    connect(null, { createRecipe })(NewRecipe)
);
