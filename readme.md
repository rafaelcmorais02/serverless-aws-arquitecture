# Serverless commands

- npx sls invoke local -f _lambda-function-name_ -p _event.json_ --aws-profile _profileName_
  <!-- prettier-ignore -->
    - To locally test a lambda function with an existing payload (_event.json_)
  <!-- prettier-ignore -->
- NODE*OPTIONS="--max-old-space-size=7168" npx sls deploy --aws-profile \_profileName* --verbose -s _stage-name_
  <!-- prettier-ignore -->
    - Deploy the code to the stage _stage-name_
  <!-- prettier-ignore -->
- npm run prettify
  <!-- prettier-ignore -->
    - run prettify before sending the code to the remote repository
  <!-- prettier-ignore -->
- npm run lint && npm run prettier-check
  <!-- prettier-ignore -->
    - run lint and prettify check before sending the code to the remote repository
  <!-- prettier-ignore -->
- npm run test
  <!-- prettier-ignore -->
    - run all the unit tests
