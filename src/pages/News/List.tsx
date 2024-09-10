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
  Modal,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { useState } from 'react'

import { useArticles } from '@/hooks'

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
}

function List() {
  const { articles, loading, error } = useArticles()

  const [open, setOpen] = useState<boolean>(false)
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

  return (
    <Container maxWidth="xl" className="py-10">
      <Typography
        variant="h1"
        className="text-4xl font-bold mb-8 text-center text-theme-red-900">
        Latest Gaming News
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
            className="hover:shadow-2xl transition-shadow duration-300 relative h-full flex flex-col justify-between rounded-t-xl overflow-hidden"
            key={index}>
            <CardMedia
              component="img"
              image={article.image.original}
              alt={article.title}
              className="object-cover h-full"
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                className="font-bold mb-2 text-theme-red-900 cursor-pointer hover:text-theme-red-700 transition-all"
                onClick={() => handleOpen(article)}
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
                className="mb-4"
                sx={{
                  height: '40px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {article.lede}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatRelative(
                  new Date(article.publish_date),
                  new Date(),
                )}{' '}
                by {article.authors || 'Unknown'}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
              <Button
                variant="outlined"
                className="border-theme-red-900 text-theme-red-900 hover:bg-theme-red-900 hover:text-white transition-all w-full"
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
              bgcolor: 'rgb(13, 13, 13)',
              boxShadow: 24,
              p: 4,
              maxHeight: '90vh',
              overflowY: 'auto',
              overflowX: 'hidden',
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
