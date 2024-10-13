import { Box, Button, Container, Stack, Typography } from '@mui/material'

function About() {
  return (
    <Stack className="py-8 bg-white dark:bg-theme-dark-900 relative break-words w-full">
      <Container maxWidth="md" className="flex flex-col gap-8">
        <Box
          className="flex flex-col items-center gap-4 text-center"
          component="section">
          <Typography
            variant="h1"
            className="sm:text-4xl text-xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-wide">
            About Us
          </Typography>
          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300">
            We are a group of independent developers passionate about
            gaming and building a community for game enthusiasts. Our
            mission is to create a platform where gamers can come together
            to access game information, reviews, and news. This project is
            built with love and is entirely open-source, designed for
            gamers, by gamers.
          </Typography>
          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300">
            Through this project, we aim to foster an engaging, inclusive
            community that brings the gaming world closer to everyone,
            whether you’re a developer, a player, or simply a fan.
          </Typography>
        </Box>

        <Box
          className="flex flex-col items-center gap-4 text-center"
          component="section">
          <Typography
            variant="h2"
            className="sm:text-3xl text-xl font-bold text-gray-800 dark:text-white">
            Our Mission
          </Typography>
          <Typography className="text-lg text-gray-600 dark:text-gray-300">
            Our mission is simple: to build a unique platform where gamers
            can access the latest game information, connect with other
            players, and explore the gaming world. We believe in creating a
            community where all gamers can share experiences, news, and
            reviews, and help shape the future of gaming.
          </Typography>
        </Box>

        <Box
          className="flex flex-col items-center gap-4 text-center"
          component="section">
          <Typography
            variant="h2"
            className="sm:text-3xl text-xl font-bold text-gray-800 dark:text-white">
            Our Vision
          </Typography>
          <Typography className="text-lg text-gray-600 dark:text-gray-300">
            We envision a world where the gaming community thrives as a
            supportive, collaborative, and inclusive space. Our platform is
            open-source because we believe in transparency and the power of
            collaboration. By empowering developers and players alike, we
            hope to contribute to the gaming world in a meaningful way.
          </Typography>
        </Box>

        <Box
          className="flex flex-col items-center gap-4 text-center"
          component="section">
          <Typography
            variant="h2"
            className="sm:text-3xl text-xl font-bold text-gray-800 dark:text-white">
            Open Source Project
          </Typography>
          <Typography className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            As a completely open-source initiative, we encourage developers
            from around the world to contribute to our project. Together,
            we can build something great. Whether it’s adding new features,
            fixing bugs, or enhancing performance, the contributions of the
            community make this project stronger and more dynamic.
          </Typography>
          <Button
            href="https://github.com/GCStatus/gcstatus"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            className="bg-theme-red-900 text-white px-6 py-3 rounded-lg sm:w-auto w-full"
            role="button">
            Contribute to Our Front-End Project (React)
          </Button>
          <Button
            href="https://github.com/GCStatus/api-gcstatus"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            className="bg-theme-red-900 text-white px-6 py-3 rounded-lg sm:w-auto w-full"
            role="button">
            Contribute to Our Back-End Project (GoLang)
          </Button>
        </Box>

        <Box
          className="flex flex-col items-center gap-4 text-center mb-8"
          component="section">
          <Typography
            variant="h2"
            className="sm:text-3xl text-xl font-bold text-gray-800 dark:text-white">
            Join the Community
          </Typography>
          <Typography className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our community is at the heart of everything we do. We’re not
            just developers—we’re gamers who are passionate about creating
            a space where others can connect, share, and grow. Whether
            you’re here for the latest game updates or want to contribute
            to the project, we welcome you with open arms.
          </Typography>
          <Button
            href="https://discord.gg/FX6Ser7q"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            className="bg-theme-red-900 text-white px-6 py-3 rounded-lg sm:w-auto w-full"
            role="button">
            Join Our Discord Community
          </Button>
        </Box>
      </Container>
    </Stack>
  )
}

export default About
