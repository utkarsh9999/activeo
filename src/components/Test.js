import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { JsonEditor } from 'json-edit-react';
import Courses from './Courses';

const Test = () => {
  const [jsonContent, setJsonContent] = useState(null);
  const [error, setError] = useState(null);
  const jsonRef = useRef(null);

  // Deep clone function for JSON objects
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const disp = async () => {
    try {
      const file = new File([JSON.stringify(jsonContent, null, 2)], 'account_ids.json', { type: 'application/json' });
      const { error } = await supabase.storage.from('accounts').upload('account_ids.json', file, { upsert: true });
      if (error) {
        alert('Upload failed: ' + error.message);
      } else {
        alert('JSON uploaded successfully!');
      }
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };


  useEffect(() => {
    const fetchJson = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('accounts')
          .download('account_ids.json');
        
        if (error) throw error;

        const text = await data.text();
        const json = JSON.parse(text);
        setJsonContent(deepClone(json));
        jsonRef.current = deepClone(json);
      } catch (e) {
        setError(e.message || 'Failed to parse JSON');
      }
    };
    
    fetchJson();
  }, []);


  return (
    <>
      

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-500 text-white p-4">
          <div id='account-ids'>
            <h1 className='mt-5'>Test Supabase Storage</h1>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            
            {!jsonContent && !error && <div>Loading...</div>}
            
            {jsonContent && (
              <div>

                <JsonEditor
                  data={jsonContent}
                  setData={setJsonContent}
                  mode="tree"
                  height="400px"
                  
                  maxHeight={"400px"}
                  minWidth={"100%"}
                  colors={{
                    default: '#000000',
                    background: '#ffffff',
                    background_warning: '#ffecec',
                    string: '#0b7500',
                    number: '#1643ff',
                    colon: '#000000',
                    keys: '#7928a1',
                    keys_whiteSpace: '#9a5dba',
                    primitive: '#1643ff',
                  }}
                />
                <div className="mt-4">
                  <button 
                    type='button' 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={disp}
                  >
                    Save & Log JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-500 text-white p-4">
          <Courses/>
        </div>
      </div>
    </>
    
  );
};

export default Test;