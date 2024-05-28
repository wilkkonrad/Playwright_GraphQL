import { test, expect } from '@playwright/test';
import { GetSinglePost } from '../graphql/schemas/queries.spec';
import { CreatePost, DeletePost, UpdatePost } from '../graphql/schemas/mutations.spec';
import fetchTotalCount from '../graphql/helpers/fetchTotalCount.spec';
import fetchRandomSinglePost from '../graphql/helpers/fetchRandomSinglePost.spec';
import faker from 'faker';
import * as fs from 'fs';
import * as path from 'path';

test.describe.serial('Fetch and validate user post requests', { tag: ['@slow', '@smoke'] }, () => {
  let totalCount: number;
  let failedRequestsCount = 0;
  let totalElapsedTime = 0;
  const titleRegex = /^[a-zA-Z0-9 ]+$/;

  test.beforeAll(async ({ request }) => {
    totalCount = await fetchTotalCount(request);
  });

  test('Fetch Single Post by ID from GraphQL API and calculate response times', async ({ request }) => {
    for (let postId = totalCount; postId > 0; postId--) {
      const startTime = performance.now();

      const response = await request.post('', {
        data: {
          query: GetSinglePost,
          variables: { postId }
        }
      });

      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      totalElapsedTime += elapsedTime;

      if (elapsedTime >= 400) {
        failedRequestsCount++;
        console.log(`Failed request ${failedRequestsCount}: Request with postId ${postId} had response time \x1b[31m${elapsedTime.toFixed(2)} ms\x1b[0m, which is greater than or equal to \x1b[32m400 ms\x1b[0m.`);
      }

      const responseBody = await response.json();
      expect(response.ok()).toBeTruthy();
      expect(parseInt(responseBody.data.post.id)).toEqual(postId);
      expect(responseBody.data).toHaveProperty('post');
      expect(responseBody.data.post).toHaveProperty('id');
      expect(responseBody.data.post).toHaveProperty('title');
      expect(responseBody.data.post).toHaveProperty('body');
      expect(responseBody).not.toHaveProperty('errors');

      expect(titleRegex.test(responseBody.data.post.title)).toBe(true);
    }

    const averageElapsedTime = (totalElapsedTime / totalCount).toFixed(2);
    console.log(`Average response time for fetching single post: ${averageElapsedTime} ms`);
    console.log(`Number of requests with response time greater than or equal to 400ms: ${failedRequestsCount} out of ${totalCount} total requests`);
  });

  test('Create a post mutation and validation', async ({ request }) => {
    if (typeof totalCount === 'undefined') {
      throw new Error('totalCount is not defined. Ensure the beforeAll hook has executed successfully.');
    }

    const newPostId = totalCount + 1;

    const randomTitle = faker.random.word();
    const randomBody = faker.lorem.sentence();

    const response = await request.post('', {
      data: {
        query: CreatePost,
        variables: {
          input: {
            title: randomTitle,
            body: randomBody
          }
        }
      }
    });

    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(parseInt(responseBody.data.createPost.id)).toEqual(newPostId);
    expect(responseBody.data.createPost.title).toBe(randomTitle);
    expect(responseBody.data.createPost.body).toBe(randomBody);
    expect(titleRegex.test(responseBody.data.createPost.title)).toBe(true);
  });

  test('Update a post mutation and validation', async ({ request }) => {
    if (typeof totalCount === 'undefined') {
      throw new Error('totalCount is not defined. Ensure the beforeAll hook has executed successfully.');
    }

    const randomId = faker.random.number({ min: 1, max: totalCount });
    const randomBody = faker.lorem.sentence();

    const getSinglePostResponseBefore = await fetchRandomSinglePost(request, randomId);

    const testName = 'UpdatePostValidation';

    const filePathBefore = path.join('graphql', 'temporary_txt_files', `${testName}_before.txt`);
    fs.writeFileSync(filePathBefore, JSON.stringify(getSinglePostResponseBefore, null, 2));

    const updateResponse = await request.post('', {
      data: {
        query: UpdatePost,
        variables: {
          id: randomId,
          input: {
            body: randomBody
          }
        }
      }
    });

    const updateResponseBody = await updateResponse.json();

    const filePathAfter = path.join('graphql', 'temporary_txt_files', `${testName}_after.txt`);
    fs.writeFileSync(filePathAfter, JSON.stringify(updateResponseBody, null, 2));

    const fileContentBefore = fs.readFileSync(filePathBefore, 'utf-8');
    const fileContentAfter = fs.readFileSync(filePathAfter, 'utf-8');

    const postBefore = JSON.parse(fileContentBefore);
    const postAfter = JSON.parse(fileContentAfter);

    expect(postBefore.data.post.id).toEqual(postAfter.data.updatePost.id);
    expect(postBefore.data.post.body).not.toEqual(postAfter.data.updatePost.body);
    expect(postAfter.data.updatePost.body).toEqual(randomBody);
  });

  test('Delete a post mutation and validation', async ({ request }) => {

    const postIdToDelete = totalCount+1;
  
    const fetchResponseBefore = await request.post('', {
      data: {
        query: GetSinglePost,
        variables: { postId: postIdToDelete }
      }
    });
  
    const fetchResponseBodyBefore = await fetchResponseBefore.json();
    expect(fetchResponseBodyBefore.data.post).not.toBeNull();
  
    // Delete the post
    const deleteResponse = await request.post('', {
      data: {
        query: DeletePost,
        variables: {
          id: postIdToDelete
        }
      }
    });
  
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponseBody.data.deletePost).toBe(true);
  
    const fetchResponseAfter = await request.post('', {
      data: {
        query: GetSinglePost,
        variables: { postId: postIdToDelete }
      }
    });
  
    const fetchResponseBodyAfter = await fetchResponseAfter.json();
    
    expect(fetchResponseAfter.ok()).toBeTruthy();
    expect(fetchResponseBodyAfter.data.post.body).toBeNull();
    expect(fetchResponseBodyAfter.data.post.id).toBeNull();
    expect(fetchResponseBodyAfter.data.post.title).toBeNull();

    const totalCountAfterDeletion = await fetchTotalCount(request);
    expect(totalCountAfterDeletion).toBeLessThan(postIdToDelete);
  });
});
