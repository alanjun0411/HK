const defaultState = {
    pathChange: true
}

export default (state = defaultState, action) =>{
    if (action.type === 'viewChange') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.pathChange = action.value
        return newState
    }
    return state
}