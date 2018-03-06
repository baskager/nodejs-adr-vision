const   Koa = require('koa'),
        Router = require('koa-router'),
        vision = require('@google-cloud/vision');
        visionClient = new vision.ImageAnnotatorClient();


const   app = new Koa(),
        router = new Router(),
        port = 1995;


app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.listen(port);
console.log('server running on port http://localhost:' + port);
// Analyse endpoint, you can send an image url and a detectionType to do a
// Google Vision image analysis
router.post('/analyse', async context => {
    let requestBody = context.request.body;
    if(requestBody) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        if(pattern.test(requestBody.url)) {

            // Check if requested function exists in the Google Vision API
            if (typeof visionClient[requestBody.detectionType] === "function") {
                // Use the Google Vision client to analyse the image on the URL requested
                await visionClient[requestBody.detectionType](requestBody.url)
                .then(results => {
                    context.body = results;
                })
                .catch(err => {
                    context.res.statusCode = 400;
                    context.body = "<h1>400 - Bad Request</h1>";
                    context.body += "<p>Google vision API could not process the image</p>";
                });
            } else {
                context.res.statusCode = 400;
                context.body = "<h1>400 - Bad Request</h1>";
                context.body += "<p>Google Vision API does not have the function: "
                    + requestBody.detectionType;
            }



        } else {
            context.res.statusCode = 400;
            context.body = "<h1>400 - Bad Request</h1>";
            context.body += "<p>Invalid data for parameter: url</p>";
        }
    }
});
// Simple test endpoint to check if you got things working :)
router.get('/test', async context => {
    console.log('reached test');
    // context.body = "<h1>test</h1>";
    await visionClient
      .labelDetection('https://usatftw.files.wordpress.com/2015/10/sleep-banana.jpg?w=1000&h=666    ')
      .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label.description));

        context.body = labels;
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
});
