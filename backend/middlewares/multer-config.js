const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}

const uploadFilter = function (req, file, cb) {
    const extension = MIME_TYPES[file.mimetype]
    if (extension === 'png' || extension === 'jpg' || extension === 'gif') {
        cb(null, true)
    }
    else {
        cb('This is not a valid image', false)
    }
}

const uploadUserFilter = function (req, file, cb) {
    const extension = MIME_TYPES[file.mimetype]
    if (extension === 'png' || extension === 'jpg' ) {
        cb(null, true)   
    }
    else {
        cb('This is not a valid image', false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

const postStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})


const userStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/users')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

const uploadUserImage = multer({ storage: userStorage, fileFilter: uploadUserFilter }).single('image')
const uploadPostImage = multer({ storage: postStorage, fileFilter: uploadFilter }).single('image')



module.exports = { uploadUserImage, uploadPostImage }