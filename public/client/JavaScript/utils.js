var fetchData = async (url) =>{
    try{
	const {data,status} = await axios
			.get( url)
			.catch((error) => {
				console.error(error.message);
			});
		// is the response a success?
		if (status !== 200)
			console.error("searcher have unexpected status ");
		if (status == 200)
            return data
        }catch(e){
            console.error(e);
        };


}