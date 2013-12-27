var Twitter = function (param) {
  this.consumerKey = param.consumerKey;
  this.consumerSecret = param.consumerSecret;
  this.accessToken = param.accessToken;
  this.tokenSecret = param.tokenSecret;
};

Twitter.prototype.get = function(api, content) {
  var accessor = {
    consumerSecret: this.consumerSecret,
    tokenSecret: this.tokenSecret
  };

  var message = {
    method: "GET",
    action: api,
    parameters: {
      oauth_signature_method: "HMAC-SHA1",
      oauth_consumer_key: this.consumerKey,
      oauth_token: this.accessToken
    }
  };

  for (var key in content) {
    message.parameters[key] = content[key];
  }

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var target = OAuth.addToURL(message.action, message.parameters);

  var options = {
    type: message.method,
    url: target,
    dataType: "jsonp",
    jsonp: false,
    cache: true
  };

  $.ajax(options);
}

Twitter.prototype.post = function(api, content, callback) {
  var accessor = {
    consumerSecret: this.consumerSecret,
    tokenSecret: this.tokenSecret
  };

  var message = {
    method: "POST",
    action: api,
    parameters: {
      oauth_version: "1.0",
      oauth_signature_method: "HMAC-SHA1",
      oauth_consumer_key: this.consumerKey,
      oauth_token: this.accessToken
    }
  };

  for (var key in content) {
    message.parameters[key] = content[key];
  }

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var target = OAuth.addToURL(message.action, message.parameters);

  var options = {
    type: message.method,
    url: target,
    dataType: "json",
    success: function(d, dt) {
      callback(d, dt);
    }
  };

  $.ajax(options);

};
var tweet_str;
var tweet = function (e) {

  var twitter = new Twitter({
    consumerKey: localStorage["consumerKey"],
    consumerSecret: localStorage["consumerSecret"],
    accessToken: localStorage["accessToken"],
    tokenSecret: localStorage["accessTokenSecret"]
  });

  var content = '';
  twitter.post("https://api.twitter.com/1.1/statuses/update.json?status="+tweet_str, content)

  return e;
};


// BrowserActionがクリックされた時の処理
chrome.browserAction.onClicked.addListener(function(tab) {
    var taburl = tab.url;
    var tabtitle = tab.title + ' ';
    tweet_str = encodeURIComponent('Now Browsing: '+ tabtitle + taburl);
    var notification = webkitNotifications.createNotification(
      'icon-48.png',  // icon url - can be relative
      'Now Browsing',  // notification title
      'Now Browsing: '+ tabtitle + taburl  // notification body text
    );
    notification.show();
    tweet(); // つぶやく

    setTimeout(function(){// 何秒後にNotificationを消すか。
      notification.cancel();
    },2000);
});


