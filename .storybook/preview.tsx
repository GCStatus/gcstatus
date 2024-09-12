import { CssBaseline, ThemeProvider } from '@mui/material'
import type { Preview } from '@storybook/react'

import '../src/styles/global.css'
import { lightTheme } from '../src/theme/index'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, args) => (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Story {...args} />
      </ThemeProvider>
    ),
  ],

  tags: ['autodocs'],
}

export default preview
