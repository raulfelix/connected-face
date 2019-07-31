import React, { useState, useEffect } from 'react';
import { useStore } from '../../AppState';
import Pitch from './Pitch';
import Activities from './Activities';
import Autosuggest from './Autosuggest';
import {getSchool} from '../../requests/Schools';

function InstitutionProfile() {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState({name: ''});
  const [position, setPosition] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // will only run once
  useEffect(function() {
    user.fetchProfile().then(response => {
      console.log(response)
      setFirstName(response.first_name)
      setLastName(response.last_name)
      setPosition(response.position)
      setSchool(response.school)
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {
        !loading && (
          <>
            <div className="form">
              <h1>Great news, you are on your way to becoming connect-ed with different community partners.</h1>
              <p>Please complete your profile so we can help connect you</p>
              <div className="control">
                <div className="control_label">
                  <label>First name</label>
                </div>
                <div className="control_field">
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value) } />
                </div>
              </div>
              <div className="control">
                <div className="control_label">
                  <label>Last name</label>
                </div>
                <div className="control_field">
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value) } />
                </div>
              </div>
              <div className="control">
                <div className="control_label">
                  <label>Which school do you work for?</label>
                </div>
                <div className="control_field">
                  <Autosuggest
                    value={school.name}
                    placeholder="Search by school name"
                    onSelect={item => setSchool(item)}
                    fetcher={getSchool}
                  />
                </div>
              </div>
              <div className="control">
                <div className="control_label">
                  <label>What is your position?</label>
                </div>
                <div className="control_field">
                  <input type="text" value={position} onChange={e => setPosition(e.target.value) } />
                </div>
              </div>
              <button type="button" onClick={async () => {
                await user.updateProfile({
                  firstName,
                  lastName,
                  position,
                  institutionId: school.id
                })
              }}>Save</button>
            </div>
            {
              school.name && <Pitch />
            }
          </>
        )
      }
    </div>
  );
}

export default InstitutionProfile;
