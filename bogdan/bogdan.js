document.addEventListener("DOMContentLoaded", () => {
    loadCompanyName();
    loadSavedLinks();
    document.getElementById("addNewLinkButton").addEventListener("click", addNewLink);
});

// === COMPANY NAME ===
function handleHeadingEdit() {
    const heading = document.getElementById("CompanyName");
    const input = document.createElement("input");
    input.type = "text";
    input.value = heading.textContent;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";

    heading.replaceWith(input);
    input.insertAdjacentElement("afterend", saveButton);

    saveButton.addEventListener("click", () => {
        const updated = input.value.trim();
        if (updated) {
            localStorage.setItem("companyName", updated);
            const newHeading = document.createElement("h1");
            newHeading.id = "CompanyName";
            newHeading.textContent = updated;
            input.replaceWith(newHeading);
            saveButton.remove();
        }
    });
}

function loadCompanyName() {
    const saved = localStorage.getItem("companyName");
    if (saved) {
        document.getElementById("CompanyName").textContent = saved;
    }
}

// === LOAD SAVED LINKS ===
function loadSavedLinks() {
    const savedLinks = JSON.parse(localStorage.getItem("customLinks")) || [];

    const container = document.querySelector(".columns");
    container.querySelectorAll(".link-container").forEach(el => el.remove());

    savedLinks.forEach(link => {
        renderLink(link.text, link.href, link.id);
    });
}

// === SAVE TO LOCAL STORAGE ===
function saveLinkToStorage(text, href, id) {
    const links = JSON.parse(localStorage.getItem("customLinks")) || [];
    links.push({ text, href, id });
    localStorage.setItem("customLinks", JSON.stringify(links));
}

function updateLinkInStorage(id, newText, newHref) {
    let links = JSON.parse(localStorage.getItem("customLinks")) || [];
    links = links.map(link => link.id === id ? { ...link, text: newText, href: newHref } : link);
    localStorage.setItem("customLinks", JSON.stringify(links));
}

// === ADD NEW LINK ===
function addNewLink() {
    if (document.querySelector(".new-link-container")) return;

    const container = document.createElement("div");
    container.className = "new-link-container";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter URL or Text";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";

    container.append(input, saveBtn, cancelBtn);
    document.querySelector(".columns").appendChild(container);

    saveBtn.addEventListener("click", () => {
        const value = input.value.trim();
        if (!value) return alert("Enter a valid link");

        const id = "link-" + Date.now();
        renderLink(value, value, id);
        saveLinkToStorage(value, value, id);

        container.remove();
    });

    cancelBtn.addEventListener("click", () => container.remove());
}

// === RENDER A LINK ===
function renderLink(text, href, id) {
    const container = document.createElement("div");
    container.className = "link-container";

    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    a.setAttribute("data-id", id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editLink(a, editBtn);

    container.append(a, editBtn);
    document.querySelector(".columns").appendChild(container);
}

// === EDIT LINK ===
function editLink(linkEl, buttonEl) {
    const oldText = linkEl.textContent;
    const id = linkEl.getAttribute("data-id");

    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    const parent = linkEl.parentElement;
    parent.replaceChild(input, linkEl);
    parent.replaceChild(saveBtn, buttonEl);

    saveBtn.addEventListener("click", () => {
        const newText = input.value.trim();
        if (!newText) return;

        const newLink = document.createElement("a");
        newLink.href = newText;
        newLink.textContent = newText;
        newLink.setAttribute("data-id", id);

        const newEditBtn = document.createElement("button");
        newEditBtn.textContent = "Edit";
        newEditBtn.onclick = () => editLink(newLink, newEditBtn);

        parent.replaceChild(newLink, input);
        parent.replaceChild(newEditBtn, saveBtn);

        updateLinkInStorage(id, newText, newText);
    });
}
