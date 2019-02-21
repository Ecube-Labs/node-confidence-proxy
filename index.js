const Confidence = require('confidence');

function isObject(maybeObj) {
    // 배열 안에 confidence document가 있을 수 있다.
    return (maybeObj === Object(maybeObj) && typeof maybeObj !== 'function') || (maybeObj instanceof Array);
}

function makeProxy(obj) {
    return new Proxy(obj, {
        get: getHandler,
    });
}

function getHandler(obj, prop) {
    if (obj[prop] === undefined) return obj[prop];
    if (!isObject(obj[prop])) return obj[prop];

    if (obj[prop] instanceof Array) {
        return obj[prop].map((item) => {
            if (item === undefined) return item;
            if (!isObject(item)) return item;
            return makeProxy(item);
        });
    } else {
        return convert(obj, prop);
    }
}

function convert(obj, prop) {
    const store = new Confidence.Store(obj);
    const converted = store.get(`/${prop.toString()}`, process.env);

    if (converted === undefined && obj.$default !== undefined) {
        throw new Error(`Undefined configure: ${prop}`);
    }

    if (!isObject(converted)) {
        return converted;
    } else {
        return makeProxy(converted);
    }
}

module.exports = { get: getHandler };
