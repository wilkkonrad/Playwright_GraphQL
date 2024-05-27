import { gql } from 'graphql-request';

export const GetSinglePost = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      body
    }
  }
  `;

export const GetAllPosts = gql`
  query GetAllPosts(
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
  `
