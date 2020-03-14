import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

import { fakeAuth } from '../../App';
import TextInput from '../auth/TextInput';
import TextArea from './TextArea';

const Contact = props => {
    const formik = useFormik({
        initialValues: {
          feedback: '',
          email: ''
        },
        onSubmit: values => {
            console.log(values);
        },
      });

    if (!fakeAuth.isAuthenticated) {
        return <Redirect to="/"/>
    }
  
    return (
      <div className="auth-form">
        <h3 className="text-center">Форма для зворотнього зв'язку</h3>
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                name="email"
                label="Електронна пошта"
                type="email"
                placeholder="example@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                
            />
            <TextArea
                name="feedback"
                label="Ваш відгук або пропозиція"
                type="textarea"
                placeholder="Ваш відгук або пропозиція..."
                onChange={formik.handleChange}
                value={formik.values.feedback}
            />
            <br />
            <button type="submit">Залишити відгук або пропозицію</button>
        </form>
      </div>
    );
}


export default Contact;
