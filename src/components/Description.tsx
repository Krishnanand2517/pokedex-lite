import { useState } from "react";
import Image from "next/image";

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
  const [imageTitle, setimageTitle] = useState<string | null>();
  const [imageDescription, setImageDescription] = useState<string | null>();

  const separateTitleAndDesc = (
    messageString: string,
    separator: string = "||"
  ) => {
    const splitMessage = messageString.split(separator);
    setimageTitle(splitMessage[0]);
    setImageDescription(splitMessage[1]);
  };

  const describeImage = async () => {
    if (capturedImgSrc) {
      setIsLoading(true);

      try {
        const completionData = await getImageDescription(capturedImgSrc);
        separateTitleAndDesc(completionData.text);
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
            {isLoading ? "Loading..." : imageTitle || "Title"}
          </h3>
          <p className="text-center lg:text-left text-sm lg:text-base tracking-tight">
            {isLoading
              ? "Loading..."
              : imageDescription ||
                'Image description will appear here after you click the "Describe" button...'}
          </p>
        </div>
      </div>

      <button
        onClick={describeImage}
        disabled={isLoading}
        className="lg:w-1/3 bg-foreground text-background px-4 py-2 rounded-full shadow-md hover:bg-background hover:text-foreground transition-colors"
      >
        {isLoading ? "Describing..." : "Describe"}
      </button>
    </div>
  );
}
