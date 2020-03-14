import { withFormik } from "formik";
export const decorateWizardWithFormik = (Component, initialData) =>
  withFormik({
    mapPropsToValues: () => ({}),

    handleSubmit: (values, { setSubmitting }) => {
      window.pay("Заповнена форма", "2");

      console.log("onSubmit", values);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
    displayName: "MyWizardForm"
  })(Component);
