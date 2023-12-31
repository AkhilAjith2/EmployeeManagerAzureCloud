
import React,{ useState } from 'react';
import 'bulma/css/bulma.min.css'

function CharacterForm(props) {

  const [character, setCharacter] = useState({name: '',email: '',avatarUrl: '',});

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAdd = () => {
    props.onAdd(character);
    setCharacter({
      name: '',
      email: '',
      avatarUrl: '',
    });
  };

  const handleInputChange = (e, field) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [field]: e.target.value,
    }));
  };

  const isAddButtonDisabled = () => {
    return !character.name || !character.email || !character.avatarUrl;
  };

  const listItemStyle = {
    width: '80%',
    margin: '0 auto',
    marginBottom: '20px',
    backgroundColor: 'rgba(128, 128, 128,0.05)'
  };

  const buttonStyle = {
    backgroundColor: isAddButtonDisabled() ? 'lightgrey' : 'rgba(0,255,196)',
  };

  return (
      <form style={listItemStyle} className="box" onSubmit={handleSubmit}>
        <div className="field">
            <input className="input" type="text" placeholder="Name ..." value={character.name} onChange={(e) => handleInputChange(e, 'name')}/>
        </div>
        <div className="field">
            <input className="input" type="email" placeholder="Email ..." value={character.email} onChange={(e) => handleInputChange(e, 'email')}/>
        </div>
        <div className="field">
            <input className="input" type="text" placeholder="Avatar Url ..." value={character.avatarUrl} onChange={(e) => handleInputChange(e, 'avatarUrl')}/>
        </div>

        <div className="field is-grouped is-grouped-right">
        <button className={`button is-primary`} onClick={handleAdd} disabled={isAddButtonDisabled()} style={buttonStyle}>Add</button>
        </div>
      </form>

  );
}

export default CharacterForm;