import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

function Terms() {
  return (
    <Stack className="py-8 bg-white dark:bg-theme-dark-900 relative break-words w-full">
      <Container maxWidth="md" className="flex flex-col gap-8">
        <Typography
          variant="h1"
          className="sm:text-4xl text-xl font-extrabold text-gray-800 dark:text-white tracking-wide">
          Terms of Use
        </Typography>

        <Box
          className="flex flex-col items-center gap-4 text-left"
          component="section">
          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300">
            Hey there, gamer! Welcome to our platform. We don’t like long
            legal texts either, so we’ll keep it simple. Just be a nice
            person, treat others with respect, and use common sense when
            engaging with our community and content.
          </Typography>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300 my-2">
            Here’s the deal:
          </Typography>

          <List>
            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                1. <strong>Be Respectful:</strong> We’re all here because
                we love gaming. So be nice, respect other players, and
                avoid toxic behavior. No one likes a troll!
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                2. <strong>Keep It Legal:</strong> Don’t do anything
                illegal here. No cheating, hacking, or breaking the rules
                of the games we cover.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                3. <strong>Don’t Spam:</strong> Keep the conversations
                meaningful and avoid spamming the platform with irrelevant
                content or ads.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                4. <strong>Respect Privacy:</strong> Don’t share other
                people’s personal information without permission. Protect
                your own info too!
              </Typography>
            </ListItem>

            <ListItem>
              <Typography className="text-gray-700 dark:text-gray-300">
                5. <strong>Have Fun:</strong> We’re all about the gaming
                community here. Enjoy the platform, share your experiences,
                and let’s create something awesome together.
              </Typography>
            </ListItem>
          </List>

          <Typography
            variant="body1"
            className="text-lg text-gray-600 dark:text-gray-300">
            That’s it! Keep it simple, keep it fun, and we’re all good. If
            you’ve got any questions, feel free to reach out to us. Happy
            gaming!
          </Typography>

          <Typography
            variant="body1"
            className="text-gray-700 dark:text-gray-300 text-left mt-3.5 mb-8">
            <strong>Keep in touch:</strong> If you have any suggestions or
            need to report something, just keep in touch right here and
            make a great community with us! To create a ticket, please,{' '}
            <Link
              href="/ticket/create"
              target="_blank"
              className="text-theme-red-900"
              rel="noopener noreferrer">
              click here
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Stack>
  )
}

export default Terms
