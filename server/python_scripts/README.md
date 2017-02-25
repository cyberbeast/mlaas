## Overview

The scripts in this directory form the machine learning backbone of this framework.  

**TODO:** complete documentation for the python scripts

## Instructions for Automatic Unit Test Setup

1. Open a self-contained screen with `screen` or `tmux`
2. Open a new window within the screen -  
	* `Ctrl + a + |` for vertical split  
	* `Ctrl + a + S` for horizontal split [note: use uppercase *s* not lowercase]
3. Use `Ctrl+a+Tab` to toggle between windows
4. Run `./watch_file_daemon.sh` in one of the windows to start the file monitoring daemon
5. Toggle to the other window and continue editing relevant files. If a file being monitored is changed and saved, the relevant unit test will be triggered. Happy coding!
