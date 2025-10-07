
let siteNameInput = document.getElementById('bookmarkName');
let siteUrlInput = document.getElementById('bookmarkURL');
let submitBtn = document.getElementById('submitBtn');
let tableBody = document.getElementById('tableBody');

let validationModalElement = document.getElementById('validationModal');
let validationModal = new bootstrap.Modal(validationModalElement);

let bookmarkList; 

if (localStorage.getItem('bookmarks')) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks(); 
} else {
    bookmarkList = [];
}

submitBtn.addEventListener('click', function() {
    if (validateInputs()) {
       
        let bookmark = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };
        bookmarkList.push(bookmark);
        
     
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
        
        displayBookmarks();
        clearInputs();
        
      
        siteNameInput.classList.remove('is-invalid');
        siteUrlInput.classList.remove('is-invalid');

    }
});


function validateName(name) {
    return name.length >= 3;
}

function validateURL(url) {
    const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlRegex.test(url);
}

function validateInputs() {
    let isNameValid = validateName(siteNameInput.value);
    let isUrlValid = validateURL(siteUrlInput.value);

    if (isNameValid && isUrlValid) {
        return true; 
    } else {
        validationModal.show(); 

        if (!isNameValid) {
             siteNameInput.classList.add('is-invalid');
        } else {
             siteNameInput.classList.remove('is-invalid');
        }

        if (!isUrlValid) {
            siteUrlInput.classList.add('is-invalid');
        } else {
            siteUrlInput.classList.remove('is-invalid');
        }
        
        return false;
    }
}

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

function deleteBookmark(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    displayBookmarks();
}

function visitWebsite(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    window.open(url, '_blank');
}

function clearInputs() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}