import { Box, Link } from '@mui/material'
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from 'react-icons/io5'

import { TeamMember } from '@/types'

interface SocialsProps {
  member: TeamMember
}

function Socials(props: SocialsProps) {
  const { member } = props

  return (
    <Box className="flex justify-center mt-auto gap-4">
      {member.socials.github && (
        <Link
          href={member.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-all transform hover:scale-110 duration-300">
          <IoLogoGithub size={24} />
        </Link>
      )}
      {member.socials.twitter && (
        <Link
          href={member.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-all transform hover:scale-110 duration-300">
          <IoLogoTwitter size={24} />
        </Link>
      )}
      {member.socials.linkedin && (
        <Link
          href={member.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-all transform hover:scale-110 duration-300">
          <IoLogoLinkedin size={24} />
        </Link>
      )}
      {member.socials.instagram && (
        <Link
          href={member.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-all transform hover:scale-110 duration-300">
          <IoLogoInstagram size={24} />
        </Link>
      )}
      {member.socials.whatsapp && (
        <Link
          href={`https://wa.me/${member.socials.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-all transform hover:scale-110 duration-300">
          <IoLogoWhatsapp size={24} />
        </Link>
      )}
    </Box>
  )
}

export default Socials
