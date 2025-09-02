interface IDProps {
    data: {
        id: number; 
    };
}


const IdComponent: React.FC<IDProps> = ({data}) => {

    return (
        <div className='idcontainer'>
            <h1>ID <span>{data.id}</span></h1>
        </div>

    );
};

export default IdComponent;