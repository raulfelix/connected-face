import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useStore } from '../../AppState';
import { Button } from '../styled/Button';

function CreateNewTag({ onComplete }) {
  const { projectStore } = useStore();
  const [name, setName] = useState([]);

  return (
    <div className="form">
      <p>Create a category for your project.</p>
      <div className="control">
        <div className="control_label">
          <label>Name</label>
        </div>
        <div className="control_field">
          <input type="text" value={name} onChange={e => setName(e.target.value) } />
        </div>
      </div>
      <Button type="button" onClick={async () => {
        await projectStore.createTag({ name })
        onComplete()
      }}>Save</Button>
      <Button type="button" variant="link" onClick={() => onComplete()}>Cancel</Button>
    </div>
  )
}

export default CreateNewTag;