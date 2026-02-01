"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const DEFAULT_FALLBACK = "/images/404.png";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"];
  fallbackSrc?: string;
};

export function OptimizedImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  onError,
  ...rest
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<ImageProps["src"]>(src || fallbackSrc);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setImgSrc(fallbackSrc);
    onError?.(e);
  };

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
