/**
 * Group model
 */
export class GroupModel {
	/**
	 * Initializes model
	 */
	constructor (group) {
		this.id = group._id;
		this.authorId = group.author;
		this.groupUsers = group.groupUsers;
		this.groupMessages = group.groupMessages;
		this.meta = {
			groupName: group.meta.groupName,
			groupTag: group.meta.groupTag,
			description: group.meta.description,
			updated_at: group.meta.updated_at,
			created_at: group.meta.created_at,
			maxUsers: group.meta.maxUsers,
		};
	}
}