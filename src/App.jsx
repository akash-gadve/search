import { useEffect, useState } from 'react';
// import def from './searchAssets.json';
import FlexSearch from 'flexsearch';

export const App = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [file, setFile] = useState();
    const [index, setIndex] = useState(new FlexSearch({
        tokenize: 'reverse',
        language: 'en',
        document: {
            id: 'id',
            name: ['text']
        }
    }));

    // data.forEach((item, id) => {
    //     index.add(id, ...Object.values(item));
    // });

    const search = (e) => {
        const term = e.target.value;
        setsearchTerm(term);

        const resultIds = index.search(e.target.value);

        let resultData = [];

        data.forEach((item, i) => {
            resultIds.forEach((id) => {
                if (id === i) {
                    resultData.push(item);
                }
            })
        });
        setResults(resultData);

    }

    const useJson = (e) => {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0]);
    }

    function onReaderLoad(event) {
        setFile(true);
        setData(JSON.parse(event.target.result));
    }

    useEffect(() => {
        data.forEach((item, id) => {
            index.add(id, Object.values(item)[1]);
        });
    }, [data])

    return (
        <div className='m-auto'>
            {file && (
                <>
                    <input className='inp' value={searchTerm} onChange={search} />
                    <div>
                        {results.map((item, index) => {
                            return <p key={index}>{Object.entries(item)[0][1]}</p>
                        })}
                    </div>
                </>
            )}
            {!file && <input type='file' onChange={useJson} />}
        </div>
    );
}