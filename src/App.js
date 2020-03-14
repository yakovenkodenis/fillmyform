import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import classnames from 'classnames';

import WizardForm from './components/form-fields/WizardForm';
import { formSetup1, formSetup3, formSetup10 } from "./components/form-fields/formSetup";
import CollapsibleDropdown from './components/sidebar/CollapsibleDropdown';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Contact from './components/contact/Contact';


export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
  {
    path: "/",
    exact: true,
    main: () => (
      <>
        <h2>Головна сторінка</h2>
        <div>Автоматичне заповнення деяких форм заяв, визначених наказом Мін'юсту №3268/5 від 18.11.2016 "Про затвердження форм заяв у сфері державної реєстрації юридичних осіб, фізичних осіб - підприємців та громадських формувань"</div>
      </>
    )
  },
  {
    path: "/form3",
    main: () => <WizardForm formSetup={formSetup3} />
  },
  {
    path: "/form1",
    main: () => <WizardForm formSetup={formSetup1} />
  },
  {
    path: "/form10",
    main: () => <WizardForm formSetup={formSetup10} />
  },
  {
    path: "/about",
    main: () => <h2>Про нас</h2>
  },
  {
    path: "/contact",
    main: () => <Contact />
  },
  {
    path: "/forms",
    main: () => <h2>Перелік доступних форм</h2>
  },
  {
    path: "/login",
    main: () => <Login />
  },
  {
    path: "/register",
    main: () => <Register />
  }
];

const toggleNavLinkActive = (actualUrl, navlinkUrl) =>
  Object.is(actualUrl, navlinkUrl)
  ? 'active'
  : '';

function App() {

  const [sidebarShow, toggleSidebarShow] = useState(false);
  const sidebarClassName = classnames({
    'active': sidebarShow
  });

  const location = useLocation();

  return (
    <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar" className={sidebarClassName}>
            <div className="sidebar-header">
                <h3>Fill My Form</h3>
            </div>

            <ul className="list-unstyled components">
                <p>Головне меню:</p>
                <li className={toggleNavLinkActive(location.pathname, '/')}>
                  <Link to="/">Головна</Link>
                </li>
                <CollapsibleDropdown
                  name="Форми"
                  items={[
                    {name: "Форма 1", href: "/form1"}, {name: "Форма 3", href: "/form3"},
                    {name: "Форма 10", href: "/form10"}
                  ]}
                  toggleActive={toggleNavLinkActive}
                />
                <li className={toggleNavLinkActive(location.pathname, '/about')}>
                  <Link to="/about">Про нас</Link>
                </li>
                <li className={toggleNavLinkActive(location.pathname, '/contact')}>
                  <Link to="/contact">Зворотній зв'язок</Link>
                </li>
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                  {
                    fakeAuth.isAuthenticated
                    ? <Link to="/" className="download" onClick={() => fakeAuth.signout()}>Вихід</Link>
                    : <Link to="/login" className="download">Логін</Link>
                  }
                </li>
                {
                  !fakeAuth.isAuthenticated && (
                    <li>
                        <Link to="/register" className="article">Реєстрація</Link>
                    </li>
                  )
                }
            </ul>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">

                  <button
                    type="button" id="sidebarCollapse" className="btn btn-info"
                    onClick={() => { toggleSidebarShow(!sidebarShow); }}
                  >
                      <i className="fas fa-align-left"></i>
                      <span>
                        { !sidebarShow
                          ? " Сховати меню"
                          : " Розкрити меню"
                        }
                        </span>
                  </button>
                  <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <i className="fas fa-align-justify"></i>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="nav navbar-nav ml-auto">
                          <li className={`nav-item ${toggleNavLinkActive(location.pathname, '/')}`}>
                              <Link className="nav-link" to="/">Головна</Link>
                          </li>
                          <li className={`nav-item ${toggleNavLinkActive(location.pathname, '/forms')}`}>
                              <Link className="nav-link" to="/forms">Форми</Link>
                          </li>
                          <li className={`nav-item ${toggleNavLinkActive(location.pathname, '/about')}`}>
                              <Link className="nav-link" to="/about">Про нас</Link>
                          </li>
                          <li className={`nav-item ${toggleNavLinkActive(location.pathname, '/contact')}`}>
                              <Link className="nav-link" to="/contact">Зворотній зв'язок</Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
            <Route path="*">
              Сторінка за даною адресою
              (<Link style={{textDecoration: 'underline'}}to={location.pathname}>{`${window.location.host}${location.pathname}`}</Link>)
               відсутня.
              <br />
              Ось тобі перелік доступних посилань на нашому ресурсі:
              <ul>
                <li>001</li>
                <li>002</li>
                <li>003</li>
                <li>004</li>
              </ul>
            </Route>
          </Switch>

        </div>
    </div>
  );
}

export default App;