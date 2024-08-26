module.exports = {
	name: "muted",
	async run(bot,message) {
        const timeout = message.content.split(' ')[2];
        const target = message.mentions.members.first();
        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === 'Muted'
           );
		await target.roles.add(mutedRole);
        setTimeout(() => {
            target.roles.remove(mutedRole); // remove the role
          }, timeout) 
	}
}