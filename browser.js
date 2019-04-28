const Highlight = require('./index')

if (!String.prototype.highlight) {
    String.prototype.highlight = function (searchable, options = {}) {
        const _instance = new Highlight(options)
        return _instance.highlight(this, searchable)
    }
}

if (!Array.prototype.highlightMany) {
    Array.prototype.highlightMany = function (searchable, options = {}) {
        const _instance = new Highlight(options)
        return _instance.highlightMany(this, searchable)
    }
}

if (!Node.prototype.highlight) {
    Node.prototype.highlight = function (searchable, options = {}) {
        const _instance = new Highlight(options)
        this.innerHTML = _instance.highlight(this.innerText, searchable)
        return this
    }
}
