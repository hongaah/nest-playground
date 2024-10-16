const { exec } = require('child_process');

const childProcess = exec('powershell Get-Content -Path ./log -Wait -Tail 10');

childProcess.stdout.on('data', (msg) => {
  console.log(msg);
});
