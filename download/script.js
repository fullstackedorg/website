async function getLatestRelease() {
    const response = await fetch(
        "https://api.github.com/repos/fullstackedorg/fullstacked/releases/latest",
    );
    const { tag_name } = await response.json();
    return tag_name;
}

async function getMainVersion() {
    const response = await fetch(
        "https://raw.githubusercontent.com/fullstackedorg/fullstacked/refs/heads/main/package.json",
    );
    const { version } = await response.json();
    return version;
}

async function getLatestCommit() {
    const response = await fetch(
        "https://api.github.com/repos/fullstackedorg/fullstacked/git/refs/heads/main",
    );
    const {
        object: { sha },
    } = await response.json();
    return sha;
}

const downloadBaseURL = "https://files.fullstacked.org/releases";
getLatestRelease().then((version) => {
    document.querySelector("#stable-version").innerText = version;
});

Promise.all([getMainVersion(), getLatestCommit()]).then(([version, commit]) => {
    const ref = commit.slice(0, 8);
    document.querySelector("#beta-version").innerHTML =
        version + `<br /><small>${ref} (main)</small>`;
});

const r2BaseUrl = "https://files.fullstacked.org/linux-builds";

fetch(`${r2BaseUrl}/x64/beta.txt`)
    .then((res) => res.json())
    .then(({ major, minor, patch, build }) => {
        const dlUrl = `/x64/fullstacked-${major}.${minor}.${patch}-${build}-linux-x64`;
        document.querySelector("#linux-x64-gtk-beta").href = `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-x64-qt-beta").href = `${dlUrl}-qt.deb`;
    });
fetch(`${r2BaseUrl}/arm64/beta.txt`)
    .then((res) => res.json())
    .then(({ major, minor, patch, build }) => {
        const dlUrl = `/arm64/fullstacked-${major}.${minor}.${patch}-${build}-linux-arm64`;
        document.querySelector("#linux-arm64-gtk-beta").href =
            `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-arm64-qt-beta").href = `${dlUrl}-qt.deb`;
    });
