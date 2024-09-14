import {
  Box,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

function Privacy() {
  return (
    <Stack className="py-8 bg-white dark:bg-theme-dark-900 relative break-words w-full">
      <Container maxWidth="md" className="flex flex-col gap-8">
        <Typography
          variant="h1"
          className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8 tracking-wide text-center">
          Privacy Policy
        </Typography>

        <Box
          className="flex flex-col items-center gap-2 text-left"
          component="section">
          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Welcome, gamer! We know privacy is important to you (and it’s
            important to us too!). So here’s the deal: we’re not here to
            sell your data or be creepy. We’re just a gaming community, and
            your privacy is safe with us.
          </Typography>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Here's the simple breakdown of how we handle your data:
          </Typography>

          <List className="flex flex-col items-start text-left space-y-4 mb-8">
            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                1. <strong>We Don’t Sell Your Data:</strong> We’re not
                about that life. We don’t sell your personal information to
                anyone, ever. Period.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                2. <strong>What We Collect:</strong> Just the basics! We
                collect your email, username, and any other info you share
                with us when you join our community. Nothing too personal.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                3. <strong>Why We Collect It:</strong> We use this info to
                keep the community running smoothly. Things like keeping
                your account safe, sending you updates, and improving our
                platform. Nothing shady.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                4. <strong>We Keep It Safe:</strong> We take steps to
                protect your data, using encryption and security tools.
                Only the people who need to access it (like our admins) can
                see it, and we make sure they handle it responsibly.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                5. <strong>You’re In Control:</strong> You can ask us to
                delete your account anytime. Just hit us up, and we’ll
                remove all your info from our system.
              </Typography>
            </ListItem>
          </List>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            That's it! No confusing legal jargon or sneaky fine print.
            We’re just here to create a fun gaming community and respect
            your privacy while we’re at it. If you have any questions, feel
            free to reach out to us.
          </Typography>
        </Box>
      </Container>
    </Stack>
  )
}

export default Privacy
