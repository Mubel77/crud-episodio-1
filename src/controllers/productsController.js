const { log } = require('console');
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
		// res.send("estoy aci")
		const products = getJson(); 
		res.render("products", { products, }); 
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
		const products = getJson();
        const { name, price, discount, description, category } = req.body;
        const files = req.files; 
		const id = Date.now();
		const arrayImagenes = [];
		files.forEach(element => {
			arrayImagenes.push(element.filename)
		});
        const newProduct = {
            id,
            name: name.trim(),
            price: +price,
            description: description.trim(),
            discount: +discount,
            category: category,
            image: arrayImagenes.length > 0 ? arrayImagenes : ['default-image.png']
        };

        const productsModify = [...products, newProduct];
        storeProduct(productsModify);

        return res.redirect(`/products/detail/${id}`); 
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
    	const images = [];
    	if (req.files) {
        req.files.forEach(element => {
            images.push(element.filename);
        });
    	}

    	const { id } = req.params;
   	 	const { name, price, discount, category, description, image } = req.body;
    
    	const products = getJson();

    	const nuevoArray = products.map(product => {
        if (product.id == id) {
            return {
                id,
                name: name.trim(),
                price,
                discount,
                category,
                description: description.trim(),
                image: images.length > 0 ? images : product.image
            };
        }
        return product;
    	});

    	const Json = JSON.stringify(nuevoArray);
    	fs.writeFileSync(productsFilePath, Json, "utf-8");
    	res.redirect(`/products/detail/${id}`);
},


	// Delete - Delete one product 
	destroy: (req, res) => {
		const products = getJson();
		const id = +req.params.id;
		const product = products.find(product => product.id === id);
		const productosNoEliminado = products.filter(product => product.id !== id);
	
		if (product.image !== 'default-image.png') {
			const imagePath = `./public/images/${product.image}`;
			fs.unlink(imagePath, (err) => {
				if (err) {
					console.error(`Error al borrar la imagen ${product.image}: ${err.message}`);
				} else {
					console.log(`Imagen ${product.image} eliminada`);
				}
			});
		}
	
		storeProduct(productosNoEliminado);
	
		return res.redirect('/products');
	},
	
	
};

module.exports = controller;