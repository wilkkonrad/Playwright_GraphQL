# GraphQL API Tests

This repository contains a suite of Playwright tests designed to validate the functionality of a GraphQL API. The tests cover various operations, including fetching posts, creating, updating, and deleting posts. The tests are written in TypeScript and use the Playwright framework.

## Table of Contents

- [Setup](#setup)
- [Running the Tests](#running-the-tests)
- [Test Descriptions](#test-descriptions)
  - [Fetch Single Post by ID](#fetch-single-post-by-id)
  - [Create a Post](#create-a-post)
  - [Update a Post](#update-a-post)
  - [Delete a Post](#delete-a-post)
- [Helper Functions](#helper-functions)
- [Schema Definitions](#schema-definitions)
- [CI/CD](#CI/CD)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
   ```bash
   npm init playwright@latest
   ```
   ```bash
   npm install faker
   ```
   ```bash
   npm install @estruyf/github-actions-reporter
   ```

3. Ensure you have a running instance of the GraphQL API to test against.

   ```bash
   https://graphqlzero.almansi.me/api
   ```

## Running the Tests

To run the tests, use the following command:
```bash
npx playwright test
```

The tests are tagged with `@slow` and `@smoke` to allow for selective execution.

```bash
npx playwright test --grep @smoke
``` 

## Test Descriptions

### Fetch Single Post by ID

This test fetches posts by their ID and validates the response time and data structure. It ensures the response times are within acceptable limits and that the post data matches the expected structure.

### Create a Post

This test creates a new post using the `CreatePost` mutation and validates that the post is created successfully with the expected title and body.

### Update a Post

This test updates an existing post's body using the `UpdatePost` mutation and validates that the update is reflected correctly.

### Delete a Post

This test deletes a post using the `DeletePost` mutation and validates that the post is deleted by attempting to fetch it afterward.

## Helper Functions

- `fetchTotalCount`: Fetches the total count of posts from the GraphQL API.
- `fetchRandomSinglePost`: Fetches a random single post by its ID from the GraphQL API.

## Schema Definitions

- `GetSinglePost`: GraphQL query for fetching a single post by ID.
- `CreatePost`: GraphQL mutation for creating a new post.
- `UpdatePost`: GraphQL mutation for updating an existing post.
- `DeletePost`: GraphQL mutation for deleting a post.

## File Structure

- `tests/`: Contains the test files.
- `graphql/schemas/queries.spec.ts`: Contains GraphQL queries.
- `graphql/schemas/mutations.spec.ts`: Contains GraphQL mutations.
- `graphql/helpers/`: Contains helper functions for fetching data.

## Logging

During the tests, response times and failed requests are logged to the console for performance analysis.

## CI/CD

Tests run automatically on PR
```bash
push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

Custom playwright reporter by [@estruyf](https://github.com/estruyf/playwright-github-actions-reporter)

![obraz](https://github.com/wilkkonrad/Playwright_GraphQL/assets/110995167/c7e41208-3d8e-412d-8998-aea6f75928d1)

