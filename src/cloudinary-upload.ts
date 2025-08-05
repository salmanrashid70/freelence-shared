import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export function uploads(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean,
): Promise<UploadApiResponse | UploadApiErrorResponse> {

    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                chunk_size: 6000000, // 6MB chunk size
                resource_type: 'auto', // zipped files, images, etc
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error);
                else if (result) resolve(result);
                else reject(new Error('Unknown error occurred during upload.'));
            }
        );
    });
}

export function videoUpload(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean,
): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: 'video', // specify video resource type
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error);
                else if (result) resolve(result);
                else reject(new Error('Unknown error occurred during upload.'));
            }
        );
    });
}
