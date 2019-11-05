import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { useStore } from '../../AppState';
import Colours from '../styled/Colours';
import { Button } from '../styled/Button';
import { Card, CardContent } from '../styled/Card';
import { Text } from '../styled/Fonts';
import { TextInput } from '../styled/Text';

const Container = styled.div`
  max-width: 300px;
  margin: auto;
`
const LinkSection = styled(Text)`
  color: ${Colours.primary};
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 0;
  text-align: center;
  &:visited {
    color: ${Colours.primary};
  }
`

function Register({ type = 'edu', onComplete, onLoginLink }) {
  // const { user } = useStore();
  return (
    <Container>
      <Card>
        <CardContent direction="column">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required('Please enter an email'),
              password: Yup.string().required('Please enter a password'),
            })}
            onSubmit={async ({ email, password }) => {
              // const data = await user.signup(email, email, password, type);
              // onComplete(data)
            }}
            render={props => (
              <form onSubmit={props.handleSubmit}>
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
                  Register
                </Button>
                <LinkSection>
                  <Button type="button" variant="link" onClick={() => onLoginLink()}>
                    Login
                  </Button>
                </LinkSection>
              </form>
          )} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
