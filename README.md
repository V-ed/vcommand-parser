# VCommandParser

![CI/CD](https://github.com/V-ed/vcommand-parser/workflows/CI/CD/badge.svg)
![npm](https://img.shields.io/npm/v/vcommand-parser)
[![Coverage Status](https://coveralls.io/repos/github/V-ed/vcommand-parser/badge.svg?branch=master)](https://coveralls.io/github/V-ed/vcommand-parser?branch=master)
![npm bundle size](https://img.shields.io/bundlephobia/min/vcommand-parser?label=install%20size)

Typescript / Javascript string parser to deal with command-like messages

This package takes a string and separates the content into different components to easily parse commands. This allows you to easily get the specified command, the options, the options contents, and even specify if a option allows content or not.

## Installation

```console
npm install vcommand-parser
```

## Basic Usage

### Parsing string / message

To use this utility, you can simply use the static functions provided by the `VCommandParser` class :

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command');
```

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command --option');
```

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command -abc');
```

In the last example above, there is three "short" options : `["a", "b", "c"]`.

The default command prefix is `!` and the default option prefix is `-`, which are both configurable, as shown below :

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('\\command', '\\');
```

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('\\command ~~option', '\\', '~');
```

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('\\command ~abc', '\\', '~');
```

### Dealing with parsed object

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command --option');

console.log(parsedCommand);
```

The variable `parsedCommand` therefore contains this :

```javascript
VParsedCommand {
  message: '!command --option',
  commandPrefix: '!',
  optionPrefix: '-',
  optionDefinitions: undefined,
  isCommand: true,
  command: 'command',
  content: undefined,
  options: [
    MessageOption {
      name: 'option',
      content: undefined,
      position: 0,
      definition: undefined
    }
  ],
  duplicatedOptions: undefined,
  fullContent: '--option'
}
```

### Dealing with parsed object and content

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command content --option "option content"');

console.log(parsedCommand);
```

The variable `parsedCommand` therefore contains this :

```javascript
VParsedCommand {
  message: '!command content --option "option content"',
  commandPrefix: '!',
  optionPrefix: '-',
  optionDefinitions: undefined,
  isCommand: true,
  command: 'command',
  content: 'content',
  options: [
    MessageOption {
      name: 'option',
      content: 'option content',
      position: 0,
      definition: undefined
    }
  ],
  duplicatedOptions: undefined,
  fullContent: 'content --option "option content"'
}
```

Note in this example : since `"option content"` has a space in its content, you must pad the content with double or single quotes (`"` or `'`). This quoting behavior is handled by the package [quoted-string-space-split](https://www.npmjs.com/package/quoted-string-space-split).

### Accessing options

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('!command content --option "option content"');

const option = parsedCommand.getOption('option');

console.log(option);
```

The variable `option` therefore contains this :

```javascript
MessageOption {
  name: 'option',
  content: 'option content',
  position: 0,
  definition: undefined
}
```

## Usage with Option Definitions

This package allows to define options so that you can have option aliases, descriptions, and even custom behavior (such as "does the option accepts content?").

This is achieved using the `OptionDef` class. This class has 4 parameters, with only one required :

```typescript
new OptionDef(calls: string | string[], acceptsContent = true, description?: string, weight?: number)
```

There are two main ways of defining option definitions : at the parsing stage or in a lazy way :

### Defining options at the parsing stage

```typescript
import { VCommandParser, OptionDef } from 'vcommand-parser';

const definitions = [
  new OptionDef(['l', 'long'], true, 'This is my long description', 1),
  new OptionDef(['s', 'short'], true, 'This is my short description', 2)
];

const parsedCommand = VCommandParser.parse('!command content -l "option content"', undefined, undefined, definitions);

console.log(parsedCommand);
```

The variable `parsedCommand` therefore contains this :

```javascript
VParsedCommand {
  message: '!command content -l "option content"',
  commandPrefix: '!',
  optionPrefix: '-',
  optionDefinitions: [
    OptionDef {
      calls: ['l', 'long'],
      acceptsContent: true,
      description: 'This is my long description',
      weight: 1
    },
    OptionDef {
      calls: ['s', 'short'],
      acceptsContent: true,
      description: 'This is my short description',
      weight: 2
    }
  ],
  isCommand: true,
  command: 'command',
  content: 'content',
  options: [
    MessageOption {
      name: 'l',
      content: 'option content',
      position: 0,
      definition: OptionDef {
        calls: [ 'l', 'long' ],
        acceptsContent: true,
        description: 'This is my long description',
        weight: 1
      }
    }
  ],
  duplicatedOptions: undefined,
  fullContent: 'content -l "option content"'
}
```

The definition is linked to the parsed option, which is useful if you need to access the option's description, weight, etc.

This definition also allows you to define multiple possible calls for the option, so in the previous example, it wouldn't matter if you used `-l` or `--long`, as the definition defines both. Please note that the `calls` will always be an array, but you can define an `OptionDef` using a single string, such as :

```javascript
new OptionDef('l', true, 'This is my long description', 1)
```

### Defining options lazily

You may sometimes prefer to define the definitions after a basic parsing to get the command name and potentially the content too. You therefore have access to another static function in `VCommandParser` :

```typescript
import { VCommandParser, OptionDef } from 'vcommand-parser';

const definitions = [
  new OptionDef(['l', 'long'], true, 'This is my long description', 1),
  new OptionDef(['s', 'short'], true, 'This is my short description', 2)
];

const parsedCommand = VCommandParser.parseLazy('!command content -l "option content"');

console.log(parsedCommand.command); // 'command'
console.log(parsedCommand.content); // 'content -l "option content"'
console.log(parsedCommand.options); // undefined

parsedCommand.setOptionDefinitions(definitions);

console.log(parsedCommand.command); // 'command'
console.log(parsedCommand.content); // 'content'
console.log(parsedCommand.options); // MessageOption[]

console.log(parsedCommand);
```

The variable `parsedCommand` will therefore contain the same definitions as if you didn't do it lazy.

## Usage for strings / messages that are not commands

This package automatically determines if the given string is a command or not based on if the messages starts with the given command prefix.

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('this is a message');

console.log(parsedCommand);
```

```javascript
VParsedCommand {
  message: 'this is a message',
  commandPrefix: '!',
  optionPrefix: '-',
  optionDefinitions: undefined,
  isCommand: false,
  command: undefined,
  content: 'this is a message',
  options: undefined,
  duplicatedOptions: undefined,
  fullContent: 'this is a message'
}
```

When the message is not a command, options aren't parsed :

```typescript
import VCommandParser from 'vcommand-parser';

const parsedCommand = VCommandParser.parse('this is --a message');

console.log(parsedCommand);
```

```javascript
VParsedCommand {
  message: 'this is --a message',
  commandPrefix: '!',
  optionPrefix: '-',
  optionDefinitions: undefined,
  isCommand: false,
  command: undefined,
  content: 'this is --a message',
  options: undefined,
  duplicatedOptions: undefined,
  fullContent: 'this is --a message'
}
```

## Author

- Guillaume Marcoux ([V-ed](https://github.com/V-ed)) - Owner

See also the list of [contributors](https://github.com/V-ed/vcommand-parser/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
