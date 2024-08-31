import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './index'

interface SidebarSlice {
  sidebarEnabled: 'yes' | 'no'
}

const initialState: SidebarSlice = {
  sidebarEnabled:
    localStorage.getItem('sidebarEnabled') === 'yes' ? 'yes' : 'no',
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<'yes' | 'no'>) {
      state.sidebarEnabled = action.payload
      localStorage.setItem('sidebarEnabled', state.sidebarEnabled)
    },
  },
})

export const { toggle } = sidebarSlice.actions

export const sidebarSelector = (state: RootState) => state.sidebar

export default sidebarSlice.reducer
