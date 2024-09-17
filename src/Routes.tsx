import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { Auth, Loadable as L } from './components'
import { DefaultLayout } from './layouts'
import Error from './pages/Error'

export const Routes = () => {
  const Home = L(lazy(() => import('./pages/Home')))
  const Team = L(lazy(() => import('./pages/Team')))
  const Login = L(lazy(() => import('./pages/Login')))
  const About = L(lazy(() => import('./pages/About')))
  const Terms = L(lazy(() => import('./pages/Terms')))
  const Search = L(lazy(() => import('./pages/Search')))
  const Blog = L(lazy(() => import('./pages/Blog/List')))
  const News = L(lazy(() => import('./pages/News/List')))
  const Privacy = L(lazy(() => import('./pages/Privacy')))
  const Cookies = L(lazy(() => import('./pages/Cookies')))
  const Profile = L(lazy(() => import('./pages/Profile')))
  const Register = L(lazy(() => import('./pages/Register')))
  const Calendar = L(lazy(() => import('./pages/Calendar')))
  const GameTags = L(lazy(() => import('./pages/Game/Tags')))
  const Reset = L(lazy(() => import('./pages/Password/Reset')))
  const Forgot = L(lazy(() => import('./pages/Password/Forgot')))
  const GameGenres = L(lazy(() => import('./pages/Game/Genres')))
  const BlogDetails = L(lazy(() => import('./pages/Blog/Details')))
  const GameDetails = L(lazy(() => import('./pages/Game/Details')))
  const GamePlatforms = L(lazy(() => import('./pages/Game/Platforms')))
  const GameCategories = L(lazy(() => import('./pages/Game/Categories')))

  return useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/password/forgot', element: <Forgot /> },
    { path: '/password/reset/:token', element: <Reset /> },
    {
      element: <DefaultLayout withCarousel />,
      children: [
        { element: <Auth shouldRedirect />, children: [] },
        {
          element: <Auth shouldRedirect={false} />,
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/releases/calendar',
              element: <Calendar />,
            },
            {
              path: '/games',
              children: [{ index: true, element: <>Games</> }],
            },
            {
              path: 'news',
              children: [{ index: true, element: <News /> }],
            },
            { path: '/tags/:tag', element: <GameTags /> },
            { path: '/genres/:genre', element: <GameGenres /> },
            { path: '/platforms/:platform', element: <GamePlatforms /> },
            { path: '/categories/:category', element: <GameCategories /> },
          ],
        },
      ],
    },
    {
      element: <DefaultLayout withCarousel={false} />,
      children: [
        {
          element: <Auth shouldRedirect />,
          children: [
            {
              path: '/profile',
              children: [{ index: true, element: <Profile /> }],
            },
          ],
        },
        {
          element: <Auth shouldRedirect={false} />,
          children: [
            { path: '/games/:slug', element: <GameDetails /> },
            {
              path: '/search/:query',
              element: <Search />,
            },
            {
              path: 'blogs',
              children: [
                { index: true, element: <Blog /> },
                {
                  path: ':slug',
                  element: <BlogDetails />,
                },
              ],
            },
            {
              path: '/team',
              element: <Team />,
            },
            {
              path: '/about',
              element: <About />,
            },
            {
              path: '/terms-of-use',
              element: <Terms />,
            },
            {
              path: '/privacy',
              element: <Privacy />,
            },
            {
              path: '/cookies',
              element: <Cookies />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: (
        <Error
          error={404}
          description="Your path is lost in the darkness..."
        />
      ),
    },
  ])
}
