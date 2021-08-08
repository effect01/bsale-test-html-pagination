const ulPagination = document.querySelector(
	"#products-filter-container ul.pagination"
);
const query = window.location.search;

const getTotalProduct = async () => {
	const url = `${API_URL}/api/products/count${query}`;
	return (await fetchData(url)).data.count;
};
// ceil expected example 40.2 => 41
const parseIntThenDivide10 = (value) => Math.ceil(parseInt(value) / 10);

const paginationConfig = async () => {
	// VARS
	const numbers = [];
	const paginationsLargeBothSize = 1; //  large left + 1 + large right
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search).entries()
	); // get all params as object
	const totalProducts = parseIntThenDivide10(await getTotalProduct()); // every next 10 products is a 1 page if  we have 51 products then we count 6 pages
	const currentlyPage = parseIntThenDivide10(params._start) + 1;
    let paginationNumber = currentlyPage;
	// we checked if in the next numbers  have the last page if is true, then subtract the difference to stay in a constant numbers
	const dif = paginationNumber + paginationsLargeBothSize - totalProducts;
	if (dif > 0) paginationNumber -= dif;

	console.log(paginationNumber, dif);
	// set how many numbers we want to show in the pagination at left
	paginationNumber -= paginationsLargeBothSize;
	// the next loop add the number an array paginations, increse it by 1
	for (let index = 1; index < 3 + paginationsLargeBothSize; paginationNumber++) {
		// if the  paginations are negative then ignore it  and increse the number
		if (paginationNumber <= 0) {
			continue;
		}
		numbers.push(paginationNumber);
		index++;
	}
	return {
		numbers: numbers,
		IsLastButtonNecessary: numbers.slice(-1).pop() != totalProducts + 1,
		IsFirstButtonNecessary: numbers.slice(0, 1).pop() !== 1,
        currentPage: currentlyPage,
        LastPagination: totalProducts-1
	};
};

const addPaginationLink = (number,isCurrentPage ) => {
	const li = document.createElement("li");
	li.className = `page-item ${isCurrentPage ? 'active':null}`;
	const a = document.createElement("a");
	a.className = "page-link";
	a.innerHTML = number;
	a.setAttribute("href", `/productos?_start=${number-1}0&_limit=10`);
	li.appendChild(a);
	ulPagination.appendChild(li);
};

const initPagination = async () => {
	try {
		const paginationSetting = await paginationConfig();
		if (paginationSetting.IsFirstButtonNecessary)
			ulPagination.innerHTML += `<li class="page-item"><a class="page-link" href="/productos?_start=0&_limit=10">Inicio</a></li>`;
		// add  paginations links
            paginationSetting.numbers.forEach(async (number) => {
			 addPaginationLink(number, number === paginationSetting.currentPage );
		});
		if (paginationSetting.IsLastButtonNecessary)
			ulPagination.innerHTML += ` <li class="page-item"><a class="page-link" href="/productos?_start=${paginationSetting.LastPagination}0&_limit=10"">Final</a></li>`;

	} catch {
		console.error("ERROR TRYING TO ADDING PAGINATION");
	}
};


initPagination();
