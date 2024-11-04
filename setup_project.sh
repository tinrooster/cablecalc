#!/bin/bash
# setup_project.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Cable Calculator project...${NC}"

# Create .gitignore
echo -e "${GREEN}Creating .gitignore...${NC}"
cat > .gitignore << EOL
# Python
__pycache__/
*.py[cod]
*$py.class
venv/
.env
.venv
env/
ENV/

# Node
node_modules/
.next/
out/
build/
.DS_Store
*.pem
.env*.local
.vercel

# IDE
.vscode/
.idea/
*.swp
*.swo

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local development
.env.local
.env.development.local
.env.test.local
.env.production.local
EOL

# Function to commit feature
commit_feature() {
    local files=("$@")
    local type="${files[-3]}"      # e.g., feat, fix, docs
    local scope="${files[-2]}"     # e.g., ui, api, core
    local description="${files[-1]}"
    
    # Remove the last 3 arguments from files array
    unset 'files[-1]'
    unset 'files[-2]'
    unset 'files[-3]'

    local message="${type}(${scope}): ${description}"
    echo -e "${GREEN}Committing: ${message}${NC}"
    git add "${files[@]}"
    git commit -m "$message"
}

# Create development branch
echo -e "${BLUE}Setting up branches...${NC}"
git checkout -b development

# Commit features
echo -e "${BLUE}Committing features...${NC}"

# Core UI
commit_feature \
    "components/calculator/elements/RackGrid.tsx" \
    "components/calculator/elements/RackPosition.tsx" \
    "components/calculator/elements/RackLayout.tsx" \
    "feat(ui): core rack layout components"

# Path Visualization
commit_feature \
    "components/calculator/elements/PathOverlay.tsx" \
    "components/calculator/elements/RouteToggle.tsx" \
    "feat(ui): path visualization and route selection"

# Settings
commit_feature \
    "components/calculator/elements/SettingsPanel.tsx" \
    "hooks/useCableCalculator.ts" \
    "feat(settings): cable calculation settings and hooks"

# API Integration
commit_feature \
    "lib/api/" \
    "components/calculator/elements/APITest.tsx" \
    "feat(api): cable calculation backend integration"

# Styles
commit_feature \
    "app/globals.css" \
    "app/layout.tsx" \
    "app/page.tsx" \
    "feat(styles): global styles and layout updates"

# Set up branch protection
echo -e "${BLUE}Setting up branch protection...${NC}"

# Create branch protection script
cat > branch_protection.sh << EOL
#!/bin/bash

# Protected branches
PROTECTED_BRANCHES=("main" "development")

# Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

branch=\$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [[ " \${PROTECTED_BRANCHES[@]} " =~ " \$branch " ]]; then
    echo "Direct commits to \$branch branch are not allowed"
    exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

# Pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

protected_branch='main'
current_branch=\$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ \$protected_branch = \$current_branch ]
then
    read -p "You're about to push main, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo \$REPLY | grep -E '^[Yy]\$' > /dev/null
    then
        exit 0 # push will execute
    fi
    exit 1 # push will not execute
else
    exit 0 # push will execute
fi
EOF

chmod +x .git/hooks/pre-push
EOL

chmod +x branch_protection.sh
./branch_protection.sh

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${BLUE}Branch protection rules:${NC}"
echo "- No direct commits to main or development branches"
echo "- Push to main requires confirmation"
echo "- Use feature branches for development"

# Create feature branch template
echo -e "${BLUE}Creating feature branch template...${NC}"
cat > create_feature.sh << EOL
#!/bin/bash
if [ -z "\$1" ]
then
    echo "Please provide a feature name"
    echo "Usage: ./create_feature.sh feature-name"
    exit 1
fi

git checkout development
git checkout -b feature/\$1
echo "Created and switched to feature/\$1"
EOL

chmod +x create_feature.sh

echo -e "${GREEN}All done! Use ./create_feature.sh to create new feature branches${NC}"