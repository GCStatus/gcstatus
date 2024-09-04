import { Box, Container, Stack } from '@mui/material'
import { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { FaClipboardList, FaCrown, FaRegCreditCard } from 'react-icons/fa'
import {
  IoLockClosed,
  IoPersonCircle,
  IoSync,
  IoWallet,
} from 'react-icons/io5'

import { UpdateUser } from '.'
import { NavItem } from './modules'

function Profile() {
  const [activeSection, setActiveSection] = useState<string>('titles')
  //   const [previewPicture, setPreviewPicture] = useState<string | null>(null)
  //   const [profilePicture, setProfilePicture] = useState<string>(
  //     'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png',
  //   )

  const user = {
    title: 'Warrior',
    level: 5,
    currentExperience: 350,
    nextLevelExperience: 500,
    nickname: 'GamerX',
    email: 'gamerx@example.com',
  }

  const sections: { [key: string]: React.ReactNode } = {
    titles: <Box className="animate-fade-in">Titles</Box>,
    coins: <>Coins</>,
    missions: <>Missions</>,
    updatePassword: <>Update password</>,
    nicknameAndEmail: <UpdateUser />,
    updateProfilePicture: <>Update profile picture</>,
    transactions: <>Transactions</>,
    orders: <>Orders</>,
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  //   const handleProfilePictureChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //   ) => {
  //     const file = e.target.files?.[0]
  //     if (file) {
  //       const reader = new FileReader()
  //       reader.onloadend = () => {
  //         setPreviewPicture(reader.result as string)
  //       }
  //       reader.readAsDataURL(file)
  //     }
  //   }

  const experiencePercentage = Math.round(
    (user.currentExperience / user.nextLevelExperience) * 100,
  )

  return (
    <Stack className="dark:bg-zinc-900 bg-white text-white min-h-screen">
      <Container
        maxWidth="xl"
        className="flex flex-col md:flex-row min-h-screen py-8 gap-2">
        <aside className="w-full md:w-72 dark:bg-theme-dark-900 bg-zinc-50 p-6 flex flex-col gap-4 mb-8 md:mb-0 dark:text-white text-black">
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
              alt="Profile"
              className="w-24 h-24 md:w-16 md:h-16 rounded-full border-2 border-theme-red-900 mb-4"
            />
            <div>
              <h2 className="text-xl font-bold">{user.nickname}</h2>
              <p className="text-gray-400">{user.title}</p>
              <p className="text-gray-400 text-sm">Lv 48</p>
            </div>
            <div className="w-full mt-4">
              <p className="text-gray-400 mb-2">
                {user.currentExperience}/{user.nextLevelExperience} XP
              </p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-theme-red-900 h-4 rounded-full"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-4">
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
          </nav>
        </aside>
        <main className="flex-1 p-8 dark:bg-theme-dark-900 bg-gray-100 rounded-lg dark:text-white text-black">
          <div>{sections[activeSection]}</div>
        </main>
      </Container>
    </Stack>
  )
}

export default Profile
