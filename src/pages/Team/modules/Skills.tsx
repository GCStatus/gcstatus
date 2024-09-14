import { Box, Typography } from '@mui/material'

import { Button } from '@/components'
import { TeamMember } from '@/types'

interface SkillsProps {
  member: TeamMember
  handleOpen: (member: TeamMember) => void
}

function Skills(props: SkillsProps) {
  const { member, handleOpen } = props

  return (
    <Box className="flex items-center justify-center flex-col my-4">
      <Typography variant="subtitle1" className="font-bold mb-2">
        Skills
      </Typography>
      <Box className="flex flex-col w-full">
        {member.skills
          .sort((a, b) => (a.proficiency < b.proficiency ? 1 : -1))
          .slice(0, 5)
          .map((skill, skillIndex) => (
            <Box key={skillIndex} className="w-full">
              <Typography className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                {skill.name}
              </Typography>
              <Box className="relative bg-gray-300 dark:bg-gray-700 w-full h-3 rounded-full overflow-hidden">
                <Box
                  className="absolute h-full bg-theme-red-900 transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </Box>
              <Typography className="text-xs mt-1 text-gray-500 dark:text-gray-400 text-right">
                {skill.proficiency}%
              </Typography>
            </Box>
          ))}

        {member.skills.length > 5 && (
          <Button
            className="max-h-10 mt-4"
            onClick={() => handleOpen(member)}>
            All skillset
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Skills
