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
		const busqueda = req.query.keywords;
		const resultado = [];

		products.forEach(producto => {
			if (producto.name.toLowerCase().includes(busqueda.toLowerCase())) {
				resultado.push(producto);
			}
		});
		
		res.render('results', { resultado, toThousand, busqueda });
	}
};
	
module.exports = controller;
