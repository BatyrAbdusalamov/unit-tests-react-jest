import { createStore } from '@reduxjs/toolkit'
import cooks from './basefunction';
import { Filter } from './types';

export interface States{
  filter: string,
  typeFilter:Filter,
  JWT:string|undefined,
  location: string,
  selectedPage: number;
}

const defaultState:States = {
  filter: '',
  JWT: cooks.getJWT(),
  location: '*',
  selectedPage: 1,
  typeFilter:Filter.All,
}

type Action = {
  type:string,
  typeFilter?:Filter,
  buffer?:string,
  userId?:number,
  JWT?:string,
  setPage?:number,
}
const reducer = (state = defaultState, action:Action) => {

  switch (action.type){
    case 'Filter':
      if (( 'buffer' in action) && (action.buffer !== undefined) && ( 'typeFilter' in action ) && (action.typeFilter !== undefined)) {
        state = {...state,
          filter: action.buffer,
          typeFilter:action.typeFilter
        }
      }
      return state;
    case 'SetJWT':
        state = {...state,
          JWT: cooks.getJWT(),
      }
      return state;
    case 'DelJwt':
      state = {
        ...state,
        JWT:'',
      }
      cooks.LogOut()
      return state;
    case 'setLocation':
      state = {
        ...state,
        location: location.pathname,
      }
      return state;
    case 'dropLocation':
      state = {
        ...state,
        location: '*',
      }
      return state;
    case 'setPage':
      if ( ( 'setPage' in action ) && action.setPage !== undefined)
        state = {
          ...state,
          selectedPage: +action.setPage,
        }
      return state;
    case 'dropFilter':
      state = {
        ...state,
        filter: '',
        typeFilter: Filter.All,
      }
      return state
    default:
      return state;
  }
}

export const store = createStore(reducer)


