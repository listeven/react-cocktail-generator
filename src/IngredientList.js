import React from "react"
import Ingredient from "./Ingredient"

function IngredientList(props) {
    const ingredientData = [props.data.drink.strIngredient1, props.data.drink.strIngredient2, props.data.drink.strIngredient3, props.data.drink.strIngredient4, props.data.drink.strIngredient5, props.data.drink.strIngredient6, props.data.drink.strIngredient7, props.data.drink.strIngredient8, props.data.drink.strIngredient9, props.data.drink.strIngredient10, props.data.drink.strIngredient11, props.data.drink.strIngredient12, props.data.drink.strIngredient13, props.data.drink.strIngredient14, props.data.drink.strIngredient15]
    const measureData = [props.data.drink.strMeasure1, props.data.drink.strMeasure2, props.data.drink.strMeasure3, props.data.drink.strMeasure4, props.data.drink.strMeasure5, props.data.drink.strMeasure6, props.data.drink.strIngredient7, props.data.drink.strMeasure8, props.data.drink.strMeasure9, props.data.drink.strMeasure10, props.data.drink.strMeasure11, props.data.drink.strMeasure12, props.data.drink.strMeasure13, props.data.drink.strMeasure14, props.data.drink.strMeasure15]
    
    // Some measurements have a space at the end, some do not so make them all have a space at the end
    const measureArray = measureData.map(item => {
        if(item !== "" && item != null){
            if(!item.endsWith(" "))
                return item+" "
        }
        return item
    })
    // Create array of ingredient name strings
    const ingredientArray = ingredientData.map(item => {
        return (typeof item === 'undefined' || item == null) ? "" : item
    })

    const ingList = ingredientArray.map((item, index) => 
        {
            return(
                item !== "" &&
                <Ingredient
                    key = {index}
                    name = {item}
                    measure = {measureArray[index]}
                    handleSelectIngredient = {props.handleSelectIngredient}
                /> 
            )
        }
    )

    return(
        <div className="ingredients">
            {ingList}
        </div>
    )
}

export default IngredientList