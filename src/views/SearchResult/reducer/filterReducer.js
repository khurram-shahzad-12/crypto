export const filterReducer = (filterState, { type, payload }) => {
    switch (type) {
        case "CATEGORY":
            return {
                ...filterState,
                category: payload.check ? [...filterState.category, payload.option] : (filterState.category.length > 0 ? filterState.category.filter(item => item !== payload.option) : [])
            }
        case "SUBCATEGORY":
            return {
                ...filterState,
                subcategory: payload.check ? [...filterState.subcategory, payload.option] : (filterState.subcategory.length > 0 ? filterState.subcategory.filter(item => item !== payload.option) : [])
            }
        case "SUBSUBCATEGORY":
            return {
                ...filterState,
                subsubcategory: payload.check ? [...filterState.subsubcategory, payload.option] : (filterState.subsubcategory.length > 0 ? filterState.subsubcategory.filter(item => item !== payload.option) : [])
            }
        case "BRAND":
            return {
                ...filterState,
                brands: payload.check ? [...filterState.brands, payload.option] : (filterState.brands.length > 0 ? filterState.subcategory.filter(item => item !== payload.option) : [])
            }
        case "COLOR":
            return {
                ...filterState,
                colors: payload.check ? [...filterState.colors, payload.option] : (filterState.colors.length > 0 ? filterState.colors.filter(item => item !== payload.option) : [])
            }
        default:
            return filterState

    }
}