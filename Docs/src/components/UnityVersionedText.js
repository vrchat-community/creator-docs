import { currentUnityVersion } from '@site/src/components/CurrentUnityVersion2022.js';

const VersionText = ({ versionKey, defaultText }) => {
    const selectedVersion = currentUnityVersion[versionKey] || currentUnityVersion.defaultVersion;
    return <span>{selectedVersion}</span>;
};

export default VersionText;
