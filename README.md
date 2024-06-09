# cypress-miniproject

This repository contains automated tests written using Cypress for testing demo.nopcommerce.com. The project uses the Page Object Model design pattern to organize test code and improve maintainability.

## Table of Contents

- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with running the tests locally, follow these steps:

1. **Clone the Repository**:
   Clone this repository to your local machine using the following command:
   `git clone https://github.com/fprogri/cypress-miniproject.git`

2. **Install Dependencies**:This project requires that you have **node.js** installed.
   After that navigate to the project directory and install the necessary dependencies using npm:

   1. `cd cypress-miniproject`
   2. `npm install cypress`

## Running Tests

Once the setup is complete, you can run the Cypress tests using the following commans:

- `npx cypress open`
  This will launch the Cypress Test Runner, where you can select and run individual tests.

- `npx cypress run`
  This will run all the tests in headless mode.

## Test Structure

All the test files are located in the Cypress folder in the root directory.
The test suite is organized into the following directories:

- **test files**: '/cypress/e2e'.
- **page objects**: '/cypress/support/pageObjects'.
- **user data**: '/cypress/fixtures/userData.json'.
- **cypress custom comands**: '/cypress/support/commands.js'.
- **screenshots**: '/cypress/screenshots'.
