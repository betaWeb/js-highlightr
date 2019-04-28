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

        if (searchable && searchable.length) {
            let parts = this._prepare(searchable.trim())

            if (!parts.length) return context

            if (parts.length === 1 || (parts.length > 1 && this._belongsToContext(searchable, context))) {
                return this._highlightWord(context, searchable)
            }

            return parts.reduce(this._highlightWord.bind(this), context)
        }

        return context
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
        return (searchable.constructor === String ? searchable.split(' ') : searchable)
            .filter((v, i, s) => s.indexOf(v) === i)
            .filter(v => v.length > this._params.word_min_length)
            .map(i => i.trim())
    }

    /**
     * Highlight word in a string
     *
     * @param {String} context
     * @param {String} word
     * @param {Number} index
     * @returns {string}
     * @private
     */
    _highlightWord(context, word, index = 0) {
        return context.replace(
            this._buildRegExp(word),
            this._buildTemplate(word, index)
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
     * @param {String} word
     * @returns {RegExp}
     * @private
     */
    _buildRegExp(word) {
        return new RegExp(this._params.regexp.replace('__exp__', word), this._params.regexp_flags)
    }

    /**
     * @param {String} word
     * @param {Number} index word index
     * @returns {string}
     * @private
     */
    _buildTemplate(word, index) {
        return `<${this._params.html_tag} class="${this._params.css_classes}" ${this._buildAttrs()} data-highlight="hl_${index + 1}">${word}</${this._params.html_tag}>`
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
