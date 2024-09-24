import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import {
  FaClipboardList,
  FaCrown,
  FaLevelUpAlt,
  FaMedal,
  FaRegCreditCard,
} from 'react-icons/fa'
import {
  IoLockClosed,
  IoPersonCircle,
  IoShareSocial,
  IoSync,
  IoWallet,
} from 'react-icons/io5'

import { LoadingScreen } from '@/components'
import { useAccount, useLevels } from '@/hooks'
import { useLazyGetLevelsQuery } from '@/services/api'
import { Level } from '@/types'

import { NavItem } from './modules'
import {
  Coins,
  Levels,
  Missions,
  Orders,
  Socials,
  Titles,
  Transactions,
  UpdateImage,
  UpdatePassword,
  UpdateUser,
} from './Sections'

function Profile() {
  const { user, loading } = useAccount()
  const { levels, loading: levelsLoading } = useLevels()
  const [stLevels, setStLevels] = useState<Level[]>([])
  const [activeSection, setActiveSection] = useState<string>('titles')
  const [getLevels] = useLazyGetLevelsQuery()

  useEffect(() => {
    if (levelsLoading) return

    if (levels.length > 0) setStLevels(levels)
    else getLevels()
  }, [levels, levelsLoading, getLevels])

  if (!user || loading) return <LoadingScreen />

  const nextLevel = levels.find(({ level }) => level === user.level + 1)

  const sections: {
    [key: string]: {
      label: string
      icon: React.ReactNode
      children: React.ReactNode
    }
  } = {
    titles: {
      label: 'Titles',
      children: <Titles user={user} />,
      icon: <FaCrown />,
    },
    coins: {
      label: 'Coins',
      children: <Coins user={user} />,
      icon: <IoWallet />,
    },
    missions: {
      label: 'Missions',
      children: <Missions />,
      icon: <FaClipboardList />,
    },
    updatePassword: {
      label: 'Password',
      children: <UpdatePassword />,
      icon: <IoLockClosed />,
    },
    nicknameAndEmail: {
      label: 'Nickname & Email',
      children: <UpdateUser />,
      icon: <IoPersonCircle />,
    },
    updateProfilePicture: {
      label: 'Picture',
      children: <UpdateImage />,
      icon: <AiFillCamera />,
    },
    transactions: {
      label: 'Transactions',
      children: <Transactions />,
      icon: <FaRegCreditCard />,
    },
    orders: {
      label: 'Orders',
      children: <Orders />,
      icon: <IoSync />,
    },
    levels: {
      label: 'Levels',
      children: (
        <Levels
          user={user}
          levels={stLevels}
          loading={levelsLoading || loading}
        />
      ),
      icon: <FaLevelUpAlt />,
    },
    socials: {
      label: 'Socials',
      children: <Socials user={user} />,
      icon: <IoShareSocial />,
    },
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const experiencePercentage = Math.round(
    nextLevel ? (user.experience / nextLevel.experience) * 100 : 100,
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
              src={
                user.profile?.photo ||
                'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png'
              }
              alt={user.nickname}
              className="w-24 h-24 lg:w-16 lg:h-16 rounded-full border-2 border-theme-red-900 mb-4"
            />
            <Box>
              <Typography variant="h2" className="text-xl font-bold">
                {user.nickname}
              </Typography>
              <Box className="flex items-center justify-center gap-1">
                <FaMedal color="#ff4d4d" size={10} />
                <Typography className="text-gray-400">
                  {'Warrior'}
                </Typography>
              </Box>
              <Typography className="text-gray-400 text-sm">
                Lv {user.level}
              </Typography>
            </Box>
            <Box className="w-full mt-4">
              <Typography className="text-gray-400 mb-2">
                {nextLevel
                  ? `${user.experience}/${nextLevel.experience} XP`
                  : '-'}{' '}
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
            {Object.entries(sections).map(([key, section]) => (
              <NavItem
                key={key}
                icon={section.icon}
                label={section.label}
                active={activeSection === key}
                onClick={() => handleSectionChange(key)}
              />
            ))}
          </Box>
        </Box>
        <Box className="flex-1 p-8 dark:bg-theme-dark-900 bg-gray-100 rounded-lg dark:text-white text-black">
          <Box component="section">{sections[activeSection].children}</Box>
        </Box>
      </Container>
    </Stack>
  )
}

export default Profile
