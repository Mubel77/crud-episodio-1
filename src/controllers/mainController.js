const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const getJson = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
};

const toThousand = n => (n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "");

const controller = {
	index: (req, res) => {
		const visited = products.filter(product => product.category == "visited");
		visited.forEach(element => {
			
		});
		const inSale = products.filter(product => product.category == "in-sale");
		res.render('index',{visited,inSale,toThousand});
	},
	search: (req, res) => {
		const searchBusquedaProducto = (req.query.q || '').toLowerCase();
		const products = getJson();
	
		const searchResultado = products.filter(product => {
			const nameMatcheo = product.name.toLowerCase().includes(searchBusquedaProducto);
			// includes, estás buscando si el término de búsqueda está contenido en el nombre o la descripción del producto. Esto permite que la búsqueda sea más flexible y coincida con productos que tengan similitud en el nombre con el término buscado.
	
			return nameMatcheo;
		});
	
		res.render('results', { searchResultado, searchBusquedaProducto, toThousand });
	}
};
	
module.exports = controller;
