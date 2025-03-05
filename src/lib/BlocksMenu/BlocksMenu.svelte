<script>
    import util from "../../resources/util";
    import CreateButton from "./CreateButton.svelte";
    import Blockly from "blockly/core";

    function updateBlocks() {
        blocks = window.blocks
        window.blocks = blocks

        //refresh workspace
        let workspace = Blockly.getMainWorkspace()
        let xml = Blockly.Xml.workspaceToDom(workspace);
        workspace.clear();
        Blockly.Xml.domToWorkspace(xml, workspace);
        this.refreshToolboxSelection();
    }

    function createBlock() {
        let id = util.randomHex(16)
        let block = {
            fields: [
                "block",
                "BLOCK"
            ]
        }
        window.blocks[id] = block

        let workspace = Blockly.getMainWorkspace()
        /** @type {Blockly.BlockSvg} */
        let defineBlock = workspace.newBlock("blocks_define")
        defineBlock.setDeletable(false)
        defineBlock.blockId_ = id
        defineBlock.updateShape_()
        defineBlock.initSvg()
        defineBlock.render()

        updateBlocks()
    }

    function tempEditBlock(id) {
        let block = window.blocks[id]
        block.fields[0] = prompt("Block Name?", "block")

        updateBlocks()
    }

    function tempEditType(id, set) {
        if (set !== null) {
            let block = window.blocks[id]
            block.fields[1] = prompt("Block Type?", "block")

            updateBlocks()
        } else {
            let block = window.blocks[id]
            switch (set) {
                case "0": block.fields[1] = "BLOCK"; break;
                case "1": block.fields[1] = "REPORTER"; break;
                case "2": block.fields[1] = "BOOLEAN"; break;
                case "3": block.fields[1] = "CONDITIONAL"; break;
                case "4": block.fields[1] = "LOOP"; break;
                default: block.fields[1] = "BLOCK"; break;
            }

            updateBlocks()
        }
    }

    let blocks = {}

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function dropdown() {
          document.getElementById("myDropdown").classList.toggle("show");
    }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>

<div class="main">
    <CreateButton on:click={createBlock} />
    {#each Object.entries(blocks) as [id, block]}
        <div class="block">
            <span class="name">{block.fields[0]}</span>
            <div class="dropdown">
                <button onclick="dropdown()" class="dropbtn">Dropdown</button>
                <div id="myDropdown" class="dropdown-content">
                    <a on:click={() => tempEditType(id, 0)}">Block</a>
                    <a on:click={() => tempEditType(id, 1)}">Reporter</a>
                    <a on:click={() => tempEditType(id, 2)}">Boolean</a>
                    <a on:click={() => tempEditType(id, 3)}">Conditional</a>
                    <a on:click={() => tempEditType(id, 4)}">Loop</a>
                </div>
            </div>
            <div>
                <button class="edit" on:click={() => tempEditBlock(id)}>Edit</button>
            </div>
        </div>
    {:else}
        <p>no blocks yet!</p>
    {/each}    
</div>

<style>
    .main {
        padding: 16px;
        display: flex;
        width: min(calc(100vw - 32px), 1024px);
        flex-direction: column;
        align-items: center;
        margin: auto;
        gap: 0.5em;
    }

    .block {
        background: #8884;
        width: 100%;
        height: 4em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0.8em;
        box-sizing: border-box;
        padding: 8px;
    }

    .block button {
        appearance: none;
        border: none;
        background: #4bf;
        width: 100%;
        font-size: 1rem;
        padding: 0.4rem 1rem;
        border-radius: 0.2em;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        font-weight: bold;
    }

.dropbtn {
        appearance: none;
        border: none;
        background: #4bf;
        width: 100%;
        font-size: 1rem;
        padding: 0.4rem 1rem;
        border-radius: 0.2em;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        font-weight: bold;
        transition: background-color:
}

.dropbtn:hover, .dropbtn:focus {
  background: #3ae;
}

.dropdown {
    position: relative;
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 0.2em;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding: 0.4rem 1rem;
  border-radius: 0.2em;
}

.dropdown-content a {
  color: black;
  padding: 0.4rem 1rem;
  border-radius: 0.2em;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
</style>
