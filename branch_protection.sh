#!/bin/bash

# Protected branches
PROTECTED_BRANCHES=("main" "development")

# Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [[ " ${PROTECTED_BRANCHES[@]} " =~ " $branch " ]]; then
    echo "Direct commits to $branch branch are not allowed"
    exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

# Pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]
then
    read -p "You're about to push main, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo $REPLY | grep -E '^[Yy]$' > /dev/null
    then
        exit 0 # push will execute
    fi
    exit 1 # push will not execute
else
    exit 0 # push will execute
fi
EOF

chmod +x .git/hooks/pre-push
