// ==== Elements ====
let siteNameInput = document.getElementById('bookmarkName');
let siteUrlInput = document.getElementById('bookmarkURL');
let submitBtn = document.getElementById('submitBtn');
let tableBody = document.getElementById('tableBody');

// ==== Modal ====
let validationModalElement = document.getElementById('validationModal');
let validationModal = new bootstrap.Modal(validationModalElement);

// ==== Bookmarks List ====
let bookmarkList; 
if (localStorage.getItem('bookmarks')) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks(); 
} else {
    bookmarkList = [];
}

// ==== Event Listener ====
submitBtn.addEventListener('click', function() {
    if (validateInputs()) {
        let bookmark = {
            name: siteNameInput.value.trim(),
            url: siteUrlInput.value.trim()
        };
        bookmarkList.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
        displayBookmarks();
        clearInputs();
        siteNameInput.classList.remove('is-invalid');
        siteUrlInput.classList.remove('is-invalid');
    }
});

// ==== Validation Functions ====
function validateName(name) {
    return name.trim().length >= 3; // مش فاضي وكمان ≥ 3 حروف
}

function validateURL(url) {
    if (url.trim() === '') return false; // مش فاضي
    const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlRegex.test(url.trim());
}

function validateInputs() {
    let name = siteNameInput.value;
    let url = siteUrlInput.value;

    let isNameValid = validateName(name);
    let isUrlValid = validateURL(url);

    if (isNameValid && isUrlValid) {
        return true; 
    } else {
        // Show modal
        validationModal.show(); 

        // Highlight invalid inputs
        siteNameInput.classList.toggle('is-invalid', !isNameValid);
        siteUrlInput.classList.toggle('is-invalid', !isUrlValid);
        
        return false;
    }
}

// ==== Display Function ====
function displayBookmarks() {
    let cartona = '';
    for (let i = 0; i < bookmarkList.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarkList[i].name}</td>
                <td>
                    <button class="btn btn-visit" onclick="visitWebsite('${bookmarkList[i].url}')">
                        <i class="fa-solid fa-eye pe-2"></i> Visit
                    </button>
                </td>
                <td>
                    <button class="btn btn-delete" onclick="deleteBookmark(${i})">
                        <i class="fa-solid fa-trash-can pe-2"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }
    tableBody.innerHTML = cartona;
}

// ==== Delete Function ====
function deleteBookmark(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    displayBookmarks();
}

// ==== Visit Function ====
function visitWebsite(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    window.open(url, '_blank');
}

// ==== Clear Inputs ====
function clearInputs() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}
