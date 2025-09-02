interface NameProps {
    data: {
        firstName: string;
        lastName: string;
    }
}

const NameComponent: React.FC<NameProps> = ({data}) => {

    return (
        <div className='namecontainer'> 
            <h1>{data.firstName} <span>{data.lastName}</span></h1>
        </div>

    );
};

export default NameComponent;