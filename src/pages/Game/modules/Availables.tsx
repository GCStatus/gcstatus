import { Box, Link, Typography } from '@mui/material'

import { Company } from '@/types'

interface AvailablesProps {
  company: Company
}

function Availables(props: AvailablesProps) {
  const { company } = props

  return (
    <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4 sm:flex-row flex-col sm:text-left text-center">
      <img
        src={company.logo}
        alt={company.name}
        className="w-16 h-16 object-contain rounded-full shadow-md"
      />
      <Box>
        <Typography
          variant="h2"
          className="font-bold sm:text-2xl text-xl ">
          <Link
            target="_blank"
            href={`/companies/${company.slug}`}
            className="dark:text-white text-black">
            {company.name}
          </Link>
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Available in {company.country}
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Price:{' '}
          {(company.price / 100).toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
          })}
        </Typography>
        <Link
          href={company.url}
          className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer">
          Buy Now
        </Link>
      </Box>
    </Box>
  )
}

export default Availables
