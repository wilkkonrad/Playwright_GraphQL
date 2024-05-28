GraphQL Post Requests Validator

This project contains automated tests to validate user post requests in a GraphQL API. It uses Playwright Test for end-to-end testing and Faker.js for generating random data.
Installation

    Clone the repository:

    bash

git clone https://github.com/your-username/your-repository.git

Install dependencies:

bash

    npm install

Usage

Run the tests using the following command:

bash

npm test

This command will execute the test suite and provide detailed output regarding the success or failure of each test case.
Test Cases
Fetch and Validate User Post Requests

    Fetch Single Post by ID from GraphQL API and Calculate Response Times: Fetches single posts by ID from the GraphQL API, calculates response times, and ensures that the response is valid. It also checks if the response time is greater than or equal to 400ms.
    Create a Post Mutation and Validation: Creates a new post using a mutation in the GraphQL API and validates the response.
    Update a Post Mutation and Validation: Updates an existing post using a mutation in the GraphQL API and validates the response.
    Delete a Post Mutation and Validation: Deletes an existing post using a mutation in the GraphQL API and validates the response. It also ensures that the post is no longer retrievable after deletion and that the total count of posts has decreased.

Technologies Used

    Playwright Test: End-to-end testing framework for web applications.
    Faker.js: JavaScript library for generating fake data.

Contributors

    Your Name

License

This project is licensed under the MIT License - see the LICENSE file for details.