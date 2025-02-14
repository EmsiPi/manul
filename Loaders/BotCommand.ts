import { Client, Message } from "discord.js";

export class BotCommand {
    private _name: string;
    private _description: string;
    private _run: (bot: Client, message: Message<boolean>)=>Promise<void>;

    constructor(name: string, description: string, run: (bot: Client, message: Message<boolean>)=>Promise<void>) {
        this._name = name;
        this._description = description;
        this._run = run;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get run() {
        return this._run;
    }
}