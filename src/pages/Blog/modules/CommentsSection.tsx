import { Comments } from '@/components'
import { BlogDetails } from '@/types'

interface CommentsSectionProps {
  post: BlogDetails
}

function CommentsSection(props: CommentsSectionProps) {
  const { post } = props

  return <Comments defaultComments={post.comments} />
}

export default CommentsSection
