import { Client, Message, PermissionsBitField } from "discord.js";
import { PermissionException, NoTargetException, BotTargetException, BadIntegerException, TimeoutTooLongException } from "./MuteExceptions";

class MuteService {

    private static instance: MuteService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new MuteService();
        }

        return this.instance;
    }

    async mute(bot: Client, message: Message<boolean>) {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            throw new PermissionException();
        }

        const timeout = Number(message.content.split(/ +/)[2])
        const target = message.mentions.members?.first();
        if (target == null) {
            throw new NoTargetException();
        }

        if (target.id == bot.user?.id) {
            throw new BotTargetException();
        }

        if (!Number.isInteger(timeout) || timeout <= 0) {
            throw new BadIntegerException();
        }

        if (timeout >= 100) {
            throw new TimeoutTooLongException();
        }

        const mutedRole = message.guild?.roles.cache.find((role) => role.name === 'Muted');
        if(mutedRole != null) {
            await target.roles.add(mutedRole);
            setTimeout(() => {
                target.roles.remove(mutedRole); // remove the role
            }, timeout * 60000);
        }
    }
}

export default MuteService.getInstance();