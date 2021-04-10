# Configure Google Font API


https://developers.google.com/fonts/docs/developer_api

## Create a new key

https://console.cloud.google.com/marketplace


https://console.cloud.google.com/marketplace/product/google/webfonts.googleapis.com

![](font-api-marketplace.png)

![](api-name-and-restrictions.png)

```
curl 'https://webfonts.googleapis.com/v1/webfonts?sort=TRENDING&key=AIzaSyCRncmnfOYy8T1Mnx0xgTD0tBFs-hd6xmQ'  --header 'Accept: application/json'  --compressed
```

Same request using JavaScript

```javascript
<script src="https://apis.google.com/js/api.js"></script>
<script>
  /**
   * Sample JavaScript code for webfonts.webfonts.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/webfonts/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.webfonts.webfonts.list({})
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");
</script>
<button onclick="loadClient()">load</button>
<button onclick="execute()">execute</button>
```

## Constructing the URL

https://developers.google.com/fonts/docs/css2

