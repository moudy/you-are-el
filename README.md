# Url and path formatting helper for node/browser

Useful for sanitizing user input or output data.

``` javascript
var youAreEl = require('you-are-el');

youAreEl('https://facebook.com/foo/bar/').toPath();
youAreEl('http://facebook.com/foo/bar/').toPath();
youAreEl('facebook.com/foo/bar/').toPath();
youAreEl('/foo/bar/').toPath();
youAreEl('foo/bar/').toPath();
// all equal 'foo/bar'

youAreEl('foo/bar').toUrl('facebook.com');
youAreEl('foo/bar').toUrl('http://facebook.com');
youAreEl('foo/bar').toUrl({ host: 'facebook.com' });
// all equal 'http://facebook.com/foo/bar'

// Specify protocol option
youAreEl('foo/bar').toUrl({ protocol: 'https', host: 'facebook.com'});
// equals 'https://facebook.com/foo/bar'

// Omit protocol
youAreEl('foo/bar').toUrl({ protocol: false, host: 'facebook.com'});
// equals 'facebook.com/foo/bar'

// Specify host option
youAreEl('foo/bar').toUrl({ host: 'twitter.com'});
// equals 'twitter.com/foo/bar'
```
