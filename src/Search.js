
import 'bulma/css/bulma.min.css'
import React,{ useState } from 'react';

function SearchBar(props) {

    const [searchTerm1,setSearchTerm] = useState("");

    const searchContainerStyle = {
        width: '70%',
        margin: 'auto',
        marginTop: '40px',
        marginBottom: '40px',
        backgroundColor: 'rgba(128, 128, 128,0.05)'
    };

    const handleSearchClick = () => {
        props.onSearch(searchTerm1); 
    };

    return (
        <div style={searchContainerStyle} className="box">
        <div className="field is-grouped">
            <div style={{ flex: '1' }}>
            <input 
                style={{width: '95%'}} 
                className="input" 
                type="text" 
                placeholder="Search term ..."
                value={searchTerm1}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <button className="button is-primary" onClick={handleSearchClick}>Search</button>
        </div>
        </div>
    );
}

export default SearchBar;