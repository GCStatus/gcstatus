import {
  Box,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

function Cookies() {
  return (
    <Stack className="py-8 bg-white dark:bg-theme-dark-900 relative break-words w-full">
      <Container maxWidth="md" className="flex flex-col gap-8">
        <Typography
          variant="h1"
          className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8 tracking-wide text-center">
          Cookies Policy 🍪
        </Typography>

        <Box
          className="flex flex-col items-center gap-4 text-left"
          component="section">
          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Hey there! We use cookies to make your experience on our site
            even more awesome. Don’t worry, these cookies won’t crumble in
            your hands—they’re digital, and they help us improve how our
            gaming community works.
          </Typography>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Cookies are tiny text files that get stored on your device when
            you visit our site. Here’s why we use them:
          </Typography>

          <List>
            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                1. <strong>Making Your Experience Smoother:</strong>{' '}
                Cookies help us remember who you are, so you don’t have to
                log in every time or reset your preferences. It’s like
                having a personal butler for your settings!
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                2. <strong>Understanding What You Like:</strong> We use
                cookies to see how you interact with our website. This
                helps us improve things and make sure we’re delivering the
                best possible content for gamers like you.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                3. <strong>Keeping Things Secure:</strong> Cookies help us
                detect suspicious activity and keep your account safe. So
                yeah, cookies can be the hero too.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                4. <strong>Optional, Always:</strong> If cookies aren’t
                your thing, no worries! You can disable them in your
                browser settings, but some parts of our site might not work
                as smoothly without them.
              </Typography>
            </ListItem>
          </List>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300">
            In short, cookies help us level up your experience. They’re
            here to make sure everything runs smoothly, and nothing gets in
            the way of you enjoying the best gaming community we can offer.
          </Typography>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            If you want more info or need help with disabling cookies, feel
            free to reach out to us. We’re here to help (and maybe share a
            few real cookies too!).
          </Typography>
        </Box>
      </Container>
    </Stack>
  )
}

export default Cookies
