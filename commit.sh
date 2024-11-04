#!/bin/bash
# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

commit_feature() {
    local args=("$@")
    
    # Check if we have at least 3 arguments (type, scope, description)
    if [ ${#args[@]} -lt 3 ]; then
        echo "Usage: ./commit.sh <type> <scope> <description>"
        echo "Example: ./commit.sh feat ui 'add new button component'"
        exit 1
    fi

    local type="${args[-3]}"
    local scope="${args[-2]}"
    local description="${args[-1]}"
    
    local message="${type}(${scope}): ${description}"
    echo -e "${GREEN}Committing: ${message}${NC}"
    git add .
    git commit -m "$message"
}

commit_feature "$@"