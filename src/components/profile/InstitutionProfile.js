import React, { useState, useEffect } from 'react';
import { useStore } from '../../AppState';

function InstitutionProfile() {
  const { user } = useStore();
  const [school, setSchool] = useState('');
  return (
    <div>
      Which school do you work for?
      <div>
        <label>Find your school</label>
        <input type="text" value={school} onChange={e => setSchool(e.target.value) } />
      </div>
    </div>
  );
}

export default InstitutionProfile;
