import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import OptionDef from './option-def';
import { default as parseMessage, VCommandParser } from './vcommandparser';
import { VLazyParsedCommand, VParsedCommand } from './vparsedcommand';

export {
	parseMessage,
	VCommandParser,
	VParsedCommand,
	VLazyParsedCommand,
	OptionPrefix,
	OptionDef,
	MessageOption
};

export default parseMessage;
