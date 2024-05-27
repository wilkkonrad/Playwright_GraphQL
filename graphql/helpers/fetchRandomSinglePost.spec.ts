import { GetSinglePost } from '../schemas/queries.spec';

const fetchRandomSinglePost = async (request: any, postId: number) => {
  const getSinglePostResponse = await request.post('', {
    data: {
      query: GetSinglePost,
      variables: { postId }
    }
  });

  const getSinglePostsBody = await getSinglePostResponse.json();

  return getSinglePostsBody;
};

export default fetchRandomSinglePost;
