interface IDProps {
    data: {
        info: number;
    };
}


const IdComponent: React.FC<IDProps> = ({data}) => {

    return (
        <div className='idcontainer'>
            <h1>ID <span>{data.info}</span></h1>
        </div>

    );
};

export default IdComponent;