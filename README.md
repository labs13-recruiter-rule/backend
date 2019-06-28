# API Documentation

#### Backend delpoyed on [Heroku](https://recruiter-back-end.herokuapp.com//) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Node.js & Express.js

🚫 Why did you choose this framework?

- Performance - Uses Chrome’s V8 JavaScript engine
- Node.js’ package ecosystem, npm

## 2️⃣ Endpoints

#### User Routes

| Method | Endpoint                     |     | Description                            |
| ------ | ---------------------------- | --- | -------------------------------------- |
| GET    | `/users/`                    |     | Returns info for the logged in user.   |
| GET    | `/users/:id`                 |     | Returns user by user.                  |
| GET    | `/users/fbid/:firebase_uuid` |     | Returns user id by user firebase_uuid. |
| POST   | `/users/`                    |     | Adds user to users table.              |
| PUT    | `/users/:id`                 |     | Updates user by user id.               |
| DELETE | `/users/:id`                 |     | Deletes user by user id.               |

### User Contact Routes

| Method | Endpoint              |     | Description                                                |
| ------ | --------------------- | --- | ---------------------------------------------------------- |
| GET    | `/users/contacts`     |     | Returns contacts for that user                             |
| GET    | `/users/contacts/:id` |     | Returns specific contact for that user.                    |
| POST   | `/users/contacts`     |     | Adds a contact to a user. Needs email and name.            |
| PUT    | `/users/contacts/:id` |     | Updates contact by contact id. Returns updated contact     |
| DELETE | `/users/contacts/:id` |     | Deletes contact by contact id. Returns entire contact list |

### User Engine Routes

| Method | Endpoint              |     | Description                                            |
| ------ | --------------------- | --- | ------------------------------------------------------ |
| GET    | `/engines/`           |     | Returns engines for user logged in                     |
| GET    | `/engines/:engineid/` |     | Returns specific engine for that user.                 |
| POST   | `/engines/`           |     | Adds an engine to a user. Takes engine_name as string. |
| PUT    | `/engines/:engineid/` |     | Updates engine by engine id. Returns updated engine    |
| DELETE | `/engines/:engineid`  |     | Deletes engine by engine id. Returns success message   |

### User Engine Rule Routes

| Method | Endpoint                            |     | Description                                                             |
| ------ | ----------------------------------- | --- | ----------------------------------------------------------------------- |
| GET    | `/engines/:engineid/rules/`         |     | Returns rules for that engine                                           |
| GET    | `/engines/:engineid/rules/:ruleid/` |     | Returns specific rule for that engine.                                  |
| POST   | `/engines/:engineid/rules/`         |     | Adds a rule to a user's engine. Takes rule(JSON) and addressee_id(INT). |
| PUT    | `/engines/:engineid/rules/:ruleid/` |     | Updates rule by rule id. Returns updated rule                           |
| DELETE | `/engines/:engineid/rules/:ruleid/` |     | Deletes rule by rule id. Returns success message                        |

#### EXAMPLE Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizations/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |


# Data Model

#### users

---

```
{
  id: INT
  firebase_uuid: STRING
  display_name: STRING
  profile_photo: STRING
  firebase_uuid: STRING
  email: STRING
  job_title: STRING
}
```

#### userContacts

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users)
  name: STRING
  email: STRING
}
```

#### candidates

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users)
  name: STRING
  email: STRING
  title: STRING
  industry: STRING
  education: STRING
  skills: STRING
  years_of_experience: INT
  languages: STRING
  certifications: STRING
  volunteer: STRING
  publications: STRING
  bio: BOOLEAN
  picture: BOOLEAN
  posts: BOOLEAN
  linkedin_url: STRING
}
```

#### addressee_types

---

```
{

  id: INT
  user_id: STRING (fk: firebase_uuid in users)
  addressee_type: STRING
}
```

#### engines

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users table)
  engine_name: STRING
}
```

#### rules

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users table)
  engine_id: INT (fk: id in engines table)
  rule: JSON
  addressee_id: INT (fk: id on addressee_types table)
}
```

#### addressee_contacts

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users)
  addressee_id: INT (fk: id on addressee_types table)
  contact_id: INT (fk: id on contacts table)
}
```

#### email_history

---

```
{
  id: INT
  user_id: STRING (fk: firebase_uuid in users)
  candidate_id: INT (fk: id on candidates table)
  contact_id: INT (fk: id on contacts table)
  send_date: TIMESTAMP
  personalized_message: TEXT
}
```

## Actions

### Candidates
`getCandidates()` -> Returns all candidates

`getCandidatesById(id)` -> Returns a single candidates by ID

`addCandidate(candidate)` -> Adds a candidate

`updateCandidate(id, candidate)` -> Update a candidate by ID

`deleteCandidate(id)`  -> Delete a candidate by ID
<br>
<br>
<br>

### Engines
`getEngines()` -> Returns all engines 

`getEnginesById(id)` -> Returns a single engine by engine ID

`getEnginesByUUID(user_id)` > Returns a single engine by Firebase UUID

`addEngineToUser(engine)` -> Adds an engine

`modifyUserEngine(id, engine)` -> Update an engine by ID

`deleteUserEngine(id)` -> Delete an engine by ID

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- DB_ENV
- SEED_NUM
- PROJECT_ID
- PRIVATE_KEY_ID
- PRIVATE_KEY
- CLIENT_EMAIL
- CLIENT_ID
- CLIENT_X509_CERT_URL
- senderEMAIL
- senderPASSWORD
- 
## Contributing

When contributing to this repository, please first discuss the change you wish to make by creating an issue in the GitHub repo.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs13-recruiter-rule/frontend/blob/master/README.md) for details on the fronend of our project.