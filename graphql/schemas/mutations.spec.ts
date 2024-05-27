import { gql } from 'graphql-request';

export const CreatePost = gql`
    mutation (
        $input: CreatePostInput!
    ) {
        createPost(input: $input) {
        id
        title
        body
        }
    }
  `;

export const UpdatePost = gql`
mutation (
    $id: ID!,
    $input: UpdatePostInput!
  ) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }`  

export const DeletePost = gql`
mutation (
  $id: ID!
) {
  deletePost(id: $id)
}`
