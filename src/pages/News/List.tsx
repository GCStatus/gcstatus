import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Fade,
  Link,
  Modal,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { useEffect, useState } from 'react'

import { useArticles } from '@/hooks'
import { useLazyGetGamingNewsQuery } from '@/services/news'

interface Article {
  id: number
  body: string
  lede: string
  deck: string
  title: string
  authors: string
  update_date: string
  publish_date: string
  site_detail_url: string
  image: {
    original: string
  }
  categories: {
    id: number
    name: string
  }[]
}

function List() {
  const { articles, loading, error } = useArticles()
  const [trigger, { data }] = useLazyGetGamingNewsQuery()

  const [open, setOpen] = useState<boolean>(false)
  const [stArticles, setStArticles] = useState<Article[]>(articles)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    null,
  )

  const handleOpen = (article: Article) => {
    setSelectedArticle(article)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedArticle(null)
  }

  useEffect(() => {
    if (loading || error) return

    if (!stArticles || stArticles.length === 0) trigger()
  }, [articles, loading, error])

  useEffect(() => {
    if (error || loading) return

    if (data && data.length > 0) setStArticles(data)
  }, [data, loading, error])

  return (
    <Container maxWidth="xl" className="py-10">
      <Typography
        variant="h1"
        className="text-4xl font-bold mb-8 text-center text-theme-red-900">
        Latest Gaming News
      </Typography>

      <Typography
        variant="subtitle1"
        className="font-bold mb-8 text-center">
        Made with GameSpot API:{' '}
        <Link
          href="https://www.gamespot.com/api/documentation"
          className="underline text-theme-red-900 hover:text-red-400 transition-colors duration-500"
          target="_blank">
          Docs
        </Link>
      </Typography>

      {loading && (
        <Box className="flex justify-center mt-8">
          <CircularProgress className="text-theme-red-900" />
        </Box>
      )}

      {error && (
        <Box className="flex justify-center mt-8">
          <Typography color="error">Error fetching articles.</Typography>
        </Box>
      )}

      <Box className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {articles.map((article: Article, index: number) => (
          <Card
            className="relative h-full flex flex-col justify-between rounded-xl overflow-hidden group hover:shadow-[0px_0px_10px_5px_rgba(255,77,77,0.8)] transition-all duration-500 dark:bg-theme-dark-900 bg-white cursor-pointer"
            key={index}
            onClick={() => handleOpen(article)}>
            <Box className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-gray-400/50 dark:via-gray-200/20 dark:to-black/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <CardMedia
              component="img"
              image={article.image.original}
              alt={article.title}
              className="object-cover h-full transition-transform duration-500 group-hover:scale-110"
            />

            <CardContent className="relative flex-1 p-6 text-gray-800 dark:text-white">
              <Typography
                variant="h5"
                className="font-bold mb-2 transition-all duration-300 group-hover:text-red-500 text-center"
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                {article.title}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-4 text-gray-600 dark:text-gray-400"
                sx={{
                  height: '40px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {article.lede}
              </Typography>

              <Typography
                variant="caption"
                color="textSecondary"
                className="text-gray-500 dark:text-gray-400">
                {formatRelative(
                  new Date(article.publish_date),
                  new Date(),
                )}{' '}
                by {article.authors || 'Unknown'}
              </Typography>

              <Box className="flex flex-row mt-4 text-sm text-gray-400">
                {article.categories.map(({ name }) => name).join(', ')}
              </Box>
            </CardContent>

            <CardActions
              sx={{ justifyContent: 'center', paddingBottom: '16px' }}
              className="relative"
              onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outlined"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all w-full transform hover:translate-y-1"
                href={article.site_detail_url}
                target="_blank"
                rel="noopener noreferrer">
                Read More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              bgcolor: ({ palette }) =>
                palette.mode === 'dark'
                  ? 'rgb(13, 13, 13)'
                  : 'rgb(250, 250, 250)',
              boxShadow: 24,
              p: 4,
              maxHeight: '90vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              borderRadius: '4px',
            }}>
            {selectedArticle && (
              <>
                <Typography
                  variant="h4"
                  sx={{ textAlign: 'center', mb: 4, color: '#ff4d4d ' }}>
                  {selectedArticle.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '100%',
                    '& img': {
                      maxWidth: '100%',
                      minWidth: '25vw',
                      height: 'auto',
                      margin: '1rem 0',
                    },
                    '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & ol, & li, & a, & span':
                      {
                        marginBottom: '1rem',
                        textAlign: 'center',
                        width: '100%',
                      },
                    '& p': {
                      maxWidth: '80%',
                      lineHeight: '1.6',
                    },
                    '& a': {
                      color: '#e63946',
                      textDecoration: 'underline',
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.body,
                  }}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  )
}

export default List
