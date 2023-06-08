import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Spacer from "../Utilities/Spacer";

const FeatureList = [
    {
        title: 'Getting Started',
        imageUrl: require('@site/static/img/homepage/ill-overview.png').default,
        link: '/getting-started',
        description: (
            <>
                For new and experienced creators.
            </>
        ),
    },
    {
        title: 'Worlds',
        imageUrl: require('@site/static/img/homepage/ill-worlds.png').default,
        link: '/worlds',
        description: (
            <>
                Build simple to complex experiences and hangouts.
            </>
        ),
    },
    {
        title: 'Avatars',
        imageUrl: require('@site/static/img/homepage/ill-avatars.png').default,
        link: '/avatars',
        description: (
            <>
                Express yourself with a wide range of customization.
            </>
        ),
    },
];

function Feature({imageUrl, title, description, link}) {
    return (
        <div className={clsx(`col col--4 ${styles.feature}`)}>
            <div className="text--center">
                <a href={link}>
                    <img className={styles.featureImage} src={imageUrl} alt={title} />
                </a>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p className="text--left">{description}</p>
            </div>
            <Spacer/>
            <div>
                <a href={link}><button className="button button--primary button--block">Learn more</button></a>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
