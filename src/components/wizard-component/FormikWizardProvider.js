import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import './style.css';

class FormikWizardProvider extends React.Component {
  componentDidMount() {
    this.props.validateForm();
  }

  getValidators(validatorFuncs) {
    return validatorFuncs.map(func => () => func({ ...this.props }));
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Form className="main-form">
        {props.formSetup && <h3 className="text-center">{props.formSetup.name}</h3>}
        {this.props.children({
          getValidators: validators => this.getValidators(validators),
          ...props,
        })}
      </Form>
    );
  }
}

FormikWizardProvider.propTypes = {
  validateForm: PropTypes.func,
  children: PropTypes.func,
};

export default FormikWizardProvider;