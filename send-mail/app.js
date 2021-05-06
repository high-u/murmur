const sendmail = require('sendmail')();

sendmail({
    from: 'yhiguchi+admin@uhuru.jp',
    to: 'yhiguchi+aho@uhuru.jp',
    subject: 'メールのタイトルです',
    text: 'メールの本文です。この例はテキストです。html形式でもOK。',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});