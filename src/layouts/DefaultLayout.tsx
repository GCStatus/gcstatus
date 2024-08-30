import { Header } from '@/components'

function DefaultLayout() {
  const array: string[] = []

  for (let index = 0; index < 200; index++) {
    array[index] = 'Home'
  }

  return (
    <>
      <Header />
      {array.map((string, i) => (
        <p key={i}>{string}</p>
      ))}
    </>
  )
}

export default DefaultLayout
