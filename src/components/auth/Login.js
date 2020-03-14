import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { fakeAuth } from '../../App';
import TextInput from './TextInput';
// import Checkbox from './Checkbox';

const Login = props => {
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
          password: ''
        },
        onSubmit: values => {
            console.log(values);    
            login(values);
        },
      });
  
    return (
      <div className="auth-form">
        <h3 className="text-center">Логін</h3>
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
            <br />
            <button type="submit">Логін</button>
        </form>
      </div>
    );
}


export default Login;
