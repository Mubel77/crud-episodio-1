const { json } = require('express');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const getJson = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
};
const storeProduct = (newProducts) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), 'utf-8');
};

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = getJson();
		const visited = products.filter(product => product.category == "visited");
		visited.forEach(element => {
			
		});
		const inSale = products.filter(product => product.category == "in-sale");
		res.render('index',{visited,inSale,toThousand});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
    	const { id } = req.params;
    	const products = getJson();
    	const product = products.find(product => product.id == id);
    	res.render("detail", { title: product.name, product, toThousand });
	},


	// Create - Form to create
	create: (req, res) => {
   res.render("product-create-form",);
	},

	
	// Create - Method to store
	store: (req, res) => {
        const { name, price, discount, description, category } = req.body;
        const products = getJson();
        const idRandom = Date.now();
        const newProduct = {
            id: idRandom,
            name: name.trim(),
            price: +price,
            description: description.trim(),
            discount: +discount,
            category: category,
            image: 'default-image.png'
        };

        const productsModify = [...products, newProduct];
        storeProduct(productsModify);

        return res.redirect('/'); 
    },

	// Update - Form to edit
	edit: (req, res) => {
		const {id} =req.params
		const products =getJson ();
		const product = products.find(product => product.id == id);
		res.render("product-edit-form", {product,toThousand })
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} =req.params;
		const {name,price,discount,category,description,image} = req.body;
		const products = getJson();
		const nuevoArray =products.map(product=>{
			if (product.id == id)
			return {
				id,
				name:name.trim(),
				price,
				discount,
				category,
				description:description.trim(),
				image: image ? image : product.image
			}
			return product
		})
		const Json = JSON.stringify(nuevoArray);
		fs.writeFileSync(productsFilePath,Json,"utf-8");
		res.redirect(`/products/detail/${id}`);
	},	

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const id = +req.params.id;
		const products = getJson();
		const productosNoEliminado = products.filter(product => product.id !== id);
		

		res.send(productosNoEliminado)

		storeProduct(productosNoEliminado)

		return res.redirect('/'); 
	},
	// products - products list
	products: (req, res) => {
		console.log('Productos:', visited, inSale);
		res.send("products"); // Asegúrate de tener un archivo products.ejs en tu directorio de vistas
	  },
};

module.exports = controller;