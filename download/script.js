async function getLatestRelease() {
    const response = await fetch(
        "https://api.github.com/repos/fullstackedorg/editor/releases/latest"
    );
    const { tag_name } = await response.json();
    return tag_name;
}

async function getMainVersion() {
    // const response = await fetch(
    //     "https://raw.githubusercontent.com/fullstackedorg/editor/refs/heads/main/package.json"
    // );
    // const { version } = await response.json();
    // return version;
    return "0.10.0"
}

async function getLatestCommit() {
    const response = await fetch("https://api.github.com/repos/fullstackedorg/editor/git/refs/heads/main");
    const { object: { sha } } = await response.json();
    return sha;
}

const downloadBaseURL = "https://files.fullstacked.org/releases";
getLatestRelease().then((version) => {
    document.querySelector("#stable-version").innerText = version;

    document.querySelector("#darwin-arm64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-darwin-arm64.zip`;

    document.querySelector("#darwin-x64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-darwin-x64.zip`;

    document.querySelector("#win32-arm64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-win32-arm64.zip`;

    document.querySelector("#win32-x64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-win32-x64.zip`;

    document.querySelector("#linux-arm64-deb").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-arm64.deb`;

    document.querySelector("#linux-x64-deb").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-x64.deb`;

    document.querySelector("#linux-arm64-rpm").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-arm64.rpm`;

    document.querySelector("#linux-x64-rpm").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-x64.rpm`;
});

Promise.all([
    getMainVersion(),
    getLatestCommit()
]).then(([
    version,
    commit
]) => {
    // const ref = commit.slice(0, 8);
    document.querySelector("#beta-version").innerHTML = version 
        // + `<br /><small>${ref} (main)</small>`;

    document.querySelector("#beta-darwin-arm64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-darwin-arm64.zip?v=${ref}`;

    document.querySelector("#beta-darwin-x64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-darwin-x64.zip?v=${ref}`;

    document.querySelector("#beta-win32-arm64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-win32-arm64.zip?v=${ref}`;

    document.querySelector("#beta-win32-x64").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-win32-x64.zip?v=${ref}`;

    document.querySelector("#beta-linux-arm64-deb").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-arm64.deb?v=${ref}`;

    document.querySelector("#beta-linux-x64-deb").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-x64.deb?v=${ref}`;

    document.querySelector("#beta-linux-arm64-rpm").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-arm64.rpm?v=${ref}`;

    document.querySelector("#beta-linux-x64-rpm").href =
        downloadBaseURL +
        "/" +
        version +
        `/fullstacked-${version}-linux-x64.rpm?v=${ref}`;
})
