//

const dropdownElement = document.querySelector("#searcher .dropdown .dropdown-menu");
const URL = "http://localhost:2424";

const paintSurggerences = ({ data }) => {
    dropdownElement.className = 'dropdown-menu w-100'
    dropdownElement.innerHTML = "";
    // if we have data then show the dropdown element and then add the items
    if (data.length > 0) {
        dropdownElement.className = 'dropdown-menu show w-100'
	data.forEach((e) => {
		dropdownElement.innerHTML += `<li>
        <a class="dropdown-item" href="/producto/${e.id}">${e.name}</a>
        </li>
            `;

	});
}
};
// listen the searcher input :D
document
	.querySelector('[type="search"]')
	.addEventListener("input", async function (e) {
        console.log(e.target.value, e.target.value.length );
        // searcher need at least 2 characters to search  ( we dont use "if" because axios load anyway with new params if the user delete manualiy the prev input when axios is loading )
		// load suggerences
		const {data,status} = await axios
			.get(`${URL}/api/products?_where={"name":"${e.target.value.length > 2 ? e.target.value:null}"}&_start=0&_limit=15`)
			.catch((error) => {
				console.log(error.message);
			});
		// is the response a success?
		if (status !== 200)
			console.error("searcher have unexpected status ");
		if (status == 200)
            paintSurggerences(data);
	});
