jlab --python-path /etc/username/custom_env/bin/python ../notebooks/test.ipynb
mkdir -p src/manager src/providers src/ai
# Linux/macOS - remove the installation directory
# Use the base environment path from 'mamba info' to find the exact location
rm -rf ~/miniforge3
# or
rm -rf ~/mambaforge
sudo snap install code --classic
# Also remove the package cache if it's in a separate location
# (check the 'package cache' path from 'mamba info')
rm -rf ~/.cache/conda/pkgs  # or your specific cache location
touch src/index.d.ts
touch src/manager/custom_contents.ts
touch src/providers/local.ts
touch src/providers/ipfs.ts
touch src/providers/github.ts
touch src/ai/summarize.ts
web4 --help
web4 login
web4 chat
web4 ai prompt "Hello"
web4 blockchain deploy
web4 node start
web4 update
web4 doctor
web4 config
web4 plugins list
web4 plugins install web4-security
# Snap
sudo snap install web4

# Cargo
cargo install web4

# Homebrew
brew install web4

# npm
npm install -g @web4/cli

# Docker
docker run web4/cli

docker run --rm -i -v "$PWD:$PWD" -w "$PWD" ghcr.io/jqlang/jq:latest '.version' package.json
docker run --rm -i ghcr.io/jqlang/jq:latest < package.json '.version'
git submodule update --init    # if building from git to get oniguruma
autoreconf -i                  # if building from git
./configure --with-oniguruma=builtin
make clean                     # if upgrading from a version previously built from source
make -j8
make check
sudo make install
make LDFLAGS=-all-static
