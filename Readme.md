
# Lingo

 Lingo is a linguistics module, currently providing inflection and some string transformations. Eventually I would like to extend its capabilities and add additional languages.

## Installation

    $ npm install lingo

## Annotated Source

  Can be viewed [here](http://visionmedia.github.com/lingo).

## Transformations

### lingo.capitalize()

Capitalize the first word of a string:

    lingo.capitalize('hello there');
    // => "Hello there"

Capitalize all words:
 
    lingo.capitalize('hello there', true);
    // => "Hello There"

### lingo.camelcase()

Camelcase a string:

    lingo.camelcase('foo bar');
    // => "fooBar"

Camelcase with first character upppercase:

    lingo.camelcase('foo bar baz', true);
    // => "FooBarBaz"

## i18n (translations)

Lingo provides you with the `translate()` method, which accepts
a string optionally including placeholders which are provided by the object as the second argument. 

    var t = require('lingo').translate;
    var greeting = t('Welcome {name}', { name: user.name });

By default the language is set to _en_, however you can implement a new `Language` as shown below.

    var Language = require('lingo').Language
      , french = new Language('fr');

    french.translations = {
      'Welcome {name}': 'Bonjour {name}'
    };

## License

(The MIT License)

Copyright (c) 2009-2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.