const cloudinary = require("cloudinary");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file) => {
  const file64 = parser.format(file.name, file.data);
  const response = await cloudinary.v2.uploader.upload(file64.content);
  return {
    publicUrl: response.url,
    publicId: response.public_id,
  };
};

const retrieveFile = async (publicId) => {
  return await cloudinary.v2.url([publicId]);
};

const deleteFile = async (publicId) => {
  return await cloudinary.v2.api.delete_resources([publicId]);
};

module.exports = {
  uploadFile,
  retrieveFile,
  deleteFile,
};
