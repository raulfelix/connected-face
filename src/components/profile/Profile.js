import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Button } from '../styled/Button';
import { TextInput, TextAutosuggest } from '../styled/Text';
import { useStore } from '../../AppState';
import { getSchool } from '../../requests/Schools';

function Profile() {
  const { user } = useStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // will only run once
  useEffect(function() {
    user.fetchProfile().then(response => {
      console.log(response)
      if (response) {
        setProfile(response)
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {
        !loading && (
          <Formik
            initialValues={{
              firstName: profile ? profile.first_name : '',
              lastName: profile ? profile.last_name : '',
              position: profile ? profile.position : '',
              institution: profile ? profile.institution : '',
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
              if (profile) {
                user.updateProfile({ ...values, institutionId: values.institution.id})
              } else {
                user.createProfile({ ...values, institutionId: values.institution.id})
              }
            }}
            render={props => (
              <form className="form" onSubmit={props.handleSubmit}>
                <p>Please complete your profile so we can help connect you</p>
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
                <Button type="submit">
                  {profile ? 'Update' : 'Save'}
                </Button>
              </form>
            )}
          />
        )
      }
    </div>
  );
}

export default Profile;
