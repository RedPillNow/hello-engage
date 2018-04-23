# hello-engage Alexa Skill

This is the hello-engage Alexa skill. It is meant to demonstrate surfacing data from Domino via Alexa. It is mainly meant to be used like a kiosk to ask about sessions occurring during Engage 2018 in Rotterdam.

## Requirements

The following is required to develop for this skill.

* nodejs 4.3 or greater
* ask-sdk
* ask-sdk-core
* ask-sdk-model

## NPM Tasks

The following tasks are available. More information can be found in `package.json`.

* bump:major - Bump the `package.json` major version number
* bump:minor - Bump the `package.json` minor version number
* bump:patch - Bump the `package.json` patch version number
* clean-js - Remove all .js and .map files within the dist directory
* compile - Compile all TypeScript to JavaScript and place in the dist directory
* deploy - run the `compile` task, create a `hello-engage-alexa-skill.zip` file and include `node_modules` and `package.json`
