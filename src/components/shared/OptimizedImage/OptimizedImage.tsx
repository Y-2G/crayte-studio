"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import styles from "./OptimizedImage.module.css";

const DEFAULT_FALLBACK = "/images/404.png";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"];
  fallbackSrc?: string;
};

export function OptimizedImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className,
  onError,
  ...rest
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(!src);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setHasError(true);
    onError?.(e);
  };

  if (hasError) {
    return (
      <div className={`${styles.fallback} ${className ?? ""}`}>
        <Image
          {...rest}
          src={fallbackSrc}
          alt={alt}
          className={styles.fallbackImage}
        />
        <span className={styles.fallbackAlt}>{alt}</span>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={src!}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
