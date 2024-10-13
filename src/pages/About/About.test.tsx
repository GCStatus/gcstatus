import { render } from '@testing-library/react'

import About from './About'

const renderAbout = () => {
  return render(<About />)
}

describe('About Page', () => {
  it('renders About Us heading', () => {
    const { getByText } = renderAbout()

    const headingElement = getByText(/about us/i)

    expect(headingElement).toBeInTheDocument()
  })

  it('renders Our Mission section', () => {
    const { getByText } = renderAbout()

    const missionHeading = getByText(/our mission/i, {
      selector: 'h2',
    })

    expect(missionHeading).toBeInTheDocument()
  })

  it('renders Our Vision section', () => {
    const { getByText } = renderAbout()

    const visionHeading = getByText(/our vision/i, {
      selector: 'h2',
    })

    expect(visionHeading).toBeInTheDocument()
  })

  it('renders Open Source Project section', () => {
    const { getByText } = renderAbout()

    const openSourceHeading = getByText(/open source project/i, {
      selector: 'h2',
    })

    expect(openSourceHeading).toBeInTheDocument()
  })

  it('renders Join the Community section', () => {
    const { getByText } = renderAbout()

    const joinCommunityHeading = getByText(/join the community/i, {
      selector: 'h2',
    })

    expect(joinCommunityHeading).toBeInTheDocument()
  })

  it('renders the Contribute to front-end button', () => {
    const { getByRole } = renderAbout()

    const contributeButton = getByRole('button', {
      name: /contribute to our front-end project/i,
    })

    expect(contributeButton).toBeInTheDocument()
    expect(contributeButton).toHaveAttribute(
      'href',
      'https://github.com/GCStatus/gcstatus',
    )
  })

  it('renders the Contribute to back-end button', () => {
    const { getByRole } = renderAbout()

    const contributeButton = getByRole('button', {
      name: /contribute to our back-end project/i,
    })

    expect(contributeButton).toBeInTheDocument()
    expect(contributeButton).toHaveAttribute(
      'href',
      'https://github.com/GCStatus/api-gcstatus',
    )
  })

  it('renders the Join Discord button', () => {
    const { getByRole } = renderAbout()

    const joinButton = getByRole('button', {
      name: /join our discord community/i,
    })

    expect(joinButton).toBeInTheDocument()
    expect(joinButton).toHaveAttribute(
      'href',
      'https://discord.gg/FX6Ser7q',
    )
  })
})
