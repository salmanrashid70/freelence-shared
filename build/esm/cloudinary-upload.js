import cloudinary from 'cloudinary';
export function uploads(file, public_id, overwrite, invalidate) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
      invalidate,
      chunk_size: 6000000,
      // 6MB chunk size
      resource_type: 'auto' // zipped files, images, etc
    }, (error, result) => {
      if (error) resolve(error);else if (result) resolve(result);else reject(new Error('Unknown error occurred during upload.'));
    });
  });
}
export function videoUpload(file, public_id, overwrite, invalidate) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
      invalidate,
      resource_type: 'video' // specify video resource type
    }, (error, result) => {
      if (error) resolve(error);else if (result) resolve(result);else reject(new Error('Unknown error occurred during upload.'));
    });
  });
}
//# sourceMappingURL=cloudinary-upload.js.map