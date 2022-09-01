import * as React from 'react';
import {useEffect, useState} from 'react';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

const Tester =() => {
    const handleChange = event => {
        setcsvfile(event.target.files[0])
        console.log("file",csvfile)
    }

    const [ csvfile, setcsvfile ] = useState({});

    async function getData() {
        // const response = await fetch('testdata.csv');
        // const response = await fetch(csvfile);
        // const data = await response.text();
        const data = await csvfile.text()
        const metaData = [];
        const finalData = [];
        const header = data.split('\n').slice(0,1);
        console.log("header",header)
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
            const cols = row.split(',');
            metaData.push(cols[0]+","+cols[2]+","+cols[4]);
            finalData.push(cols);
            // temps.push(14 + parseFloat(cols[1]));
        });
        console.log("metadata", metaData)
        console.log("complete data", finalData)
    }

  return (
      <div className="App">
          <h2>Import CSV File!</h2>
          <input
              className="csv-input"
              type="file"
              ref={input => {
                  const filesInput = input;
              }}
              name="file"
              placeholder={null}
              onChange={handleChange}
          />
          <p />
          <button onClick={getData}> Upload now!</button>
      </div>
  );
}

export default Tester;