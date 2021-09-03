
// domain/.netlify/functions/hello
const items = [
    { id: 1, name: 'mark' },
    { id: 2, name: 'sveta' }
]

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        // body: JSON.stringify(items)
        body: 'hello world'
    }
}