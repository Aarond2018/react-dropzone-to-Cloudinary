const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "ddmm5ofs1",
	api_key: process.env.CLD_API_KEY,
	api_secret: process.env.CLD_API_SECRET,
	secure: true,
});

export default async function handler(req, res) {
	const images = JSON.parse(req.body.images);

	for (const image of images) {
		try {
			const response = await cloudinary.uploader.upload(image, {
				folder: "dropzone-images",
			});
		} catch (error) {
			res.json({ message: "an error occured" });
      return
		}
	}
  res.status(200).json({ message: "uploaded successfully" });
}
