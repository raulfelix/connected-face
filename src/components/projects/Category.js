import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import Autosuggest from './Autosuggest';
import {getTags} from '../../requests/Tags';
import { Button } from '../styled/Button';
import CreateNewTag from './CreateNewTag';

const TagContainer = styled.div`
  margin: 12px;
`

const Tag = styled.span`
  background-color: #dddddd;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
`

function Category({ project, onComplete }) {
  const [tags, setTags] = useState([]);
  const [isCreateTag, setIsCreateTag] = useState(false);

  return (
    <div className="form">
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
                      name: "Can't find what I am looking for"
                    }}
                    component={Autosuggest}
                  />
                  <TagContainer>
                    {
                      tags.map(tag => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                      ))
                    }
                  </TagContainer>
                </>
              )
            }
            <Button type="submit" variant="primary">Save</Button>
          </form>
        )}
      />
    </div>
  )
}

export default Category;