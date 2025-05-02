import javascriptGenerator from '../javascriptGenerator';
import { registerBlock } from '../register';
import Blockly from 'blockly/core';

const categoryPrefix = 'vm_';
const categoryColor = '#cca';

function register() {
    registerBlock(`${categoryPrefix}vmstart`, {
        message0: 'start project',
        args0: [],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.greenFlag();`;
        return `${code}\n`;
    })
    registerBlock(`${categoryPrefix}vmstop`, {
        message0: 'stop project',
        args0: [],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.stopAll();`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}vmrunning`, {
        message0: 'project running?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `(Scratch.vm.runtime.threads.length > 0)`;
        return [`${code}`, 0];
    })

    registerBlock(`${categoryPrefix}vmonstart`, {
        message0: 'when project started %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        order: 1,
        colour: categoryColor
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `Scratch.vm.on('PROJECT_RUN_START', (async () => { ${BLOCKS} }));`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}vmonstop`, {
        message0: 'when project stopped %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        order: 1,
        colour: categoryColor
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `Scratch.vm.on('PROJECT_RUN_STOP', (async () => { ${BLOCKS} }));`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}vmturboget`, {
        message0: 'turbo mode enabled?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.turboMode`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}vmturboset`, {
        message0: 'set turbo mode to %1',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "Boolean"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT')
        const code = `Scratch.vm.runtime.turboMode = ${INPUT};`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}vmframeget`, {
        message0: 'frame rate',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.frameLoop.framerate`;
        return [`${code}`, 0];
    })
    registerBlock(`${categoryPrefix}vmframeset`, {
        message0: 'set frame rate to %1',
        args0: [
            {
                "type": "field_number",
                "name": "INPUT",
                "check": "Number",
                "value": 30,
                "acceptsBlocks": true
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT')
        const code = `Scratch.vm.runtime.frameLoop.setFramerate(${INPUT});`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}vmtimer`, {
        message0: 'seconds since started',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = `Scratch.vm.runtime.ioDevices.clock.projectTimer()`;
        return [`${code}`, 0];
    })
}

export default register;