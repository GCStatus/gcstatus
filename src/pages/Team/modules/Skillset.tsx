import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

import { Button } from '@/components'
import { TeamMember } from '@/types'

interface SkillsetProps {
  open: boolean
  member: TeamMember
  handleClose: () => void
}

function Skillset(props: SkillsetProps) {
  const { open, handleClose, member } = props

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{member.name}'s Full Skillset</DialogTitle>
      <DialogContent dividers>
        <Box className="flex flex-col w-full">
          {member.skills
            .sort((a, b) => (a.proficiency < b.proficiency ? 1 : -1))
            .map((skill, skillIndex) => (
              <Box key={skillIndex} className="w-full mb-4">
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className="max-h-10 my-2" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Skillset
