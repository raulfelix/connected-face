import React, {useState} from 'react';
import { useStore } from '../../AppState';

function Pitch() {
  const { user } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div className="form">
      <h2>Project and content area</h2>
      <p>What are you trying to do and what kind of support are you looking for?</p>
      <div className="control">
        <div className="control_label">
          <label>Title</label>
        </div>
        <div className="control_field">
          <input type="text" />
        </div>
      </div>
      <div className="control">
        <div className="control_label">
          <label>Description</label>
        </div>
        <div className="control_field">
          <textarea placeholder="start typing"></textarea>
        </div>
      </div>
      <br/>
      <p>Please select any of the connect tags that are relevant to the nature of your project. If you dont find the ones you need you can create a custom tag.</p>
      <div>
       <input type="text" placeholder="Starting searching..." />
      </div>

      <button type="button" onClick={async () => {
        await user.createPitch({
          title,
          description,
          tags,
        })
      }}>Save your pitch</button>
    </div>
  )
}

export default Pitch;