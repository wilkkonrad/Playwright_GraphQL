\```markdown
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

## Setup

1. Clone the repository:
   \```bash
   git clone <repository-url>
   cd <repository-directory>
   \```

2. Install dependencies:
   \```bash
   npm install
   \```

3. Ensure you have a running instance of the GraphQL API to test against.

## Running the Tests

To run the tests, use the following command:
\```bash
npx playwright test
\```

The tests are tagged with `@slow` and `@smoke` to allow for selective execution.

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

## Contact

For any issues or questions, please open an issue on GitHub or contact the repository maintainer.

---

Feel free to copy and paste this README file into your GitHub repository. Adjust the `<repository-url>` and other placeholders as necessary.
\```
