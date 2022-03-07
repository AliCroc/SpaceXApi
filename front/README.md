# SpaceX Api App Demo

This is a application where you can search up SpaceX rocket launches and read details about it. In this repository contains full application's code (backend and frontend).
Application idea comes from Fireship.io's SpacexApi GraphQL tutorial (https://www.youtube.com/watch?v=7wzR4Ig5pTI).

## How is the app built?

The app was build as single-page application. The front is build in React, the data is fetched by ExpressJS server based on Node.js which communicates with front using GraphQL.

## Instalation process

In order to install all needed resources for the app to fully work, it's required to:
1. Use npm package installation commands for BOTH server & front parts of the project (./ and ./front):
```bash
npm install
cd ./front/
npm install
```
2. Now with packages installed you can already start the app. To preview fully working app use the following command (in the project's root folder; ./): 
```bash
npm run dev
```
When using development mode (npm run dev), you may run into a message asking you to include a SKIP_PREFLIGHT_CHECK flag in .env file. If this happens, add or edit existing .env file by adding following text in new line:
```bash
SKIP_PREFLIGHT_CHECK=true
```
