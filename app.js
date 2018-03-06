const   Koa = require('koa'),
        Router = require('koa-router'),
        body = require('koa-body'),
        vision = require('@google-cloud/vision');
        visionClient = new vision.ImageAnnotatorClient();


const   app = new Koa(),
        router = new Router();


app
    .use(router.allowedMethods())
    .use(router.routes())
    .use(body());

app.listen('1995');
console.log('server running on port http://localhost:1995');

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
