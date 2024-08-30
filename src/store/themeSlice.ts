import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './index'

interface ThemeSlice {
  mode: 'dark' | 'light'
}

const initialState: ThemeSlice = {
  mode: localStorage.getItem('mode') === 'light' ? 'light' : 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<'dark' | 'light'>) {
      state.mode = action.payload
      localStorage.setItem('mode', state.mode)
    },
  },
})

export const { toggle } = themeSlice.actions

export const themeSelector = (state: RootState) => state.theme

export default themeSlice.reducer
