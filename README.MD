# AdamLink Depiction Recognition API
A very simple API which compares portraits from the Adamlink project. By using facial recognition we can identify and label the people that are depicted.

**Dependencies:**
- NodeJS
- NPM
- Koa
- Koa-router
- Koa-body
- Google Cloud Vision API

# Installation
Create credentials for Google Cloud:
https://cloud.google.com/vision/docs/reference/libraries

Run ``npm install``

Then run `` Node app ``

If you wish to change the port you can do so in app.js

# Available endpoints

### Test
Simple test endpoint, returns silly banana data

Method: GET

URI: ``localhost:1995/test``

### Analyse
Performs a Google Vision analysis on a given image.

Method: POST

URI: ``localhost:1995/analyse``

Parameters:
- detectionType
    - Expects a valid function name from the Google Vision API, for example:
        - faceDetection
        - landmarkDetection
- url
    - Expects a valid URL string
