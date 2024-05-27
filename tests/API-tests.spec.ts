import { test, expect } from '@playwright/test';
import { GetSinglePost } from '../graphql/schemas/queries.spec';
import fetchTotalCount from '../graphql/helpers/fetchTotalCount.spec';
import { CreatePost, UpdatePost } from '../graphql/schemas/mutations.spec';
import faker from 'faker';
import * as fs from 'fs';
import * as path from 'path';
import fetchRandomSinglePost from '../graphql/helpers/fetchRandomSinglePost.spec';

test.describe('Fetch and validate user post requests', { tag: ['@slow', '@smoke'] }, () => {
  let totalCount: number;
  let failedRequestsCount = 0;
  let totalElapsedTime = 0;
  
  
  test.beforeAll(async ({ request }) => {
    totalCount = await fetchTotalCount(request);
  });

  test.skip('Fetch Single Post by ID from GraphQL API and calculate response times', async ({ request }) => {
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
        console.log(`Failed request ${failedRequestsCount}: Request with postId ${postId} had response time ${elapsedTime.toFixed(2)} ms, which is greater than or equal to 400ms.`);
      }

      const responseBody = await response.json();
      expect(response.ok()).toBeTruthy();
      expect(parseInt(responseBody.data.post.id)).toEqual(postId);
      expect(responseBody.data).toHaveProperty('post');
      expect(responseBody.data.post).toHaveProperty('id');
      expect(responseBody.data.post).toHaveProperty('title');
      expect(responseBody.data.post).toHaveProperty('body');
      expect(responseBody).not.toHaveProperty('errors');

    }

    const averageElapsedTime = (totalElapsedTime / totalCount).toFixed(2);
    console.log(`Average response time for fetching single post: ${averageElapsedTime} ms`);
    console.log(`Number of requests with response time greater than or equal to 400ms: ${failedRequestsCount} out of ${totalCount} total requests`);
  });

  test.skip('Create a post mutation and validation', async ({ request }) => {
    if (typeof totalCount === 'undefined') {
      throw new Error('totalCount is not defined. Ensure the beforeAll hook has executed successfully.');
    }

    const newPostId = totalCount + 1;

    const randomTitle = faker.datatype.word();
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
  });

  test('Update a post mutation and validation', async ({ request }: any) => {
    if (typeof totalCount === 'undefined') {
        throw new Error('totalCount is not defined. Ensure the beforeAll hook has executed successfully.');
    }

    const randomId: number = faker.random.number({ min: 1, max: totalCount });
    const randomBody: string = faker.lorem.sentence();

    const getSinglePostResponseBefore = await fetchRandomSinglePost(request, randomId);

    const testName = 'UpdatePostValidation';

    const filePathBefore: string = path.join('graphql', 'temporary', `${testName}_before.txt`);
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

    const filePathAfter: string = path.join('graphql', 'temporary', `${testName}_after.txt`);
    fs.writeFileSync(filePathAfter, JSON.stringify(updateResponseBody, null, 2));

    const fileContentBefore: string = fs.readFileSync(filePathBefore, 'utf-8');
    const fileContentAfter: string = fs.readFileSync(filePathAfter, 'utf-8');

    const postBefore = JSON.parse(fileContentBefore);
    const postAfter = JSON.parse(fileContentAfter);

    expect(postBefore.data.post.id).toEqual(postAfter.data.updatePost.id);
    expect(postBefore.data.post.body).not.toEqual(postAfter.data.updatePost.body);
    expect(postAfter.data.updatePost.body).toEqual(randomBody);

});

test('Delete a post mutation and validation', async ({ request }: any) => {
  
});

});
