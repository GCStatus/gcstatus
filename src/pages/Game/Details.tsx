import { Box, Container, List, Stack, Typography } from '@mui/material'

import { MOCK_GAME_DETAILS } from '@/mocks'

import {
  Availables,
  Critics,
  DLCs,
  Galleries,
  Languages,
  MainDetails,
  Requirements,
  ReviewCard,
  Torrents,
} from './modules'

function Details() {
  const game = MOCK_GAME_DETAILS

  return (
    <Stack className="dark:bg-theme-dark-900 bg-white dark:text-white text-black p-6">
      <Container maxWidth="xl" className="space-y-6">
        <MainDetails game={game} />

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            Available at
          </Typography>
          {game.companies.map((company) => (
            <Availables key={company.id} company={company} />
          ))}
        </Box>

        {game.torrents.length > 0 && (
          <Box component="section" className="flex flex-col gap-4">
            <Typography
              variant="h2"
              className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
              Torrents
            </Typography>
            {game.torrents.map((torrent) => (
              <Torrents key={torrent.id} torrent={torrent} />
            ))}
          </Box>
        )}

        <Box
          component="section"
          className="my-4 text-lg leading-relaxed text-center animate-fade-in w-full flex flex-col items-center gap-2"
          dangerouslySetInnerHTML={{ __html: game.about }}
        />

        <Box component="section" className="my-6">
          <Galleries galleries={game.galleries} />
        </Box>

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            Reviews
          </Typography>
          <Box className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {game.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Box>
        </Box>

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            Críticas
          </Typography>
          <List className="flex flex-col gap-4">
            {game.critics.map((critic) => (
              <Critics key={critic.id} critic={critic} />
            ))}
          </List>
        </Box>

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            Downloadable Content (DLC)
          </Typography>
          {game.dlcs.length > 0 ? (
            <List className="flex flex-col gap-4 sm:text-left text-center">
              {game.dlcs.map((dlc) => (
                <DLCs key={dlc.id} dlc={dlc} />
              ))}
            </List>
          ) : (
            <Typography>No one DLC available for this game.</Typography>
          )}
        </Box>

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            System Requirements
          </Typography>

          <Requirements requirements={game.requirements} />
        </Box>

        <Box component="section" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-semibold animate-flicker text-theme-red-900 dark:text-white break-words">
            Languages Supported
          </Typography>

          <Languages languages={game.languages} />
        </Box>
      </Container>
    </Stack>
  )
}

export default Details
