const { execSync } = require("child_process");
const { existsSync } = require("fs");

const run = (cmd) => {
  console.log(`👉 ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

const userName = "METABYTECODE";
const userEmail = "tblazesteam@gmail.com";
const repoName = "asunext";

function repoExists() {
  try {
    execSync(`gh repo view ${repoName}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (!existsSync(".git")) {
  run("git init");
}
run(`git config user.name "${userName}"`);
run(`git config user.email "${userEmail}"`);
run("git add -A");

const status = execSync("git status --porcelain").toString().trim();
if (status !== "") {
  run(`git commit -m "Auto commit"`);
} else {
  console.log("⚠️ Нечего коммитить");
}

if (repoExists()) {
  run("git branch -M main");
  run("git push -u origin main");
} else {
  // 🧼 Удаляем origin если уже есть
  try {
    execSync("git remote remove origin");
  } catch {}

  run(`gh repo create ${repoName} --source=. --public --push`);
}
