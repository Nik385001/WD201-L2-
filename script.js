let userform = document.getElementById("form");

const retrieveEntries = () => {
    let entries = localStorage.getItem('user-entries');
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    console.log(entries);

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td align="center" style="padding:4px 8px">${entry.name}</td>`;
        const emailCell = `<td align="center" style="padding:4px 8px">${entry.email}</td>`;
        const passwordCell = `<td align="center" style="padding:4px 8px">${entry.password}</td>`;
        const dobCell = `<td align="center" style="padding:4px 8px">${entry.dob}</td>`;
        const termsCell = `<td align="center" style="padding:4px 8px">${entry.terms}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${termsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table border="2" style="margin-top:10px;"><tr>
    <th align="center" style="padding:12px;">Name</th>
    <th align="center" style="padding:12px;">Email</th>
    <th align="center" style="padding:12px;">Password</th>
    <th align="center" style="padding:12px;">Dob</th>
    <th align="center" style="padding:12px;">Accepted terms?</th>
    </tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const saveUserForm = (event) =>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;
    

    const entry = {
        name,
        email,
        password,
        dob,
        terms   
    };
    userEntries.push(entry);
    
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userform.addEventListener('submit', saveUserForm);
displayEntries();

    let dateElement = document.getElementById("dob");
    
dateElement.addEventListener("change",() => {
    let [year,month,date] = document.getElementById("dob").value.split("-");
    let dob = new Date(year,month,date);
    let age = getAge(dob);

    if (age< 18 || age > 55) {
        dateElement.setCustomValidity("Your age doesn't lies between 18 and 55.")
    } else {
        dateElement.setCustomValidity("");
    }
});

function getAge(date) {
    let today = new Date();
    let birthDate = new Date(date);

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m<0 || (m === 0 && birthDate.getDate() < birthDate.getDate()) ) {
        age --;
    }
    return age;
}

