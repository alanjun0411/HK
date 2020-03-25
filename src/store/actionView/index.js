export const viewChange = (value) => {
    return {
        type: 'viewChange',
        value
    }
}
export const mapCity = () => {
    return (dispatch) => {
        let AMap = window.AMap
        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              dispatch({
                type: 'mapCity',
                value: result.city
            })
            }
          })
        })
    }
}
export const mapCityList = (city) => {
  return (dispatch) => {
    dispatch({
      type: 'mapCity',
      value: city
    })
  }
}