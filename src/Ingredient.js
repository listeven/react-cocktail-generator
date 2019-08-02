import React from "react"

function Ingredient(props) {
    const baseUrl = "https://www.thecocktaildb.com/images/ingredients/"
    const ingName =  props.name.split(' ').join("%20") // If name has spaces, replace with "%20" for URL
    const imgUrl = baseUrl + ingName + "-Small.png"
    
    return(
        <div className="ingredient">
            <a href="/#" onClick={() => props.handleSelectIngredient(ingName)}>
                <img src={imgUrl} alt=""/>
                <p>{props.measure} {props.name}</p>
            </a>
        </div>
    )
}

export default Ingredient
