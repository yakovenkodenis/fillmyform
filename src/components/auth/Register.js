import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { fakeAuth } from '../../App';
import TextInput from './TextInput';
import Checkbox from './Checkbox';

const Register = props => {
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = (credentials) => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
    };

    const formik = useFormik({
        initialValues: {
          phone: '',
          password: '',
          acceptedTerms: false
        },
        onSubmit: values => {
            console.log(values);    
            login(values);
        },
      });
  
    return (
      <div className="auth-form">
        <h3 className="text-center">Реєстрація</h3>
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                name="phone"
                label="Номер телефону"
                type="tel"
                placeholder="380501234567"
                onChange={formik.handleChange}
                value={formik.values.phone}
                
            />
            <TextInput
                name="password"
                label="Пароль"
                type="password"
                placeholder="Ваш пароль..."
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <Checkbox
                name="acceptedTerms"
                label="Прийняти умови публічної оферти"
                onChange={formik.handleChange}
                value={formik.values.acceptedTerms}
                url="/terms"
            />
            <br />
            <button type="submit">Зареєструватися</button>
        </form>
      </div>
    );
}


export default Register;
