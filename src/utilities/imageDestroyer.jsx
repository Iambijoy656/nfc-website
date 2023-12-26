import axios from "axios";
import { SHA1 } from "crypto-js";

// const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUDENAME = "dov60yweq";

const imageDestroyer = async (imageUrl) => {
  if (!imageUrl) {
    return;
  }
  const parts = imageUrl?.split("/");
  // Get the last part (the part after the last '/')
  const publicId = parts[parts.length - 1];

  //   console.log("publicId", publicId);

  const generateSHA1 = (data) => {
    return SHA1(data).toString();
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const timestamp = new Date().getTime();
  const apiKey = "613968129837461";
  const apiSecret = "MRzcUdYudiy63DUoh55xOx_D-Xw";
  const signature = generateSHA1(generateSignature(publicId, apiSecret));

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/image/destroy`,
      {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      }
    );

      console.log("Image deleted from Cloudinary:", response.data);
    // You may want to handle the response or errors here
  } catch (error) {
    console.error("Error deleting image:", error);

    if (error.response) {
      console.error("Error response:", error.response.data);
    }

    throw error;
  }
};

export default imageDestroyer;
