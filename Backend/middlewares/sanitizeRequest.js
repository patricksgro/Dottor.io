import sanitizeHtml from 'sanitize-html'

export const sanitizeDeep = (value) => {
    if (typeof value === 'string') {
        return sanitizeHtml(value.trim())
    }

    if (Array.isArray(value)) {
        return value.map(sanitizeDeep)
    }

    if (typeof value === 'object' && value !== null) {
        const sanitizeObj = {}
        for (const key in value) {
            sanitizeObj[key] = sanitizeDeep(value[key])
        }
        return sanitizeObj
    }
    return value
}

export const sanitizeRequest = (req, res, next) => {
    if (req.body) req.body = sanitizeDeep(req.body)
    if (req.query) sanitizeDeep(req.query)
    next()
}