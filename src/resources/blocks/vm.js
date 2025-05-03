import javascriptGenerator from '../javascriptGenerator';
import { registerBlock } from '../register';
import Blockly from 'blockly/core';

const categoryPrefix = 'vm_';
const categoryColor = '#cca';

function register() {
    registerBlock(`${categoryPrefix}startbranch`, {
        message0: 'start breach %1',
        args0: [
            {
                "type": "field_number",
                "name": "INPUT",
                "check": null,
                "text": "1",
                "acceptsBlocks": true
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `util.startBranch(1, true);`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}stackframe`, {
        message0: 'stack frame %1',
        args0: [
            {
                "type": "field_input",
                "name": "INPUT",
                "check": null,
                "text": "",
                "acceptsBlocks": true
            },
        ],
        output: "",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `util.stackFrame;`;
        return [`${code}`, 0];
    })
}

export default register;