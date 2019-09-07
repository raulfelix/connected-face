import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, } from 'formik';
import { Button } from '../styled/Button';
import { TextInput } from '../styled/Text';

function Pitch({ onNext }) {
  return (
    <div className="form">
      <Formik
        initialValues={{
          title: '',
          description: ''
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Please enter a title'),
          description: Yup.string().required('Please enter a description')
        })}
        onSubmit={(values, actions) => onNext(values)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Field
              label="Title"
              name="title"
              value={props.values.title}
              component={TextInput}
            />
            <Field
              type="textarea"
              label="Description"
              name="description"
              value={props.values.description}
              component={TextInput}
            />
            <Button type="submit">Next</Button>
          </form>
        )}
      />
    </div>
  )
}

export default Pitch;