import Link from "next/link";
import { WebIcon, EventIcon, VideoIcon } from "@/components/icons";
import { GradientButton } from "@/components/shared/GradientButton";
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

const iconGradients = [
  "linear-gradient(135deg, #FF1493 0%, #9370DB 100%)",
  "linear-gradient(135deg, #9370DB 0%, #00BFFF 100%)",
  "linear-gradient(135deg, #00BFFF 0%, #FF1493 100%)",
];

/**
 * ServiceShowcase Component
 *
 * Two-column layout:
 * - Left: Title, divider, description, CTA
 * - Right: Vertical stack of service cards with icons
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
        {/* Left Column */}
        <div className={styles.left}>
          <h2 id="services-heading" className={styles.heading}>
            Services
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>
            Web制作・イベント企画・映像制作の
            <br />
            3つの柱で、クライアントのビジョンを
            <br />
            形にします。
          </p>
          <GradientButton href="/services" variant="light" size="lg" filled>
            詳しく見る
          </GradientButton>
        </div>

        {/* Right Column - Service Cards */}
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
                <div
                  className={styles.iconWrapper}
                  style={{ background: iconGradients[index] }}
                >
                  <IconComponent size={32} className={styles.icon} />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.cardDescription}>
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
