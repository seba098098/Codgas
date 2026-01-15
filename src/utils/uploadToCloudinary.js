import { CONFIG } from "../constants/config";

export async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
        "upload_preset",
        CONFIG.CLOUDINARY.UPLOAD_PRESET
    );

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY.CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    if (!data.secure_url) {
        throw new Error("Error subiendo imagen a Cloudinary");
    }

    return data.secure_url;
}
