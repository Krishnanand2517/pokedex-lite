import Image from "next/image";
import { useState } from "react";

import { getImageDescription } from "@/utils/getImageDescription";

interface DescriptionProps {
  capturedImgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

export default function Description({
  capturedImgSrc,
  imgWidth,
  imgHeight,
}: DescriptionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageDescription, setImageDescription] = useState<string | null>();

  const describeImage = async () => {
    if (capturedImgSrc) {
      setIsLoading(true);

      try {
        const description = await getImageDescription(capturedImgSrc);
        setImageDescription(description);
      } catch (error) {
        console.error("Error getting image description:", error);
        setImageDescription(
          "Failed to get image description. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="lg:flex justify-between items-center gap-4">
        <Image
          src={capturedImgSrc}
          alt="Captured Image"
          width={imgWidth}
          height={imgHeight}
          className="rounded-md w-full lg:w-1/3 mx-auto lg:mx-0"
        />

        <div className="mt-8 lg:mt-0 lg:w-2/3 p-4 lg:p-8 border border-foreground rounded-lg">
          <h3 className="mb-6 text-center lg:text-left text-xl lg:text-3xl font-bold tracking-tighter">
            {imageDescription || "Title"}
          </h3>
          <p className="text-center lg:text-left text-sm lg:text-base tracking-tight">
            {imageDescription ||
              'Image description will appear here after you click the "Describe" button...'}
          </p>
        </div>
      </div>

      <button
        onClick={describeImage}
        disabled={isLoading}
        className="lg:w-1/3 bg-foreground text-background px-4 py-2 rounded-full shadow-md hover:bg-background hover:text-foreground transition-colors"
      >
        Describe
      </button>
    </div>
  );
}
