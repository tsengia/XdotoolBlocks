Blockly.Xdotool = new Blockly.Generator("Xdotool");

Blockly.Xdotool.addReservedWords("#, \", \'");

Blockly.Xdotool.COMMENT_WRAP = 35;

Blockly.Xdotool.inClearmods = false; // Set to true if inside of a "Clear Modifiers" block
Blockly.Xdotool.inSync = false; // Set to true if inside of a "Sync" block
Blockly.Xdotool.inWindow = false; // Set to true if inside of a "In Window" block
Blockly.Xdotool.windowID = "%1";

Blockly.Xdotool.init = function (workspace) {
	this.INDENT = ""; // This helps prevent an annoying indent from the Script Start statement making the code look messy
};

Blockly.Xdotool.scrubNakedValue = function (dirty_code) {
	return ""; //We don't allow a hanging line of code....
};

Blockly.Xdotool.finish = function (code) {
	//We don't need to do any finishing as of rn, so we'll just return the code.
	return code;
};

Blockly.Xdotool.scrub_ = function(block, code) {
	
	/* August 7th, 2017
	 Ok this function is super duper screwy but also very important.
	 What this function does:
	 	1. Collects comments from statement and top-level blocks
	 	2. Walks through a stack of statement blocks
	 	3. Adds in the new line after each statement block.
	 As you can tell, number 3 and number 2 are very very important to a working program, so erroneously commenting out this function
	 just because the commenting is annoying would be a terrible idea.
	 
	*/	
	
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment.length > 0) { // So apparently the Google dev's like to comment the line before each and every statement for some reason..... so this is a way to ensure that we actually have a comment to deal with
    	comment = Blockly.utils.wrap(comment, Blockly.Xdotool.COMMENT_WRAP);
    	commentCode += Blockly.Xdotool.prefixLines(comment + '\n', ' # ');
    }
    else {
		commentCode += '\n';    
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Xdotool.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Xdotool.prefixLines(comment = '\n', ' # ');
          }
        }
      }
    }
  }
  
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Xdotool.blockToCode(nextBlock);
  	
  return code + commentCode + nextCode;
};

//This is a custom block to code function in order to correctly prefix Xdotool commands
Blockly.Xdotool.blockToCode = function(block) {
  if (!block) {
    return '';
  }
  if (block.disabled) {
    // Skip past this block if it is disabled.
    return this.blockToCode(block.getNextBlock());
  }

  var func = this[block.type];
  
  var code = func.call(block, block);
  
  if (block.command) { // If the block is an Xdotool command, we need to prefix it with "xdotool"
  	code = "xdotool " + code;
  }
  
  if (goog.isArray(code)) {
    // Value blocks return tuples of code and operator order.
    return [this.scrub_(block, code[0]), code[1]];
  } else if (goog.isString(code)) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    if (this.STATEMENT_PREFIX) {
      code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') +
          code;
    }
    return this.scrub_(block, code);
  } else if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
};