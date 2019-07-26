import React, { useState, useEffect } from 'react';
import { useStore } from '../AppState';
import InstitutionProfile from './profile/InstitutionProfile';

function Profile() {
  const { user } = useStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  // will only run once
  useEffect(function() {
    user.fetchProfile().then(response => {
      console.log(response)
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setLoading(false);
    });
  }, []);

  return (
    <>
      You have indicated you are an {user.type === 'edu' ? 'Educator' : 'Professional'}
      {
        loading && <span>Is loading</span>
      }
      {
        !loading && (
          <>
            <div>
              <label>First name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value) } />
            </div>
            <div>
              <label>Last name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value) } />
            </div>
          </>
        )
      }
      <button type="button" onClick={async () => {
        await user.updateProfile({
          firstName,
          lastName
        })
      }}>Save</button>

      {user.type === 'edu' && <InstitutionProfile />}
    </>
  );
}

export default Profile;
