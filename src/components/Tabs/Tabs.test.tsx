import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Tabs from './Tabs'

describe('Tabs Component', () => {
  const tabs = [
    { tab: 'Tab 1', element: <div>Content for Tab 1</div> },
    { tab: 'Tab 2', element: <div>Content for Tab 2</div> },
    { tab: 'Tab 3', element: <div>Content for Tab 3</div> },
  ]

  it('renders all tabs', () => {
    render(<Tabs tabs={tabs} />)

    tabs.forEach(({ tab }) => {
      expect(screen.getByText(tab)).toBeInTheDocument()
    })
  })

  it('shows content for the first tab by default', () => {
    render(<Tabs tabs={tabs} />)

    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
  })

  it('changes active tab and shows the correct content on tab click', () => {
    render(<Tabs tabs={tabs} />)

    const secondTabButton = screen.getByText('Tab 2')
    fireEvent.click(secondTabButton)

    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument()
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument()
  })

  it('calls setAssistantTab with the correct tab name when a tab is clicked', () => {
    const setAssistantTab = jest.fn()
    render(<Tabs tabs={tabs} setAssistantTab={setAssistantTab} />)

    const thirdTabButton = screen.getByText('Tab 3')
    fireEvent.click(thirdTabButton)

    expect(setAssistantTab).toHaveBeenCalledWith('Tab 3')
  })

  it('applies the active class to the active tab button', () => {
    render(<Tabs tabs={tabs} />)

    const firstTabButton = screen.getByText('Tab 1')
    expect(firstTabButton).toHaveClass('bg-theme-red-900')

    const secondTabButton = screen.getByText('Tab 2')
    fireEvent.click(secondTabButton)
    expect(secondTabButton).toHaveClass('bg-theme-red-900')
    expect(firstTabButton).not.toHaveClass('bg-theme-red-900')
  })
})
