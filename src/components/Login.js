import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import { useStore } from '../AppState';
import { Button } from './styled/Button';
import { Card, CardContent } from './styled/Card';
import { fontBold, H2, fontMedium, Text, focus } from './styled/Fonts';
import { TextInput } from './styled/Text';
import googleIcon from '../images/google.png';
import Colours from './styled/Colours';
import Media from './styled/Media';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
  max-width: 760px;
  margin: auto;

  @media ${Media.mobile} {
    min-height: auto;
    padding-top: 100px;
  }
`;

const SocialLogin = styled.div`
  p {
    font-family: ${fontBold};
    }
  ul {
    padding: 0;
    margin: 0;
  }
  ul li {
    list-style: none;
  }

  @media ${Media.mobile} {
    margin-top: 2rem;
  }
`;

const SocialButton = styled.a`
  background-color: transparent;
  border: 3px solid ${Colours.primary};
  color: ${Colours.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: ${fontMedium};
  font-size: 20px;
  padding: 2rem;

  text-decoration: none;
  &:hover {
    cursor: pointer;
  }

  ${focus};

  img {
    display: inline-block;
    vertical-align: middle;
    height: 40px;
    margin-bottom: 1rem;
  }
`
const Register = styled(Text)`
  color: ${Colours.primary};
  font-size: 14px;
  margin-top: 26px;
  text-align: center;
  &:visited {
    color: ${Colours.primary};
  }
`

function Login({ history }) {
  const { user } = useStore();
  return (
    <Container className="row">
      <div className="col-sm-6 col-xs-12">
        <Card>
          <CardContent direction="column">
            <H2>Login</H2>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required('Please enter your email'),
                password: Yup.string().required('Please enter your password'),
              })}
              onSubmit={async ({ email, password }) => {
                const data = await user.login(email, password)
                if (data.isProfileComplete) {
                  history.replace('/')
                } else {
                  history.replace(user.profileRoute)
                }
              }}
              render={props => (
                <form role="form" onSubmit={props.handleSubmit}>
                  <Field
                    label="Email"
                    name="email"
                    value={props.values.email}
                    component={TextInput}
                  />
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={props.values.password}
                    component={TextInput}
                  />
                <Button type="submit" stretch variant="primary" className="mt-2">
                  Login
                </Button>
                <Register><Link to="/register/education">Create an account </Link></Register>
              </form>
            )}
            />
          </CardContent>
        </Card>
      </div>
      <div className="col-sm-6 col-xs-12">
        <SocialLogin>
          <H2>Or login using</H2>
          <ul>
            <li>
              <SocialButton href="http://127.0.0.1:3333/login/google">
                <img src={googleIcon} alt="Google" />
                Google
              </SocialButton>
            </li>
          </ul>
        </SocialLogin>
      </div>
    </Container>
  );
}

export default withRouter(Login);
