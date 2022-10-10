

const initialState= null


const notificationReducer = (state = initialState, action) => {

    switch(action.type){
      case 'SET_MESSAGE': 
        return `${action.message}`
      default: 
        return initialState
    }
}

export const messageChange = (message) => {
    return {
        type:'SET_MESSAGE',
        message
    }
}

export const messageDefault = () => {
    return {
        type: ''
    }
}


export default notificationReducer; 