roisalen: angular-frontend
========

roisalen is a simple app for managing meetings. This is the frontend.

## INSTALLING:
1. First setup the backend.
2. Clone this repo.
3. Set server url, organization name and which css file to use (choose among the ones in css/) in js/speakerApp.js

## Developer tips

If you want to set it up locally, use
```
python -m SimpleHTTPServer
``` in the angular-frontend directory to serve the frontend on http://127.0.0.1:8000 

If your backend server is hosted at another domain, you have to tell visiting
browsers to enable [Cross-Origin Resource Sharing (CORS)][cors] so that
javascript is allowed to send requests to the other server. The quick and dirty
way to do this is to simply send a header telling the browser to allow all CORS
requests.

[cors]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing

Below is an example of how to do this for an Apache-server:


```htaccess
Header set Access-Control-Allow-Origin "*"
```
