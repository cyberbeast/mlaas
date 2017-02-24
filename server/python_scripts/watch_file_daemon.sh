#!/bin/bash

sha=0
previous_sha=0
file_list=`echo ./model_containers/svm_container.py`
cmd="PYTHON_PATH=. python unit_tests/test_svm_container.py"
update_sha(){
    sha=`cat $file_list | sha1sum`
}

build(){
    x=`echo $cmd`
    
}

changed(){
    echo -e "\nMonitor: Files Changed, Building.."
    build
    previous_sha=$sha
}

compare(){
    update_sha
    if [[ $sha != $previous_sha ]]; then changed; fi
}

run(){
    update_sha
    previous_sha=$sha
    while true; do
        
        compare

    done
}

echo "Initializing Monitor.."
echo -e "\nMonitor: watching files.."
echo $file_list
run
