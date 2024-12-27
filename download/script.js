async function getLatestRelease() {
    const response = await fetch(
        "https://api.github.com/repos/fullstackedorg/editor/releases/latest"
    );
    const { tag_name } = await response.json();
    return tag_name;
}

async function getMainVersion() {
    const response = await fetch(
        "https://raw.githubusercontent.com/fullstackedorg/editor/refs/heads/main/package.json"
    );
    const { version } = await response.json();
    return version;
}

async function getLatestCommit() {
    const response = await fetch("https://api.github.com/repos/fullstackedorg/editor/git/refs/heads/main");
    const { object: { sha } } = await response.json();
    return sha;
}

const downloadBaseURL = "https://files.fullstacked.org/releases";
getLatestRelease().then((version) => {
    document.querySelector("#stable-version").innerText = version;
});

Promise.all([
    getMainVersion(),
    getLatestCommit()
]).then(([
    version,
    commit
]) => {
    // const ref = commit.slice(0, 8);
    // document.querySelector("#beta-version").innerHTML = version 
    //     + `<br /><small>${ref} (main)</small>`;
})
