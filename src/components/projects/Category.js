import React, { useState } from 'react';
import styled from 'styled-components'
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import Autosuggest from './Autosuggest';
import {getTags} from '../../requests/Tags';
import { Button } from '../styled/Button';
import CreateNewTag from './CreateNewTag';
import Pill from '../styled/Pill';

const Container = styled.div``;
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  min-height: 60px;
  margin-bottom: 40px;
`

function Category({ isLastStep, onComplete }) {
  const [tags, setTags] = useState([]);
  const [isCreateTag, setIsCreateTag] = useState(false);

  return (
    <Container>
      <Formik
        initialValues={{ tags: [] }}
        validationSchema={Yup.object().shape({
          tags: Yup.array().required('Please enter at least 1 tag'),
        })}
        onSubmit={values => onComplete(values)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            {
              isCreateTag ? (
              <CreateNewTag
                onComplete={() => setIsCreateTag(false)}
                />
              ) : (
                <>
                  <Field
                    label="Search for tags"
                    name="tags"
                    value=""
                    placeholder="Type to search"
                    onSelect={item => {
                      if (item.id === -100) {
                        setIsCreateTag(true)
                      } else {
                        const t = tags.slice()
                        t.push(item)
                        setTags(t);
                        props.values.tags = t;
                      }
                    }}
                    onChange={() => {}}
                    fetcher={getTags}
                    lastOption={{
                      id: -100,
                      name: "Can't find it?"
                    }}
                    clearOnSelect
                    component={Autosuggest}
                  />
                  <TagContainer>
                    {
                      tags.map(tag => (
                        <Pill
                          key={tag.id}
                          data={tag}
                          onDimiss={data => {
                            const tagsCopy = tags.slice()
                            const i = tagsCopy.findIndex(t => t.id === data.id)
                            tagsCopy.splice(i, 1)
                            setTags(tagsCopy)
                          }}
                        />
                      ))
                    }
                  </TagContainer>
                </>
              )
            }
            {
              isLastStep ? (
                <Button type="submit" variant="primary">Finish and save</Button>
              ) : (
                <Button type="submit" variant="secondary">Next</Button>
              )
            }
            
          </form>
        )}
      />
    </Container>
  )
}

export default Category;