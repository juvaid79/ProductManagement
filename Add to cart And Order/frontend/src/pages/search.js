
import React, { useState } from 'react'


const Search = (props) => {
    const [item, setItem] = useState();
    const changeHandeler = (e) => {
        setItem(e.target.value);
    }

    function getbyid() {
        props.getbyid(item)
    }


    return (
        <>

            <div class="search">
                <input type="text" name='product' onChange={(e) => changeHandeler(e)} autoComplete="off" placeholder='Enter product name' required />
                <button onClick={() => getbyid()} class="button">Search</button>
            </div>
        </>
    )
}

export default Search;