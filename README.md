# Programmer Bot

This bot was created for [Programmer Network](https://programmer.network), which you can join on [Twitch](https://www.twitch.tv/programmer_network) or [Discord](https://discord.gg/ysnpXnY7ba).

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
  - [Linting](#linting)
  - [Deploy Commands](#deploy-commands)
- [Contributing](#contributing)


## Features

### Slash Commands

> _Note:_ Slash Commands must be registered before they can be used. See [Deploy Commands](#deploy-commands) for instructions on how to do this.

- `/ping`: Returns the bot's latency and can be used to test if the bot is online.
- `/adopt <@user>`: Adopt a user as an Early Adopter, which gives them the `Early Adopter ⭐` role and instructs them to use `#early-adopters` for discussions related to the platform.

## Setup


1. Clone the repository

> _Note:_ this project was created with `yarn`, so if you use `npm` you might run into some issues (and should remove `yarn.lock` before running anything).

2. Run `npm install` or `yarn`
3. Rename `.env.example` to `.env` and fill in the values
   - DISCORD_TOKEN: Obtained by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
   - DISCORD_CLIENT_ID: Your Application ID available under `Your App > General Information` after following the above guide.
   - DISCORD_DEBUG_GUILD_ID: This variable is used to deploy the newest bot commands to a specific server. To obtain the server ID, right-click the desired server in Discord and select 'Copy ID'. This requires 'Developer Mode' to be enabled, which can be done by going to `User Settings (gear icon) > Advanced` and toggling the 'Developer Mode' switch."

## Usage

### Development

Run `npm run dev` or `yarn dev` to start the bot in development mode, which will automatically restart the bot when changes are made.

### Production

First build the project by running `npm run build` or `yarn build`.

Then execute `npm run start` or `yarn start` to start the bot in production mode.

#### Fly.io

To deploy a new version of the bot, execute `flyctl deploy`.

To stop the bot, execute `flyctl scale count 0`. You must re-deploy for changes to take effect.

The bot can be restarted by reverting to `flyctl scale count 1` and re-deploying.

### Linting

Run `npm run lint:fix` or `yarn lint:fix` to lint the code and implement any fixes, or omit the `:fix` to just run the linter without making any changes.

### Deploy Commands

#### To Specific Server

Run `npm run deploy:guild` or `yarn deploy:guild` to deploy all the bot's commands to the server specified in the `DISCORD_DEBUG_GUILD_ID` environment variable.

#### Globally (All Servers)

Run `npm run deploy:global` or `yarn deploy:global` to deploy all the bot's commands globally (to all servers the bot is in).

> _Note:_ It might take up to an hour to take effect.


## Contributing

Contributions are welcome, please open a pull request or issue if you have any suggestions or find any bugs and try to be as descriptive as possible. Don't forget to run [Linting](#linting) before opening a pull request.