const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');
const s3 = new AWS.S3({
  accessKeyId: 'AKIAIWYJGVMNNDPCP5GA',
  secretAccessKey: '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',
  region : 'us-west-1'
});
module.exports = app => {
  app.get('/api/upload', (req, res) => {
    const key = `krutika.mude/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'team-fandango-bucket',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};
