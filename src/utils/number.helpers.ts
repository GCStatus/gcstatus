import { MissionRequirement } from '@/types'

export const formatPrice = (value: number | undefined) => {
  if (!value) return '$ 0.00'

  return (value / 100).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  })
}

export const calculateOverallProgress = (
  requirements: MissionRequirement[],
): number => {
  if (requirements.length === 0) return 0

  const totalGoals = requirements.reduce((acc, req) => acc + req.goal, 0)

  const totalProgress = requirements.reduce(
    (acc, req) => acc + (req.progress ? req.progress.progress : 0),
    0,
  )

  return Math.min(Math.round((totalProgress / totalGoals) * 100), 100)
}
