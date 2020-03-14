import React from "react";
import {
  FormikWizardProvider,
  Wizard,
  StepsList,
  Step,
  ButtonsList,
  PreviousButton,
  NextButton,
  SubmitButton
} from "../wizard-component/index";
// import axios from 'axios';

import {
  MyTextInput,
  MyCheckbox,
  MySelect,
  RadioButtonGroup,
  TextArea
} from "./formComponents";
import { decorateWizardWithFormik } from "./decorateWithFormik";

// import { formSetup } from "./formSetup";

const checkVisibility = (field, props) => {
  // radio button visibility
  if (field.props && field.props.visibilityRadio) {
    if (props.values[field.props.visibilityRadio.name]) {
      if (
        props.values[field.props.visibilityRadio.name]
        !== field.props.visibilityRadio.value
      ) {
        return false;
      }

      if (
        field.props.visibilityRadio.dependancies
        && Array.isArray(field.props.visibilityRadio.dependancies)
      ) {
          const visibilityArr =
            field.props.visibilityRadio.dependancies.map(dep => {
              return props.values[dep.name] === dep.value;
          });

        if (visibilityArr.some(e => !e)) {
          return false;
        }
      }

    } else {
      return false;
    }
  }

  // checkbox visibility
  if (field.props && field.props.visibilityCheckbox) {
    if (Array.isArray(field.props.visibilityCheckbox)) {
      const visibilityValues = [];

      field.props.visibilityCheckbox.forEach(checkbox => {
        if (checkbox[0] !== '!') {
          visibilityValues.push(!props.values[checkbox])
        } else {
          visibilityValues.push(props.values[checkbox.slice(1)])
        }
      });

      // console.log('Visibility array: ', visibilityValues);
      if (visibilityValues.every(x => !!x)) {
        return false;
      }

    } else {
      if (
        field.props.visibilityCheckbox[0] !== '!'
        && !props.values[field.props.visibilityCheckbox]
      ) {
        // console.log('HMM: ', props.values, field.props.visibilityCheckbox);
        return false;
      }

      if (
        field.props.visibilityCheckbox[0] === '!'
        && props.values[field.props.visibilityCheckbox.slice(1)]
      ) {
        return false;
      }
    }
  }

  // value visibility
  if (field.props && field.props.visibilityValue) {
    if (Array.isArray(field.props.visibilityValue)) {
      const visibilityArr =
        field.props.visibilityValue.map(dep => {
          return props.values[dep.name] === dep.value;
      });

      if (visibilityArr.some(e => !e)) {
        return false;
      }
    } else {
      if (props.values[field.props.visibilityValue.name]) {
        if (
          props.values[field.props.visibilityValue.name]
          !== field.props.visibilityValue.value
        ) {
          return false;
        }
  
      } else {
        return false;
      }
    }
  }

  return true;
}

const getFieldComponent = (field, props) => {
  if (!checkVisibility(field, props)) return null;

  const fieldProps = {
    formik: props,
    key: field.props.name,
    displayOption: {
      values: props.values, visibility: field.props.visibilityCheckbox
    },
    ...field.props
  };

  switch (field.type) {
    case "input":
      return <MyTextInput {...fieldProps} />;
    case "radio":
      return <RadioButtonGroup {...fieldProps} />;
    case "checkbox":
      return <MyCheckbox {...fieldProps} />;
    case "select":
      return <MySelect {...fieldProps} />;
    case "textarea":
      return <TextArea {...fieldProps} />

    default:
      return null;
  }
}


const WizardForm = props => {

  const isLoading = false;
  const { formSetup } = props;

  return isLoading
      ? <h3>Loading...</h3>
      : (
        <FormikWizardProvider {...props}>
          {renderProps => (
            <Wizard {...renderProps}>
              <StepsList>
                {formSetup.pages.map(page => (
                  <Step
                    title={page.name}
                    key={page.name}
                    component={() =>
                      page.fields.map(field => {
                        if (
                          field.type === 'group'
                          && field.groupItems
                          && Array.isArray(field.groupItems)
                        ) {
                          const fieldSetItems = field.groupItems.map(item => getFieldComponent(item, props));

                          if (fieldSetItems.every(item => Object.is(item, null))) return null;

                          return (
                            <fieldset key={field.name}>
                              <legend>{field.name}</legend>
                              {fieldSetItems}
                            </fieldset>
                          );
                        } else return getFieldComponent(field, props);
                      })
                    }
                  />
                ))}
              </StepsList>
              <ButtonsList>
                <PreviousButton />
                <NextButton />
                <SubmitButton />
              </ButtonsList>
            </Wizard>
          )}
        </FormikWizardProvider>
    );
};

export default decorateWizardWithFormik(WizardForm);
