export const getImageDescription = async (imageData: string) => {
  try {
    const response = await fetch("/api/describe-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      throw new Error("Failed to get image description.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getImageDescription error:", error);
    throw error;
  }
};
