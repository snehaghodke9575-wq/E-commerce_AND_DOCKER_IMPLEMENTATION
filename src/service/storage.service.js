const {ImageKit} = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey : process.env.PRIVATE_KEY
})

async function uploadImages(base64images) {
    const result = await imagekit.files.upload({
        file :base64images,
        fileName : `product-${Date.now()}.jpg`
    })
    return result;
    
}


module.exports = uploadImages;