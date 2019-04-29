# js-highlightr
Highlightr allows you to highlight specific words in a string.

<br><br><br>

## Getting started
Very simple to install...
```JS
const Highlighter = require('js-highlightr')
```

...and very simple to use :
```JS
const highlighter = new Highlighter()
let sentence = "I wan't Highlighter to highlight words in this awesome sentence"

sentence = highlighter.highlight(sentence, "Highlighter awesome words")
```

You also can use Highlightr directly on your browser. You just have to download the `build/highlightr.min.js` file and import it into your HTML :
```HTML
<script src="/path/to/highlightr.min.js"></script>
```
And use it directly on a JS string via the `highlight` method (which is available in the String prototype) :
```JS
const str = "My awesome string"
str.highlight('awesome') // My <span class="search__highlight" js-highlight>awesome</span> string
```

You can pass options too :
```JS
const str = "My awesome string"
str.highlight('awesome', {
    css_classes: 'highlight-string'
}) // My <span class="highlight-string" js-highlight>awesome</span> string
```

<br><br><br>

## Basic usage
It returns a string with highlighted words, surrounded by a HTML tag.

For example, this little piece of Javascript down there...
```JS
const highlighter = new Highlighter()
let sentence = "Highlight something"

sentence = highlighter.highlight(sentence, "something")
```

returns the following HTML string :
```HTML
Highlight <span class="search__highlight" js-highlight>something</span>
```

<br><br>

You also can directly highlight word or group of words on a HTMLNodeElement with the `highlight` method :
```HTML
<p class="sentence">My awesome string</p>
```

In your JS script :
```JS
document.querySelector('.sentence').highlight('awesome')
 // <p class="sentence">My <span class="search__highlight" js-highlight>awesome</span> string</p>
```

<br><br><br>

## deals with options
You can pass many options to the class :
```JS
const highlighter = new Highlighter({
    html_attrs: {},                     // pass html attributes to the wrapping HTML tag 
    html_tag: 'span',                   // HTML wrapping tag name
    css_classes: 'search__highlight',   // HTML wrapping tag class
    regexp: '__exp__',                  // Word search custom regexp. It must be contains __exp__ which is replaces by the seeking word
    regexp_flags: 'gi',                 // Regiexp flags
    word_min_length: 2                  // min length of a word to highlight
})
```

