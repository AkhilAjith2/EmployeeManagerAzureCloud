import React from 'react';
import 'bulma/css/bulma.min.css';

function Edit(props) {
  const { character, onInputChange } = props;

  return (
    <div className="form">
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Name ..."
          value={character.name}
          onChange={(e) => onInputChange(e, 'name')}
        />
      </div>
      <div className="field">
        <input
          className="input"
          type="email"
          placeholder="Email ..."
          value={character.email}
          onChange={(e) => onInputChange(e, 'email')}
        />
      </div>
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Avatar Url ..."
          value={character.avatarUrl}
          onChange={(e) => onInputChange(e, 'avatarUrl')}
        />
      </div>
    </div>
  );
}

export default Edit;