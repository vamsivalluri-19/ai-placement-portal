let companies = JSON.parse(localStorage.getItem("companies")) || [];

function renderCompanies() {
  companyList.innerHTML = companies.map((c,i)=>`
    <li>${c.name} - ${c.role} - ${c.ctc}
    <button onclick="removeCompany(${i})">❌</button></li>
  `).join("");
  companyCount.innerText = companies.length;
}

function addCompany() {
  companies.push({
    name: companyName.value,
    role: companyRole.value,
    ctc: companyCTC.value
  });
  localStorage.setItem("companies", JSON.stringify(companies));
  renderCompanies();
}

function removeCompany(i) {
  companies.splice(i,1);
  localStorage.setItem("companies", JSON.stringify(companies));
  renderCompanies();
}

renderCompanies();
