import React from 'react';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field } from 'formik';
import { Button } from '../styled/Button';
import { TextInput, TextAutosuggest } from '../styled/Text';
import { getSchool } from '../../requests/Schools';
import { HeadingLevelOne } from '../styled/Fonts';

const CREATE_PROFILE = gql`
  mutation createProfile($email: String!, $id: ID, $firstName: String!, $lastName: String!, $position: String!, $institutionId: ID!) {
    profile(email: $email, id: $id, firstName: $firstName, lastName: $lastName, position: $position, institutionId: $institutionId) {
      id
    }
  }
`;

function ProfileForm({ data, email }) {
  const { profile } = data;
  const [saveProfile, { loading, error }] = useMutation(
    CREATE_PROFILE,
    {
      onCompleted({ id }) {
        console.log('Done', id)
      }
    }
  );

  return (
    <Formik
      initialValues={{
        firstName: profile.firstName ? profile.firstName : '',
        lastName: profile.lastName ? profile.lastName : '',
        position: profile.position ? profile.position : '',
        institution: profile.institution ? profile.institution : '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        position: Yup.string().required('Please enter your position'),
        institution: Yup.object()
          .required('Please find your school')
          .typeError('Please find your school')
      })}
      onSubmit={values => {
        saveProfile({
          variables: {
            email,
            id: profile.id,
            firstName: values.firstName,
            lastName: values.lastName,
            position: values.position,
            institutionId: values.institution.id
          }
        })
      }}
      render={props => (
        <form className="form" onSubmit={props.handleSubmit}>
          <HeadingLevelOne className="spacing-4x">Please complete your profile so we can help connect you</HeadingLevelOne>
          <Field
            label="First name"
            name="firstName"
            value={props.values.firstName}
            component={TextInput}
          />
          <Field
            label="Last name"
            name="lastName"
            value={props.values.lastName}
            component={TextInput}
          />
          <Field
            label="Which school do you work for?"
            name="institution"
            value={props.values.institution ? props.values.institution.name : ""}
            placeholder="Search by school name"
            onSelect={item => {props.values.institution = item}}
            fetcher={getSchool}
            component={TextAutosuggest}
          />
          <Field
            label="Position"
            name="position"
            value={props.values.position}
            component={TextInput}
          />
          <Button type="submit" variant="primary">
            {loading ? 'Loading' : 'Save'}
          </Button>
        </form>
      )}
    />
  );
}

export default ProfileForm;
