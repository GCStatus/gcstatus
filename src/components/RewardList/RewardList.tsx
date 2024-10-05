import { Box, SvgIcon, Typography } from '@mui/material'
import { Fragment } from 'react'
import { FaMedal } from 'react-icons/fa'

import { BaseReward, TitleReward } from '@/types'

interface RewardListProps {
  rewards: BaseReward[]
}

function RewardList(props: RewardListProps) {
  const { rewards } = props

  const rewardRendererMap: Record<
    string,
    (reward: BaseReward) => JSX.Element
  > = {
    titles: (reward: BaseReward) => {
      const titleReward = reward as TitleReward
      const { title } = titleReward

      return (
        <Box className="relative my-2">
          <Typography className="text-lg font-bold text-theme-red-900 mb-2">
            Title Reward
          </Typography>
          <Box className="text-gray-200 p-4 rounded-lg border border-zinc-900 my-2 flex justify-between items-center">
            <Typography className="dark:text-gray-400 text-gray-500 text-base">
              {title.title}
            </Typography>
            <SvgIcon>
              <FaMedal color="#ff4d4d" />
            </SvgIcon>
          </Box>
        </Box>
      )
    },
  }

  const renderReward = (reward: BaseReward): JSX.Element | null => {
    const renderFunc = rewardRendererMap[reward.rewardable_type]
    return renderFunc ? renderFunc(reward) : null
  }

  return rewards.map((reward) => (
    <Fragment key={reward.id}>{renderReward(reward)}</Fragment>
  ))
}

export default RewardList
