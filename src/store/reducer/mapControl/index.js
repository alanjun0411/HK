const defaultState = {
    mapCity: '广州'
}

export default (state = defaultState, action) =>{
    if (action.type === 'mapCity') {
        let newState = JSON.parse(JSON.stringify(state))
        if (action.value.indexOf('市') !== -1) {
            newState.mapCity = action.value.slice(0,action.value.indexOf('市'))
        }else{
            newState.mapCity = action.value
        }
        return newState
    }
    return state
}