/**
 * User settings model
 */
class UserSettingsModel {
	/**
	 * Initializes model
	 */
	constructor(settings) {
		this.id = settings._id;
		this.updated_at = settings.updated_at;
		this.meta = {
			notifications: {
				allowsPush: settings.meta.notifications.allowsPush,
				EmailPeriod: settings.meta.notifications.EmailPeriod,
				allowsEmails: settings.meta.notifications.allowsEmails,
			},
			timeZone: settings.meta.timeZone,
		}
	}
}

/**
 * User model
 */
export class UserModel {
	/**
	 * Initializes model
	 */
	constructor(user) {

		this.id = user._id;
		this.name = user.name;
		this.email = user.email;

		this.hash = user.hash;
		this.password = user.password;
		this.acl = user.acl;

		this.updated_at = user.updated_at;
		this.created_at = user.created_at;

		this.settings = new UserSettingsModel(user.settings);

		this.meta = {
			avatar: user.meta.avatar,
			title: user.meta.title,
			age: user.meta.age
		};
	}
}