document.addEventListener("DOMContentLoaded", () => {
    loadSavedLinks();
    document.getElementById("addNewLinkButton").addEventListener("click", addNewLink);
});

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

// Function to handle editing of the link element
function editLink(button) {
    // Get the <a> element that the button is next to
    let link = button.previousElementSibling;

    // Create an input field and pre-fill it with the link's text
    let inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = link.textContent;

    // Replace the link with the input field
    link.replaceWith(inputField);

    // Add a save button next to the input field
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    inputField.insertAdjacentElement('afterend', saveButton);

    // Handle saving the new link text to localStorage
    saveButton.addEventListener('click', function () {
        let newLinkText = inputField.value;

        // Use a unique identifier for the link element (could be index or data attribute)
        let linkId = link.getAttribute('data-id') || 'link-' + Math.random().toString(36).substr(2, 9); // generate a random ID

        // Save the new link text to localStorage
        localStorage.setItem(linkId, newLinkText);

        // Replace the input field with the updated link text
        let updatedLink = document.createElement('a');
        updatedLink.href = link.href; // Keep the same href
        updatedLink.textContent = newLinkText;
        updatedLink.setAttribute('data-id', linkId); // Preserve the unique ID

        // Replace the input field with the updated <a> element
        inputField.replaceWith(updatedLink);

        // Remove the save button
        saveButton.remove();
    });
}

// Function to handle editing of the company name (h1)
function handleHeadingEdit() {
    let companyName = document.getElementById('CompanyName');
    let inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = companyName.textContent;

    // Replace the h1 with the input field
    companyName.replaceWith(inputField);

    // Create a save button
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    inputField.insertAdjacentElement('afterend', saveButton);

    // Add event listener to save button
    saveButton.addEventListener('click', function () {
        let newCompanyName = inputField.value;
        localStorage.setItem('companyName', newCompanyName);

        // Replace the input field with the updated h1
        let updatedCompanyName = document.createElement('h1');
        updatedCompanyName.textContent = newCompanyName;
        updatedCompanyName.id = 'CompanyName'; // Re-add the ID to the h1

        inputField.replaceWith(updatedCompanyName);

        // Remove the save button
        saveButton.remove();
    });
}

// Function to handle editing of the paragraph text
function handleParagraphEdit() {
    let paragraph = document.querySelector('.info-container p');
    let inputField = document.createElement('textarea');
    inputField.value = paragraph.textContent;

    // Replace the paragraph with the textarea
    paragraph.replaceWith(inputField);

    // Create a save button
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    inputField.insertAdjacentElement('afterend', saveButton);

    // Add event listener to save button
    saveButton.addEventListener('click', function () {
        let newParagraphText = inputField.value;
        localStorage.setItem('paragraphText', newParagraphText);

        // Replace the textarea with the updated paragraph
        let updatedParagraph = document.createElement('p');
        updatedParagraph.textContent = newParagraphText;

        inputField.replaceWith(updatedParagraph);

        // Remove the save button
        saveButton.remove();
    });
}

// Load saved data from localStorage when the page loads
window.addEventListener('load', function () {
    let links = document.querySelectorAll('.container-wide-noborder a');

    links.forEach(function (link, index) {
        // Use the index or generate a unique ID for each link
        let linkId = 'link-' + index;
        link.setAttribute('data-id', linkId);

        // Try to load the saved text from localStorage
        let savedText = localStorage.getItem(linkId);
        if (savedText) {
            link.textContent = savedText;
        }
    });

    // Load saved company name
    let savedCompanyName = localStorage.getItem('companyName');
    if (savedCompanyName) {
        let companyNameElement = document.getElementById('CompanyName');
        companyNameElement.textContent = savedCompanyName;
    }

    // Load saved paragraph text
    let savedParagraphText = localStorage.getItem('paragraphText');
    if (savedParagraphText) {
        let paragraphElement = document.querySelector('.info-container p');
        paragraphElement.textContent = savedParagraphText;
    }
});
