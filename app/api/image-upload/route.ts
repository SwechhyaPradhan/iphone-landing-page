import { useState } from 'react';
import axios from 'axios';

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setImageUrl(res.data.secure_url); // This is the URL of your uploaded image
      console.log('Uploaded Image URL:', res.data.secure_url);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files![0])} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && <img src={imageUrl} alt="Uploaded" width={200} />}
    </div>
  );
}
