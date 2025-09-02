import MediaCdn from "@/components/mediaCdn/mediaCdn";

interface FourrièreData {
    id: string;
    name: string;
    img: string;
}

interface FourrièreComponentsProps {
    data: FourrièreData[];
}

const FouriereComponents: React.FC<FourrièreComponentsProps> = ({ data }) => {
    return (
        <div className="FourièreComponents">
            <h1>Fourrière</h1>

            <div className="FourièreComponents__Containt">
                    {data.map((fourière, index) => (
                        <div className="Items" key={index}>
                            <div className="Items__img">
                                <MediaCdn path="vehicules" name={fourière.img} />
                            </div>
                            <div className="Items__label">
                                <h1>{fourière.name}</h1>
                            </div>

                        </div>
                    ))} 
                </div>
        </div>
    );
};

export default FouriereComponents;
