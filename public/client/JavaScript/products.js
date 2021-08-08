const productContainer = document.getElementById("products-grid-container");
const offerHtml = (offer, price) => `  <div>  
                        <strike> <span class="price-old">${new Intl.NumberFormat(
													"CLP",
													{
														style: "currency",
														currency: "CLP",
													}
												).format(price * (1 - offer / 100))} </span></strike>
                            <div class="product-percentage">
                                <span>-${offer}%</span>
                            </div>
                    </div>
`;

const paintProducts = ({ data }) => {
	productContainer.innerHTML = "";
	// if we have data then show the dropdown element and then add the items
	if (data.length > 0) {
		data.forEach((product) => {
			productContainer.innerHTML += `
            <div class="card">   
                <img src="${
                    product.url_image  && product.url_image ? product.url_image:
									"https://image.freepik.com/free-vector/store-shelves-with-milk-dairy-products-illustration_1284-52079.jpg"
								}" alt="" />
            
                <div class="card-body">
                    <div class="info-product">
                        <div class="info-product-title">
                            <span>
                                <a href="/producto/${product.id}">${
				product.name
			}</a>
                            </span>
                        </div>
                <div class="info-product-price">
                    <!-- actual price and old price -->
                      <div>
                        <span class="product-price">
                            ${new Intl.NumberFormat("CLP", {
															style: "currency",
															currency: "CLP",
														}).format(product.price)}
                        </span>
                      </div>
                        ${
													product.discount > 0
														? offerHtml(product.discount, product.price)
														: "<div></div>"
												}
                    </span>
                </div>
                <div>
                    <div class="button-product">
                        <button class="btn  btn-main btn-block">
                            <span> Comprar </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
		});
		return;
	}
	productContainer.innerHTML = "No se han encontrado productos :(";
};

const fetchProducts = async () => {
	const query = window.location.search;
	const url = `${API_URL}/api/products${query}`;
	return await fetchData(url);
};
const fetchProductsThenPaintIt = async () => {
	const data = await fetchProducts();
	const imgs = Array.from(document.querySelectorAll("img"));
	imgs.forEach((i) => {
		if (i.naturalHeight == 0) console.log("Falló la carga de");
	});
	paintProducts(data);
};

fetchProductsThenPaintIt();
