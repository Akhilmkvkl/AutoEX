
import Actions from '../Actions/Index'

const initialState={
    user:[],
    islogged:false,
    isAdmin:false,

}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case Actions.LOGIN:
            return{
                ...state,
                islogged:true
            }

            default:
                 return state
    }
}

export default authReducer