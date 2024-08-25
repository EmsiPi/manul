module.exports = {
	name: "muted",
	async run(bot,message) {
        const target = message.mentions.members.first();
        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === 'Muted'
           );
		await target.roles.add(mutedRole);
	}
}



