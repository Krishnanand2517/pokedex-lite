import Image from "next/image";

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
  return (
    <div>
      <Image
        src={capturedImgSrc}
        alt="Captured Image"
        width={imgWidth}
        height={imgHeight}
        className="rounded-md w-1/2 lg:w-1/3 mx-auto lg:mx-0"
      />
    </div>
  );
}
