import React from "react"
import SearchItem from "./SearchItem"
import Ingredient from "./Ingredient"

function SearchResults(props){
    const searchItems = props.data.displayIngredient ? 
    props.data.results.map(item =>
    <Ingredient
        key={item.idIngredient}
        id={item.idIngredient}
        name={item.strIngredient}
        handleSelectIngredient={props.handleSelectIngredient}
    />)
    :props.data.results.map(item => 
    <SearchItem 
        key={item.idDrink} 
        id={item.idDrink}
        name={item.strDrink} 
        imgUrl={item.strDrinkThumb} 
        handleSelectDrink={props.handleSelectDrink}
    />)

    return(
        <div className="search-results">
            {searchItems.length > 0 ? searchItems : <p> {props.data.message} </p>}
        </div>
    )
}

export default SearchResults