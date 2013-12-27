function save_options() {
  var consumerKeyInput = document.getElementById("consumerKey");
  var consumerKey = consumerKeyInput.value;

  var consumerSecretInput = document.getElementById("consumerSecret");
  var consumerSecret = consumerSecretInput.value;

  var accessTokenInput = document.getElementById("accessToken");
  var accessToken = accessTokenInput.value;

  var accessTokenSecretInput = document.getElementById("accessTokenSecret");
  var accessTokenSecret = accessTokenSecretInput.value;

  localStorage["consumerKey"] = consumerKey;
  localStorage["consumerSecret"] = consumerSecret;
  localStorage["accessToken"] = accessToken;
  localStorage["accessTokenSecret"] = accessTokenSecret;

  alert('done!!');

}


function restore_options() {
  var nowCK = localStorage["consumerKey"];
  var nowCS = localStorage["consumerSecret"];
  var nowAT = localStorage["accessToken"];
  var nowATS = localStorage["accessTokenSecret"];

  document.getElementById("consumerKey").value = nowCK;
  document.getElementById("consumerSecret").value = nowCS;
  document.getElementById("accessToken").value = nowAT;
  document.getElementById("accessTokenSecret").value = nowATS;
}


document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);