import Link from "next/link";
import { WebIcon, EventIcon, VideoIcon } from "@/components/icons";
import styles from "./ServiceShowcase.module.css";

interface Service {
  title: string;
  titleEn: string;
  description: string;
  tags: string[];
  icon: "web" | "event" | "video";
  link: string;
}

interface ServiceShowcaseProps {
  services: Service[];
  className?: string;
}

/**
 * Get the appropriate icon component based on icon type
 */
function getIconComponent(iconType: "web" | "event" | "video") {
  switch (iconType) {
    case "web":
      return WebIcon;
    case "event":
      return EventIcon;
    case "video":
      return VideoIcon;
  }
}

/**
 * ServiceShowcase Component
 *
 * Displays services in an asymmetric grid layout:
 * - Desktop: First service (Web) takes 2 rows, others stack on the right
 * - Mobile: All services are equal-sized cards in a single column
 */
export function ServiceShowcase({ services, className }: ServiceShowcaseProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
      aria-labelledby="services-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="services-heading" className={styles.heading}>
            What We Do
          </h2>
          <div className={styles.underline} aria-hidden="true" />
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);

            return (
              <Link
                key={service.icon}
                href={service.link}
                className={styles.serviceCard}
                aria-label={`${service.title} - ${service.description}`}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent
                    size={index === 0 ? 64 : 48}
                    className={styles.icon}
                  />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.titleEn}>{service.titleEn}</p>
                  <p className={styles.description}>{service.description}</p>

                  {service.tags.length > 0 && (
                    <div className={styles.tags} aria-label="Service categories">
                      {service.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.arrow} aria-hidden="true">
                  →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
