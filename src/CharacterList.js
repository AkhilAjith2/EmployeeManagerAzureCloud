
import CharacterListItem from './CharacterListItem';
import React from 'react';

function CharacterList(props) {

  const charListBox = {
    width: '80%',
    margin: 'auto',
    marginBottom: '20px',
    backgroundColor: 'rgba(128, 128, 128,0.05)'
  };

  return (
      <div style={charListBox} className="box">
          <ul>
            {props.data.map((character,index) => <CharacterListItem id={index} character={character} onDelete={props.onDelete} onEdit={props.onEdit}/>)}
          </ul>
      </div>
  );
}

export default CharacterList;