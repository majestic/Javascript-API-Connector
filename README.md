# JavaScript API Connector

JavaScript Connector for connecting to the Majestic API.

Requires JQuery.

### Notice

Client-side JavaScript is often not the best place to make API requests, due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) and the requirement of sensitive information (such as your API key) on the client.
We recommend performing requests to the API server-side, either using a server implementation of JavaScript (such as NodeJS), or one of [the other connectors](https://github.com/majestic?tab=repositories).