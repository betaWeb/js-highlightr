const Highlight = require('./index')

if (!String.prototype.highlight) {
    String.prototype.highlight = function(searchable, options = {}) {
        const _instance = new Highlight(options)
        return _instance.highlight(this, searchable)
    }
}

if (!Array.prototype.highlightMany) {
    Array.prototype.highlightMany = function(searchable, options = {}) {
        const _instance = new Highlight(options)
        return _instance.highlightMany(this, searchable)
    }
}
