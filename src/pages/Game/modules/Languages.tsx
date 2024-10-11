import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

import { GameLanguage } from '@/types'

interface LanguagesProps {
  gameLanguages: GameLanguage[]
}

function Languages(props: LanguagesProps) {
  const { gameLanguages } = props

  return (
    <Stack className="overflow-x-auto">
      <Table className="w-full table-auto bg-transparent text-white">
        <TableHead>
          <TableRow>
            <TableCell className="border-b border-gray-700 px-4 py-2">
              Language
            </TableCell>
            <TableCell
              align="center"
              className="border-b border-gray-700 px-4 py-2">
              Dubs
            </TableCell>
            <TableCell
              align="center"
              className="border-b border-gray-700 px-4 py-2">
              Menu
            </TableCell>
            <TableCell
              align="center"
              className="border-b border-gray-700 px-4 py-2">
              Subtitles
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameLanguages.map((lang) => (
            <TableRow
              key={lang.language.name}
              className="hover:opacity-40 transition duration-500">
              <TableCell className="border-b border-gray-700 px-4 py-2">
                {lang.language.name}
              </TableCell>
              <TableCell
                align="center"
                className="border-b border-gray-700 px-4 py-2">
                {lang.dubs ? '✓' : '✖'}
              </TableCell>
              <TableCell
                align="center"
                className="border-b border-gray-700 px-4 py-2">
                {lang.menu ? '✓' : '✖'}
              </TableCell>
              <TableCell
                align="center"
                className="border-b border-gray-700 px-4 py-2">
                {lang.subtitles ? '✓' : '✖'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}

export default Languages
