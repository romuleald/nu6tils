var renameObjectProp = function (obj, oldName, newName) {
    // Do nothing if the names are the same
    if (oldName == newName) {
        return obj;
    }
    // Check for the old property name to avoid a ReferenceError in strict mode.
    if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
    }
    return obj;
};
module.exports = renameObjectProp;