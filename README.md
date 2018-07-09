Xdotool Blocks
=================

Xdotool Blocks is a block based web-application to create Xdotool scripts.  
This project/code/program is not affiliated in any way with Xdotool, Google, Google Blockly, or their respective authors. 
This is simply a free to use program to help make script creation easier, smoother, and quicker.  
__If you want to jump in, go ahead! There is a hosted version [here.](http://tseng.l5.ca/html/XdotoolBlocks/index.html)__  

![Image of a screenshot of Xdotool Blocks environment](https://github.com/ExpandingDev/XdotoolBlocks/blob/master/xdotool.png?raw=true)

Installation
=================
To use Xdotool Blocks, simply place the XdotoolBlocks folder in an HTTP server. (/var/www/html for example)
That's all there is to it! Xdotool Blocks is completely client-side and does not require PHP, MySQL or any other software.  
Simply navigate to the index.html in your HTML5 compliant web browser and program away!



This program uses the Google Blockly library: https://developers.google.com/blockly/  
This program generates code to use with Xdotool: http://www.semicomplete.com/projects/xdotool  

Usage
=================
Drag and drop blocks into the "Program Start" section. Blocks not within the "Program Start" block will be removed upon code generation.  
Once you are satisfied with your script, press the "Generate Code" button to generate the script, the bash script will be written out below the button and workspace.  
  
The "Sync" block and "Clear Modifiers" block are very similar blocks. Any statements/commands put inside of them that supports the "--sync" or "--clearmodifiers" flag  
will have the flag set. See the Xdotool man page/documentation for more details.  

The "In Window" block acts to target the desired window for window-related blocks (resize, move, focus, close, etc).  
If a window-targeting block is used outside of an "In Window" block, the target window will default to "%1" (as per the Xdotool docs).  
  
Many questions or confusion can be cleared up by looking at the Xdotool man page or documentation.  
