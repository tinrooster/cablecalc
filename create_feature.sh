#!/bin/bash
if [ -z "$1" ]
then
    echo "Please provide a feature name"
    echo "Usage: ./create_feature.sh feature-name"
    exit 1
fi

git checkout development
git checkout -b feature/$1
echo "Created and switched to feature/$1"
