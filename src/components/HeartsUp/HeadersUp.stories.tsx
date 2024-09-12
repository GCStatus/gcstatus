import { Box } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import HeartsUp, { HeartsUpProps } from './HeartsUp'

const meta: Meta<typeof HeartsUp> = {
  title: 'Components/HeartsUp',
  component: HeartsUp,
  args: {
    delay: 10,
  },
}

export default meta

type Story = StoryObj<HeartsUpProps>

const Template = () => {
  const [hearts, setHearts] = useState<number>(1)
  const [isHearted, setIsHearted] = useState<boolean>(false)
  const [heartPops, setHeartPops] = useState<number[]>([])

  const handleHeartClick = () => {
    setIsHearted((prev) => !prev)

    setHearts(hearts + (isHearted ? -1 : 1))

    if (!isHearted) {
      const newHearts = Array.from({ length: 10 }, (_, i) => i * 10)

      setHeartPops((prev) => [...prev, ...newHearts])
    }
  }

  return (
    <div>
      <Box className="fixed inset-0 pointer-events-none z-50">
        {heartPops.map((delay, index) => (
          <HeartsUp
            key={index}
            delay={delay}
            setHeartPops={setHeartPops}
          />
        ))}
      </Box>

      <button onClick={handleHeartClick}>Pop Heart</button>
    </div>
  )
}

export const Default: Story = {
  render: () => <Template />,
}
