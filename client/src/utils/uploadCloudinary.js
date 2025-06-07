const uploadImageToCloudinary = async (file) =>{
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  
 if (!upload_preset || !cloud_name) {
    throw new Error("Cloudinary credentials are missing in .env");
  }

  const data = new FormData();
  data.append("file" , file);
  data.append("upload_preset", upload_preset);
//   data.append("cloud_name", cloud_name);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
   
    if (!res.ok) {
      throw new Error(result?.error?.message || "Image upload failed");
    }

    return result;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
     throw error; // Let the caller handle it
  }
};




export default uploadImageToCloudinary;