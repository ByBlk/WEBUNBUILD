import { getCdnUrl } from "@utils/misc";

const MediaCdn: React.FC<{ path: string, name: string, props?: { [x: string]: any }; }> = ({
    path, name, props
}) => {
    return (
        <img src={getCdnUrl(path, name)} {...props} className={props?.className} draggable={props?.draggable} />
    );
};

export default MediaCdn;