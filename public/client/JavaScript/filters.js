// load categories
const categories_api = API_URL + '/api/categories'
// Elements
const categories_selector = document.getElementById('categories');
const orderby_selector = document.getElementById('orderby');
const searcher_input = document.getElementById('filter-sercher');
const submit_button = document.getElementById('submit-button');

const loadCategories = async () => {
    const categoriesArray = await axios.get(categories_api);
    categoriesArray.data.data.forEach(category => {
        const category_id = category.id;
        const category_name = (category.name ).toUpperCase();
        categories_selector.innerHTML += `<option key=${category_id} value="${category_id}">${category_name}</option>`;
    })
}
const filter = async () => {
    submit_button.addEventListener('click', async () => {
    // values of Elements
    const categorieSelectedValue = categories_selector.options[categories_selector.selectedIndex].value
    const orderBySelecterValue = orderby_selector.options[orderby_selector.selectedIndex].value
    const searcherValue = searcher_input.value

    // Stringtify queries
    const orderString =(value) => `${value ? `&_order={"${value}":"ASC"}`:''}`
    const categorieSearchString =(categoryVal, searchVal) => categoryVal || searchVal ? `&_where={${ categoryVal ? (`"category":"${categoryVal}" `): ''}${categoryVal && searchVal ? ' , ':'' }${ searchVal ? (`"name":"${searchVal}"`): ''}}`
    : '';

    // join it 
    const queries = `/productos?${categorieSearchString(categorieSelectedValue,searcherValue)+orderString(orderBySelecterValue)}&_start=0&_limit=10`;
    console.log(queries)
     window.location.assign(API_URL+queries); 
  
})
}


const initFilters = async () =>{
    await loadCategories();
    filter();
}

initFilters();