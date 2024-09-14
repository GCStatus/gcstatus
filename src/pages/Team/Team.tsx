import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { MOCK_TEAM_MEMBERS } from '@/mocks'
import { TeamMember } from '@/types'

import { Skills, Skillset, Socials } from './modules'

function Team() {
  const members = MOCK_TEAM_MEMBERS

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    null,
  )

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedMember(null)
    setIsModalOpen(false)
  }

  return (
    <Stack className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-theme-dark-900 transition-colors duration-500 relative">
      <Box component="section">
        <Typography
          variant="h1"
          className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-4 tracking-wide z-10">
          Meet Our Team
        </Typography>
        <Typography className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl text-center mb-10 z-10">
          We are an independent group of developers passionate about gaming
          and building a community for game enthusiasts. Our mission is to
          deliver game information, reviews, and news through this
          open-source project. Join us on our journey to create a unique
          platform for all gamers!
        </Typography>
      </Box>

      <Box
        component="section"
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
        {members.map((member, index) => (
          <Box
            key={index}
            className="relative bg-gray-100 dark:bg-theme-dark-900 rounded-2xl overflow-hidden group shadow-lg hover:shadow-[0px_0px_15px_6px_rgba(255,77,77,0.8)] transition-all duration-500 max-w-lg flex flex-col">
            <Box className="absolute inset-0 border-4 border-transparent rounded-2xl group-hover:border-theme-red-900 transition-all duration-300" />

            <Box className="relative overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-full h-auto max-h-[30rem] transition-transform duration-500 group-hover:scale-105"
              />
              <Box className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
            </Box>

            <Box className="p-6 relative flex flex-col gap-2 flex-grow">
              <Typography
                variant="h2"
                className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-1 tracking-wider transition-colors group-hover:text-theme-red-900">
                {member.name}
              </Typography>
              <Typography className="text-md font-semibold flex justify-center items-center text-gray-500 dark:text-gray-400 text-center mb-2 group-hover:text-white group-hover:bg-theme-red-900 transition-all py-1 px-4 rounded-full mx-auto w-max">
                {member.role}
              </Typography>

              <Box className="flex flex-col items-center justify-center gap-1">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-center">
                  Bio
                </Typography>
                <Typography className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  {member.bio
                    ? member.bio
                    : 'Passionate game developer and community enthusiast.'}
                </Typography>
              </Box>

              <Skills member={member} handleOpen={handleOpenModal} />

              <Socials member={member} />
            </Box>
          </Box>
        ))}
      </Box>

      {selectedMember && (
        <Skillset
          open={isModalOpen}
          member={selectedMember}
          handleClose={handleCloseModal}
        />
      )}
    </Stack>
  )
}

export default Team
