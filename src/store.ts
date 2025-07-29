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
  JWT: cooks.getJWT() || '',
  location: '*',
  selectedPage: 1,
  typeFilter:Filter.All,
}

type Action = {
  type:string,
  typeFilter?:Filter,
  filter?:string,
  userId?:number,
  JWT?:string,
  selectedPage?:number,
  location?: string
}
export const reducer = (state = defaultState, action:Action) => {
  switch (action.type){
    case 'Filter':
      if (( 'filter' in action) && (action.filter !== undefined) && ( 'typeFilter' in action ) && (action.typeFilter !== undefined)) {
        state = {...state,
          filter: action.filter,
          typeFilter:action.typeFilter
        }
      }
      return state;
    case 'SetJWT':
        state = {...state,
          JWT: action.JWT ?? cooks.getJWT(),
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
        location: action.location || location.pathname,
      }
      return state;
    case 'dropLocation':
      state = {
        ...state,
        location: '*',
      }
      return state;
    case 'setPage':
      if ( ( 'selectedPage' in action ) && action.selectedPage !== undefined)
        state = {
          ...state,
          selectedPage: +action.selectedPage,
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


