import { currentUnityVersion } from '@site/src/components/CurrentUnityVersion2022.js';

const VersionedLink = ({ versionKey, url, children }) => {
    const selectedVersion = currentUnityVersion[versionKey] || currentUnityVersion.defaultVersion;
    const versionedUrl = url.replace('<VERSION>', selectedVersion);
    return <a href={versionedUrl} target="_blank">{children}</a>;
};
  
export default VersionedLink;