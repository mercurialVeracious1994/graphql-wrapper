export const convertNodeIdToCursor = (node) => {
    return new Buffer(node, 'utf8').toString('base64');


}

export const convertCursorToNodeId = (cursor) => {
    return new Buffer(cursor, 'base64').toString('utf8')
}