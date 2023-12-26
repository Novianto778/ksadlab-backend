import DataUriParser from 'datauri/parser'
import { Router, type Request, type Response } from 'express'
import fileUpload, { type UploadedFile } from 'express-fileupload'
import path from 'path'
import { tryCatch } from '../utils/tryCatch'
import { upload } from '../utils/upload'

const router = Router()

router.post(
  '/',
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }),
  tryCatch(async (req: Request, res: Response) => {
    // read form data
    if (!req.files) return res.status(400).json({ message: 'No files were uploaded.' })
    const file = req.files.file as UploadedFile

    // convert buffer to data uri
    const parser = new DataUriParser()
    const extName = path.extname(file.name).toString()
    const file64 = parser.format(extName, file.data)

    // upload to cloudinary
    const result = await upload(file64.content)

    return res.json(result)
  }),
)

export default router
