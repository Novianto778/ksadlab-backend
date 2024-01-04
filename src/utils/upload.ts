import cloudinary from 'cloudinary'
import 'dotenv/config'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

export const upload = async (file: any) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    folder: 'ksadlab',
    use_filename: true,
  })

  return result
}
