import 'bulma/css/bulma.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit,faSave } from '@fortawesome/free-solid-svg-icons';
import React,{useState} from 'react';
import Edit from './Edit';

function CharacterListItem(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [characterData, setCharacterData] = useState({ ...props.character });

    const charListItem = {
        marginTop: 'auto',
        marginBottom: 'auto'
    };

    const iconContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto'
    };

    const iconStyle = {
        margin: '10px',
    };

    const handleTrashClick = () => {
        props.onDelete(props.character.email);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setCharacterData({ ...props.character });
    };

    const handleSaveClick = () => {
        props.onEdit(props.character.email, characterData);
        setIsEditing(false);
    };


    const handleInputChange = (e, field) => {
        setCharacterData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const isFormValid = () => {
        return Object.values(characterData).every((value) => value.trim() !== '');
    };

    return (
        <div className="box">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img
                            src={props.character.avatarUrl}
                            alt={`Character avatar`}
                            className="is-rounded"
                        />
                    </figure>
                </div>
                <div style={charListItem} className="media-content">
                    {isEditing ? (
                        <Edit character={characterData} onInputChange={handleInputChange} />
                    ) : (
                        <div>
                            <p className="title is-5 has-text-centered">{props.character.name}</p>
                            <p className="subtitle is-6 has-text-centered">{props.character.email}</p>
                        </div>
                    )}
                </div>
                <div className="media-right">
                    <div style={iconContainerStyle}>
                        {isEditing ? (
                            <button className="button is-white" onClick={handleSaveClick} disabled={!isFormValid()}>
                            <span className="icon is-small">
                            <FontAwesomeIcon icon={faSave} />
                            </span>
                            </button>
                        ) : (
                            <button className="button is-white" onClick={handleEditClick}>
                            <span className="icon is-small">
                            <FontAwesomeIcon icon={faEdit} />
                            </span>
                            </button>
                        )}
                        {isEditing ? null : (
                            <button className="button is-white" onClick={handleTrashClick}>
                            <span className="icon is-small" style={iconStyle}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CharacterListItem;