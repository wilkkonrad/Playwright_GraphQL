import { GetAllPosts } from '../schemas/queries.spec';

const fetchTotalCount = async (request: any) => {
  const getAllPostsResponse = await request.post('', {
    data: {
      query: GetAllPosts,
      variables: {
        options: {
          paginate: {
            page: 1,
            limit: 5
          }
        }
      }
    }
  });

  const getAllPostsBody = await getAllPostsResponse.json();
  return getAllPostsBody.data.posts.meta.totalCount;
};

export default fetchTotalCount;
