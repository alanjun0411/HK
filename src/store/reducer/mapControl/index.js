const defaultState = {
    mapCity: '广州'
}

export default (state = defaultState, action) =>{
    if (action.type === 'mapCity') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.mapCity = action.value.slice(0,action.value.indexOf('市'))
        // console.log(newState);
        return newState
    }
    return state
}