# js-highlightr
Highlightr allows you to highlight specific words in a string.

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

## Basic usage
It returns a string with highlighted words, surrounded by a HTML tag.

For example, this little piece of Javascript down there...
```
const highlighter = new Highlighter()
let sentence = "Highlight something"

sentence = highlighter.highlight(sentence, "something")
```

returns the following HTML string :
```HTML
Highlight <span class="search__highlight" data-highlight="hl_1">something</span>
```

## deal with options
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

