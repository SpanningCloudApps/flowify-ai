oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g worker-cli
$ worker-cli COMMAND
running command...
$ worker-cli (--version)
worker-cli/0.0.0 darwin-x64 node-v18.12.1
$ worker-cli --help [COMMAND]
USAGE
  $ worker-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`worker-cli hello PERSON`](#worker-cli-hello-person)
* [`worker-cli hello world`](#worker-cli-hello-world)
* [`worker-cli help [COMMANDS]`](#worker-cli-help-commands)
* [`worker-cli plugins`](#worker-cli-plugins)
* [`worker-cli plugins:install PLUGIN...`](#worker-cli-pluginsinstall-plugin)
* [`worker-cli plugins:inspect PLUGIN...`](#worker-cli-pluginsinspect-plugin)
* [`worker-cli plugins:install PLUGIN...`](#worker-cli-pluginsinstall-plugin-1)
* [`worker-cli plugins:link PLUGIN`](#worker-cli-pluginslink-plugin)
* [`worker-cli plugins:uninstall PLUGIN...`](#worker-cli-pluginsuninstall-plugin)
* [`worker-cli plugins:uninstall PLUGIN...`](#worker-cli-pluginsuninstall-plugin-1)
* [`worker-cli plugins:uninstall PLUGIN...`](#worker-cli-pluginsuninstall-plugin-2)
* [`worker-cli plugins update`](#worker-cli-plugins-update)

## `worker-cli hello PERSON`

Say hello

```
USAGE
  $ worker-cli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/hackathon-ai/worker-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `worker-cli hello world`

Say hello world

```
USAGE
  $ worker-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ worker-cli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [dist/commands/hello/world.ts](https://github.com/hackathon-ai/worker-cli/blob/v0.0.0/dist/commands/hello/world.ts)_

## `worker-cli help [COMMANDS]`

Display help for worker-cli.

```
USAGE
  $ worker-cli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for worker-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.18/src/commands/help.ts)_

## `worker-cli plugins`

List installed plugins.

```
USAGE
  $ worker-cli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ worker-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/index.ts)_

## `worker-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ worker-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ worker-cli plugins add

EXAMPLES
  $ worker-cli plugins:install myplugin 

  $ worker-cli plugins:install https://github.com/someuser/someplugin

  $ worker-cli plugins:install someuser/someplugin
```

## `worker-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ worker-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ worker-cli plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/inspect.ts)_

## `worker-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ worker-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ worker-cli plugins add

EXAMPLES
  $ worker-cli plugins:install myplugin 

  $ worker-cli plugins:install https://github.com/someuser/someplugin

  $ worker-cli plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/install.ts)_

## `worker-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ worker-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ worker-cli plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/link.ts)_

## `worker-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ worker-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ worker-cli plugins unlink
  $ worker-cli plugins remove
```

## `worker-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ worker-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ worker-cli plugins unlink
  $ worker-cli plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/uninstall.ts)_

## `worker-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ worker-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ worker-cli plugins unlink
  $ worker-cli plugins remove
```

## `worker-cli plugins update`

Update installed plugins.

```
USAGE
  $ worker-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.0/src/commands/plugins/update.ts)_
<!-- commandsstop -->
