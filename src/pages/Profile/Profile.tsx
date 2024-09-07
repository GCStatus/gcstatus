import { Box, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { FaClipboardList, FaCrown, FaRegCreditCard } from 'react-icons/fa'
import {
  IoLockClosed,
  IoPersonCircle,
  IoSync,
  IoWallet,
} from 'react-icons/io5'

import { NavItem } from './modules'
import {
  Coins,
  Missions,
  Orders,
  Titles,
  Transactions,
  UpdateImage,
  UpdatePassword,
  UpdateUser,
} from './Sections'

function Profile() {
  const [activeSection, setActiveSection] = useState<string>('titles')

  const user = {
    title: 'Warrior',
    level: 5,
    currentExperience: 350,
    nextLevelExperience: 500,
    nickname: 'GamerX',
    email: 'gamerx@example.com',
  }

  const sections: { [key: string]: React.ReactNode } = {
    titles: <Titles />,
    coins: <Coins />,
    missions: <Missions />,
    updatePassword: <UpdatePassword />,
    nicknameAndEmail: <UpdateUser />,
    updateProfilePicture: <UpdateImage />,
    transactions: <Transactions />,
    orders: <Orders />,
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const experiencePercentage = Math.round(
    (user.currentExperience / user.nextLevelExperience) * 100,
  )

  return (
    <Stack className="dark:bg-zinc-900 bg-white text-white min-h-screen">
      <Container
        maxWidth="xl"
        className="flex flex-col lg:flex-row min-h-screen py-8 gap-2">
        <Box
          component="aside"
          className="w-full lg:w-72 dark:bg-theme-dark-900 bg-zinc-50 p-6 flex flex-col gap-4 mb-4 lg:mb-0 dark:text-white text-black">
          <Stack className="flex flex-col items-center text-center mb-8">
            <img
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
              alt="Profile"
              className="w-24 h-24 lg:w-16 lg:h-16 rounded-full border-2 border-theme-red-900 mb-4"
            />
            <Box>
              <Typography variant="h2" className="text-xl font-bold">
                {user.nickname}
              </Typography>
              <Typography className="text-gray-400">
                {user.title}
              </Typography>
              <Typography className="text-gray-400 text-sm">
                Lv 48
              </Typography>
            </Box>
            <Box className="w-full mt-4">
              <Typography className="text-gray-400 mb-2">
                {user.currentExperience}/{user.nextLevelExperience} XP
              </Typography>
              <Box className="w-full dark:bg-zinc-700 bg-gray-300 rounded-full h-4">
                <Box
                  className="bg-theme-red-900 h-4 rounded-full"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </Box>
            </Box>
          </Stack>
          <Box component="nav" className="flex flex-col gap-4">
            <NavItem
              icon={<FaCrown />}
              label="Titles"
              active={activeSection === 'titles'}
              onClick={() => handleSectionChange('titles')}
            />
            <NavItem
              icon={<IoWallet />}
              label="Coins"
              active={activeSection === 'coins'}
              onClick={() => handleSectionChange('coins')}
            />
            <NavItem
              icon={<FaClipboardList />}
              label="Missions"
              active={activeSection === 'missions'}
              onClick={() => handleSectionChange('missions')}
            />
            <NavItem
              icon={<IoLockClosed />}
              label="Password"
              active={activeSection === 'updatePassword'}
              onClick={() => handleSectionChange('updatePassword')}
            />
            <NavItem
              icon={<IoPersonCircle />}
              label="Nickname & Email"
              active={activeSection === 'nicknameAndEmail'}
              onClick={() => handleSectionChange('nicknameAndEmail')}
            />
            <NavItem
              icon={<AiFillCamera />}
              label="Picture"
              active={activeSection === 'updateProfilePicture'}
              onClick={() => handleSectionChange('updateProfilePicture')}
            />
            <NavItem
              icon={<FaRegCreditCard />}
              label="Transactions"
              active={activeSection === 'transactions'}
              onClick={() => handleSectionChange('transactions')}
            />
            <NavItem
              icon={<IoSync />}
              label="Orders"
              active={activeSection === 'orders'}
              onClick={() => handleSectionChange('orders')}
            />
          </Box>
        </Box>
        <Box className="flex-1 p-8 dark:bg-theme-dark-900 bg-gray-100 rounded-lg dark:text-white text-black">
          <Box component="section">{sections[activeSection]}</Box>
        </Box>
      </Container>
    </Stack>
  )
}

export default Profile
