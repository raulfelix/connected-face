import React, { useState, useEffect } from 'react';
import { useStore } from '../../AppState';
import { Button } from '../styled/Button';
import { TextInput } from '../styled/Text';

function CreateNewTag({ onComplete }) {
  const { projectStore } = useStore();
  const [name, setName] = useState([]);

  return (
    <div className="form">
      <p>Create a category for your project.</p>
      <TextInput
        form={
          {touched: {}, errors: {}}
        }
        field={
          {name: "tag"}
        }
        label="Add a custom tag"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button type="button" onClick={async () => {
        await projectStore.createTag({ name })
        onComplete()
      }}>Save</Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => onComplete()}
      >
        Cancel
      </Button>
    </div>
  )
}

export default CreateNewTag;