const Photo = require('../models/Photo');
const fs = require('fs');

const getAllPhotos = async (req,res) => {
    const page = req.query.page || 1;
    const photoPerPage = 3;

    const totalPhoto = await Photo.find({}).countDocuments();
    const totalPage = Math.ceil(totalPhoto / photoPerPage);

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photoPerPage)
    .limit(photoPerPage);

    res.render('index', {
        photos: photos,
        current: page,
        pages: totalPage
    });
}
const getPhoto = async (req,res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
}
const createPhoto = async (req,res) => {
    const uploadDir = './public/upload';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    let uploadedImage = req.files.image;
    let uploadPath = `./public/upload/${uploadedImage.name}`;
    await uploadedImage.mv(uploadPath, async () => {
            await Photo.create({
                ...req.body,
                image: `/upload/${uploadedImage.name}`
            });   
        }
    );
    res.redirect('/')
}
const updatePhoto = async (req,res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photos/${photo._id}`);
}
const deletePhoto = async (req,res) => {
    const photo = await Photo.findById(req.params.id);
    const path = `./public/${photo.image}`;
    fs.unlinkSync(path);
    await Photo.findByIdAndDelete(photo._id);
    res.redirect('/');
}

module.exports = {
    getAllPhotos,
    getPhoto,
    createPhoto,
    updatePhoto,
    deletePhoto
}