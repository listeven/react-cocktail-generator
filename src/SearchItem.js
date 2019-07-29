import React from "react"

function SearchItem(props) {
    return(
        <div className="search-item">
            <a href="/#" onClick={() => props.handleSelectDrink(props.id)}>
                <img src={props.imgUrl} alt=""/>
                <p>{props.name}</p>
            </a>
        </div>
    )
}

export default SearchItem