class Gate {
    /** Base class for resolving model ACL
     *
     * @param permissions {array}
     * @returns {Proxy} to check if model has all necessary permissions
     */
    constructor(userPermissions,entity) {
        this.actions = [];
        this.failed = [];
        this.rawData = userPermissions;
        this.permissions = this.__getActionsBy(entity);
        var self = this;

        return new Proxy(this, {
            get: function(person, field) {
                if (field in self) {
                    return self[field];
                }else{
                    self.actions.push(field);
                    return self;
                }
            }
        });
    }

    /**
     *
     * @returns {boolean}
     * @private
     */
    __hasAll(){
        let success = this.actions.every(
            (val) => {
                if(!this.permissions.includes(val)) {
                    this.failed.push(val);
                }
                return this.permissions.includes(val);
            }
        );
        return success;
    }

    /**
     *
     * @returns {boolean}
     */
    isAllowed(){
        return this.__hasAll();
    }

    /**
     * Resets array of 'Actions' and 'Failed'
     */
    resetActions(){
        this.actions =  [];
        this.failed = [];
    }

    __getActionsBy(tagToFind){
        let result = this.rawData.filter(function( obj ) {
            return obj.entity.meta.groupTag.toString() == tagToFind;
        });
        if(result) return result[0].actions;
    }
}
/**
 *
 * @type {Gate}
 */
module.exports = Gate;

