# Document archival and project.

Title:
Solvyng Archivyng project

Description:
A web application for secure document storage, access control, document workflows, and search functionalities. Built with AWS services and Flask.

Features:

Document Storage and Archiving:
Organize documents by department categories.
Restrict access with user permissions.
Track document versions with audit history.

Workflow Management:
Define and manage document workflows.
Automate tasks and approvals. (This can be a future phase)

Scalability:
Utilize AWS services for elastic scaling based on user traffic.

Search Functionality:
Implement a robust search engine for efficient document retrieval.

Rollback Capability:
Allow users to revert to previous document versions if necessary.


Technology Stack:

Frontend: React

Backend: Nodejs

Database: Amazon DynamoDB (NoSQL)

Storage: Amazon S3 

Search: Amazon S3 Bitrange

Security & Authentication: Amazon Cognito for user authentication and authorization.


Git branching strategy:

Main branch stability: The core principle is to maintain a stable main branch that reflects the production-ready code. This ensures always deploy a working version from this branch.

Dev staging branch: This is going to ensure that all the changes made are ready for production before going to main branch.

Feature branches for isolated development: Create feature branches for new features or bug fixes. These branches branch off from the main branch and can be short-lived, focused on a single unit of work.

Descriptive branch naming: Use clear and concise names that reflect the purpose of the branch. This makes it easier for everyone to understand what changes are being made in each branch. ie feature/add-upload-feature.

Regular syncing and integration: Frequently synchronize your feature branch with the main branch to avoid merge conflicts. This allows identification and fix integration issues early on.

Pull requests for code review: When your feature branch is ready, create a pull request to merge it back into the main branch. This triggers a code review process where other developers can assess your changes before they are integrated.

Branch deletion after merging: Once a feature branch has been reviewed and merged into the main branch, it can be deleted to keep your repository clean and organized.


Disclaimer:
This README serves as a starting point and may evolve as the project progresses.
