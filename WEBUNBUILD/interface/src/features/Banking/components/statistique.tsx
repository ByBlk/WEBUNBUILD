import { useState } from 'react';
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface StatistiquesProps {
    data: {
        visible: boolean;
        history: any;
    };
}

const StatistiquesComponent: React.FC<StatistiquesProps> = ({ data }) => {
    const [isVisible] = useState(data.visible);

    // const test = [
    //     {
    //       name: '03/02',
    //       deposit: 4000,
    //       withdraw: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: '04/02',
    //       deposit: 3000,
    //       withdraw: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: '05/02',
    //       deposit: 2000,
    //       withdraw: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: '06/02',
    //       deposit: 2780,
    //       withdraw: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: '07/02',
    //       deposit: 1890,
    //       withdraw: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: '08/02',
    //       deposit: 2390,
    //       withdraw: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: '09/02',
    //       deposit: 3490,
    //       withdraw: 4300,
    //       amt: 2100,
    //     },
    //   ];

    return isVisible ? (
        <div className="banking">
            <div className="banking__component__statistiques">
            {/*<ResponsiveContainer >*/}
            {/*    <BarChart*/}
            {/*    width={400}*/}
            {/*    height={300}*/}
            {/*    data={test}*/}
            {/*    margin={{*/}
            {/*        top: 0,*/}
            {/*        right: 0,*/}
            {/*        left: 0,*/}
            {/*        bottom: 0,*/}
            {/*    }}*/}
            {/*    >*/}
            {/*    <CartesianGrid strokeDasharray="3 3" />*/}
            {/*    <XAxis dataKey="name" />*/}
            {/*    <YAxis />*/}
            {/*    <Tooltip />*/}
            {/*    <Legend />*/}
            {/*    <Bar dataKey="deposit" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />*/}
            {/*    <Bar dataKey="withdraw" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />*/}
            {/*    </BarChart>*/}
            {/*</ResponsiveContainer>*/}
            </div>
        </div>
    ) : null;
};

export default StatistiquesComponent;