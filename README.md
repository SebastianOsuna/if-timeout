ifTimeout
===

# Usage

```javascript
var ifTimeout = require('if-timeout');
app.use(ifTimeout(sendMeAnEmail, { timeout: 20000, ignore: [/long\/running\/service/i] }));

function sendMeAnEmail (req, res, next) {
  var params = JSON.stringify(req.body || {});
  sendEmail('to@me.com', params);
}
```

# Docs

`ifTimeout(fn, [opts])`

- `opts.timeout` *(defaults: 30000)* Wait time in milliseconds.
- `opts.ignore` *(defaults: [])* List of regex to ignore (compared with the request path).