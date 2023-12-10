const Customer = require('../models/Customer')
const mongoose = require('mongoose');


// GET HOMEPAGE

exports.homepage = async (req,res)=>{
    const locals = {
        title: 'NodeJs',
        description: 'Free NodeJs user management system'
    }
    let perPage = 5;
    let page = req.query.page || 1;
    try {
       const customers = await Customer.aggregate([{$sort:{updated: -1}}])
       .skip(perPage * page - perPage)
       .limit(perPage)
       .exec();

       let count = await Customer.find({})
        count = count.length;
        console.log(count)
       res.render('index', {
        locals,customers,current:page,pages:Math.ceil(count/perPage )
       })
    } catch (error) {
        console.log(error)
    }

}
// exports.homepage = async (req,res)=>{
//     const locals = {
//         title: 'NodeJs',
//         description: 'Free NodeJs user management system'
//     }

//     try {
//         const customers = await Customer.find({}).limit(22);
//         res.render('index', {customers,locals})
//     } catch (error) {
//         console.log(error)
//     }

// }

// GET 
// About page

exports.about = async (req,res)=>{
    const locals = {
        title: 'About',
        description: 'Free NodeJs user management system'
    }

    try {
        res.render('about', locals)
    } catch (error) {
        console.log(error)
    }

}



exports.addCustomer = async (req,res)=>{
    const locals = {
        title: 'Add New Customer - NodeJS',
        description: 'Free NodeJs user management system'
    }
    res.render('customer/add', locals )
}

// POST 
// POST NEW customer

exports.postCustomer = async (req,res)=>{ 
    console.log(req.body)

    const newCustomer = new Customer({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        details:req.body.details,
        tel:req.body.tel,
        email:req.body.email,
    })

    try {
        await Customer.create(newCustomer)
        res.redirect('/')
        
    } catch (error) {
        console.log(error); 
    }
}


//GET Customer data

exports.view = async (req,res)=>{
    try {
        const customer = await Customer.findOne({_id:req.params.id})
        const locals = {
                    title: 'View Customer Data',
                    description: 'Free NodeJs user management system'
                }
        res.render('customer/view', {locals,customer})
            
    } catch (error) {
        console.log(error);
    }
}
//EDIT Customer data

exports.edit = async (req,res)=>{
    try {
        const customer = await Customer.findOne({_id:req.params.id})
        const locals = {
                    title: 'Edit Customer Data',
                    description: 'Free NodeJs user management system'
                }
        res.render('customer/edit', {locals,customer})
            
    } catch (error) {
        console.log(error);
    }
}
//Update Customer data

exports.editPost = async (req,res)=>{
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now()
        });

        res.redirect(`/edit/${req.params.id}`)

    } catch (error) {
        console.error
    }
}
//Delete Customer data

exports.deleteCustomer = async (req,res)=>{
    try {
        await Customer.deleteOne({_id:req.params.id})
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}
//Get
//Search Customer data

exports.searchCustomers = async (req,res)=>{
    const locals = {
        title: 'Search customer data',
        description: 'Free NodeJs user management system'
    }
   
    try {
        let searchTerm = req.body.searchTerm;
        const SearchNoSpecialChar = searchTerm.replace(/[^a-zA-z0-9 ]/g,"");
        const customers = await Customer.find({
            $or:[{firstName:{$regex: new RegExp(SearchNoSpecialChar,"i")}},{lastName:{$regex: new RegExp(SearchNoSpecialChar,"i")}}         
        ]
        });

        res.render("search",{customers,locals})

    } catch (error) {
        console.log(error);
    }
}