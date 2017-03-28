import * as schedule from 'node-schedule';
import {Github} from '../models/Github';
let https = require('https');

export default schedule.scheduleJob('*/1 * * * *', function(){
  let options = {
    hostname: 'api.github.com',
    path: '/repos/vmg/redcarpet/issues?state=closed',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'CoderCampsTesting'
    }
  };

  let req = https.get(options, (res) => {
    let stream = '';
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      stream += chunk;
      // console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      Github.create(JSON.parse(stream));
      console.log('No more data in response.');
    });
  });
  req.end();
});
