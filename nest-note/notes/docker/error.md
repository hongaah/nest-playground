## windows 虚拟机内安装 docker 报错

deploying WSL2 distributions

ensuring main distro is deployed: deploying "docker-desktop": importing WSL distro "当前计算机配置不支持 WSL2。\r\n请启用“虚拟机平台”可选组件，并确保在 BIOS 中启用虚拟化。\r\n通过运行以下命令启用“虚拟机平台”: wsl.exe --install --no-distribution\r\n有关信息，请访问 https://aka.ms/enablevirtualization\r\nError code: Wsl/Service/RegisterDistro/CreateVm/HCS/HCS_E_HYPERV_NOT_INSTALLED\r\n" output="docker-desktop": exit code: 4294967295: running WSL command wsl.exe C:\WINDOWS\System32\wsl.exe --import docker-desktop <HOME>\AppData\Local\Docker\wsl\main C:\Program Files\Docker\Docker\resources\wsl\wsl-bootstrap.tar --version 2: 当前计算机配置不支持 WSL2。

请启用“虚拟机平台”可选组件，并确保在 BIOS 中启用虚拟化。
通过运行以下命令启用“虚拟机平台”: wsl.exe --install --no-distribution
有关信息，请访问 https://aka.ms/enablevirtualization
Error code: Wsl/Service/RegisterDistro/CreateVm/HCS/HCS_E_HYPERV_NOT_INSTALLED
: exit status 0xffffffff
checking if isocache exists: CreateFile \\wsl$\docker-desktop-data\isocache\: The network name cannot be found.

---

## docker build -t nest-note . 报错

node:20-alpine3.20: failed to resolve source metadata for docker.io/library/node:20-alpine3.20: failed to do request: Head "https://registry-1.docker.io/v2/library/node/manifests/20-alpine3.20": dialing registry-1.docker.io:443 container via direct connection because has no HTTPS proxy: connecting to 108.160.165.211:443: dial tcp 108.160.165.211:443: connect: operation timed out

FIX:
docker pull node:20-alpine3.20

## ERROR: failed to solve: cannot replace to directory /var/lib/docker/overlay2/t2ttk4jrzjs54hi7idzvfyve0/merged/app/node_modules/@apollo/server with file

FIX:
清理 Docker 缓存：首先，清理 Docker 缓存，以确保没有旧的缓存文件干扰构建过程。
docker builder prune
