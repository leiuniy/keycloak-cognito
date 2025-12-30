interface CustomTopNavigationProps {
    identity: {
        href: string;
        title: string;
        logo?: {
            src: string;
            alt: string;
        };
    };
}

export default function CustomTopNavigation({ identity }: CustomTopNavigationProps) {
    return (
        <div className="custom-top-navigation">
            <a href={identity.href} className="custom-top-navigation__link">
                {identity.logo && (
                    <img 
                        src={identity.logo.src} 
                        alt={identity.logo.alt}
                        className="custom-top-navigation__logo"
                    />
                )}
                <span className="custom-top-navigation__title">
                    {identity.title}
                </span>
            </a>
        </div>
    );
}