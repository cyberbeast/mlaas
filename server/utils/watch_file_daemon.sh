#!/bin/bash

sha=0
previous_sha=0
file_list=`echo ./python_scripts/model_containers/svm_container.py`
cmd="env PYTHONPATH=python_scripts python python_scripts/unit_tests/test_svm_container.py"

update_sha(){
    sha=`cat $file_list | sha1sum`
}

build(){
    echo -e "\nMonitor: Building.."
    $cmd
    echo -e "\nMonitor: watching files.."
    
}

changed(){
    echo -e "\nMonitor: Files Changed.."
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
