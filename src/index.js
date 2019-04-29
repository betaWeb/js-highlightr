class Highlighter {

    /**
     * @param {Object} options
     * @param {Object} options.html_params
     * @param {String} options.html_tag
     * @param {String} options.css_classes
     * @param {String} options.regexp
     * @param {String} options.regexp_flags
     * @param {Number} options.word_min_length
     */
    constructor(options = {}) {
        this.setOptions(options)
    }

    /**
     * Highlight a word or a group of words in a string
     *
     * @param {String} context
     * @param {String|Array} searchable
     * @returns {String}
     */
    highlight(context, searchable) {
        if (!context || !context.length) return ''
        if (!searchable || !searchable.length) return context
        return this._highlight(context, searchable)
    }

    /**
     * Highlight a word or a group of words in an array of string
     *
     * @param {String[]} contextArray
     * @param {String} searchable
     * @returns {*}
     */
    highlightMany(contextArray, searchable) {
        if (!contextArray || !Array.isArray(contextArray))
            throw new Error('Highlight::highlightMany - contextArray parameter must be of type array')

        return contextArray.reduce((acc, context) => {
            acc.push(this.highlight(context, searchable))
            return acc
        }, [])
    }

    setOptions(options = {}) {
        this._params = {
            html_attrs: {},
            html_tag: 'span',
            css_classes: 'search__highlight',
            regexp: '__exp__',
            regexp_flags: 'gi',
            word_min_length: 2,
            ...options
        }
    }

    _prepare(searchable) {
        const initial_value = searchable
        searchable = searchable.constructor === String ? searchable.split(' ') : searchable
        searchable.unshift(initial_value)
        return searchable
            .filter((v, i, s) => s.indexOf(v) === i)
            .filter(v => v.length > this._params.word_min_length)
            .map(i => i.trim())
            .join('|')
    }

    /**
     * Highlight one or several words in a string
     *
     * @param {String} context
     * @param {String} searchable
     * @returns {string}
     * @private
     */
    _highlight(context, searchable) {
        searchable = this._prepare(searchable)
        if (!searchable.length) return context
        return context.replace(
            this._buildRegExp(searchable), 
            match => this._buildTemplate(match)
        )
    }

    /**
     *
     * @param {String} context
     * @param {String} searchable
     * @returns {boolean}
     * @private
     */
    _belongsToContext(searchable, context) {
        return (new RegExp(searchable, 'gi')).test(context)
    }

    /**
     * @param {String} searchable
     * @returns {RegExp}
     * @private
     */
    _buildRegExp(searchable) {
        return new RegExp(this._params.regexp.replace('__exp__', searchable), this._params.regexp_flags)
    }

    /**
     * @param {String} word
     * @returns {string}
     * @private
     */
    _buildTemplate(word) {
        return `<${this._params.html_tag} class="${this._params.css_classes}" ${this._buildAttrs()} js-highlightr>${word}</${this._params.html_tag}>`
    }

    /**
     * Build HTML attributes
     *
     * @returns {string}
     * @private
     */
    _buildAttrs() {
        if (!Object.keys(this._params.html_attrs).length) return ' '
        let _attrs = ['']
        for (let i in this._params.html_attrs) {
            if (this._params.html_attrs.hasOwnProperty(i)) {
                _attrs.push(`${i}="${this._params.html_attrs[i]}"`)
            }
        }
        return _attrs.join(' ')
    }
}

module.exports = Highlighter
