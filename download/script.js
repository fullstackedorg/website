async function getLatestRelease() {
    const response = await fetch(
        "https://api.github.com/repos/fullstackedorg/fullstacked/releases/latest",
        { cache: "no-store" },
    );
    const { tag_name } = await response.json();
    return tag_name;
}

const downloadBaseURL = "https://files.fullstacked.org/releases";
getLatestRelease().then((version) => {
    document.querySelector("#stable-version").innerText = version;
});

const r2BaseUrl = "https://files.fullstacked.org/linux-builds";

fetch(`${r2BaseUrl}/x64/beta.txt`, { cache: "no-store" })
    .then((res) => res.json())
    .then(({ major, minor, patch, build, hash, branch }) => {
        const versionStr = `${major}.${minor}.${patch}`;
        const dlUrl = `${r2BaseUrl}/x64/${versionStr}/fullstacked-${versionStr}-${build}-linux-x64`;
        document.querySelector("#linux-x64-gtk-beta").href = `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-x64-qt-beta").href = `${dlUrl}-qt.deb`;

        document.querySelector("#beta-version").innerHTML =
            `${major}.${minor}.${patch} (${build})<br /><small>${hash.slice(0, 8)} (${branch})</small>`;
    });
fetch(`${r2BaseUrl}/arm64/beta.txt`, { cache: "no-store" })
    .then((res) => res.json())
    .then(({ major, minor, patch, build }) => {
        const versionStr = `${major}.${minor}.${patch}`;
        const dlUrl = `${r2BaseUrl}/arm64/${versionStr}/fullstacked-${versionStr}-${build}-linux-arm64`;
        document.querySelector("#linux-arm64-gtk-beta").href =
            `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-arm64-qt-beta").href = `${dlUrl}-qt.deb`;
    });

fetch(`${r2BaseUrl}/x64/release.txt`, { cache: "no-store" })
    .then((res) => res.json())
    .then(({ major, minor, patch, build }) => {
        const versionStr = `${major}.${minor}.${patch}`;
        const dlUrl = `${r2BaseUrl}/x64/${versionStr}/fullstacked-${versionStr}-${build}-linux-x64`;
        document.querySelector("#linux-x64-gtk").href = `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-x64-qt").href = `${dlUrl}-qt.deb`;
    });
fetch(`${r2BaseUrl}/arm64/release.txt`, { cache: "no-store" })
    .then((res) => res.json())
    .then(({ major, minor, patch, build }) => {
        const versionStr = `${major}.${minor}.${patch}`;
        const dlUrl = `${r2BaseUrl}/arm64/${versionStr}/fullstacked-${versionStr}-${build}-linux-arm64`;
        document.querySelector("#linux-arm64-gtk").href = `${dlUrl}-gtk.deb`;
        document.querySelector("#linux-arm64-qt").href = `${dlUrl}-qt.deb`;
    });
