import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Gallery } from '@/types'

interface GalleriesProps {
  galleries: Gallery[]
}

function Galleries(props: GalleriesProps) {
  const { galleries } = props

  return (
    <Swiper loop modules={[Navigation]} navigation>
      {galleries.map((gallery) => (
        <SwiperSlide key={gallery.id}>
          {gallery.media_type.name === 'photo' ? (
            <img
              src={gallery.path}
              alt={`Gallery ${gallery.id}`}
              className="w-full h-auto rounded-md shadow-md transition transform hover:scale-105 duration-300"
            />
          ) : (
            <video controls className="w-full h-auto rounded-md shadow-md">
              <track
                default
                kind="captions"
                srcLang="en"
                src={gallery.path}
              />
              <source src={gallery.path} type="video/mp4" />
              Your browser does not support the video.
            </video>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Galleries
