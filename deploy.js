const dateTime = require("moment")().format('MM/DD/YYYY HH:mm:ss');

const commands = [
    "rmdir /s /q dist",
    "npm run build",
    "cd dist",
    "git init",
    "git add .",
    `git commit -m "Deploy: \`${dateTime}\`"`,
    "git remote add origin https://github.com/6ixfalls/6ixfalls.github.io.git",
    "git push --force origin master:gh-pages"
];

require('child_process').execSync(commands.join(' && '), { stdio: [0, 1, 2] });