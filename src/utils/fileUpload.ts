import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Get upload directory from env or use default
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads', 'images');

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Update the file filter with better MIME type handling
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Log incoming file details for debugging
  // console.log('File upload attempt:', {
  //   originalname: file.originalname,
  //   mimetype: file.mimetype,
  //   fieldname: file.fieldname
  // });

  // List of allowed file extensions and their corresponding MIME types
  const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
  
  // Get file extension
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Allow if:
  // 1. File has an allowed extension AND
  // 2. Either has a valid image MIME type OR is from Hoppscotch (text/plain)
  if (allowedExtensions.has(ext) && 
      (file.mimetype.startsWith('image/') || 
       file.mimetype === 'text/plain' ||  // Hoppscotch sends this
       file.mimetype.includes('octet-stream'))) {
    cb(null, true);
  } else {
    console.log(`Rejected file: ${file.originalname} (${file.mimetype})`);
    cb(new Error(`File type not allowed. Supported formats: JPG, JPEG, PNG, GIF, WEBP, SVG`));
  }
};

// Update multer config with additional options
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files per upload
  }
});

// Helper function to get URL for uploaded file
export const getFileUrl = (filename: string): string => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/uploads/images/${filename}`;
};