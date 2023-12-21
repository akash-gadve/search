import { useState } from 'react';
import data from './searchAssets.json';
import FlexSearch from 'flexsearch';

export const App = () => {
    console.log(data.length);
    const [searchTerm, setsearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const index = new FlexSearch({
        tokenize: 'reverse',
        language: 'en',
        document: {
            id: 'id',
            name: ['text']
        }
    });

    data.forEach((item, id) => {
        index.add(id, item.display_name);
    });

    const search = (e) => {
        console.log(e);
        const term = e.target.value;
        setsearchTerm(term);

        const resultIds = index.search(term);

        let resultData = [];

        data.forEach((item, index)=>{
            resultIds.forEach((id)=>{
                if(id===index){
                    resultData.push(item);
                }
            })
        });

        setResults(resultData);

    }

    return (
        <div className='m-auto'>
            <input value={searchTerm} onChange={search}/>
            <div>
                {results.map((item, index)=>{
                    return <p key={index}>{item.display_name}</p>
                })}
            </div>
        </div>
    );
}