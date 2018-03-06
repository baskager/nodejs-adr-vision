# AdamLink Depiction Recognition API
A very simple API which compares portraits from the Adamlink project. By using facial recognition we can identify and label the people that are depicted.

Dependencies:
- NodeJS
- Koa
- Koa-router
- Koa-body
- Google Cloud Vision API

# Available endpoints

### Test
Simple test endpoint, returns silly banana data

Method: GET

URI: ``localhost:1995/test``

### Analyse
Simple test endpoint, returns silly banana data

Method: POST

URI: ``localhost:1995/analyse``

Parameters:
- url
    - Expects a valid URL string
