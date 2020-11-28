import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Predictions from '@aws-amplify/predictions';
import DropzoneModal from '../Modals/DropzoneModal';
import Loader from 'react-loader-spinner';
import './Dropzone.css';

function Dropzone(props) {

  const [files, setFiles] = useState([]);
  const [filesWithCost, setFilesWithCost] = useState([]);
  const [showModal, setShowModal] = useState(false); //state of whether to show modal or not w/ images
  const [loaderState, setLoaderState] = useState(false);

  async function identifyText(acceptedFiles) {
    setLoaderState(true);
    let arrayOfObjs = []; 
    var wait = new Promise((resolve, reject) => {
      let count = 0;
      acceptedFiles.forEach(async file => { 
        await Predictions.identify({
          text: {
            source: {
              file
            }
          }
        })
        .then(res => {
          const totalCost = parseText(res);
          let costAndImgObj = {
            totalCost: totalCost,
            image: file
          };
          arrayOfObjs.push(costAndImgObj);
          count++;
          if(count === acceptedFiles.length) {
            resolve();
          }
        })
        .catch(err => {
          console.log(err);
          reject();
        }); 
      });
    });

    wait.then(() => {
      setFilesWithCost(arrayOfObjs);
      setLoaderState(false);
    });
  }

  useEffect(() => {
    if(filesWithCost.length > 0) {
      setShowModal(true);
    }
  }, [filesWithCost]);

  //function to parse text recognized by rekognition to find total cost
  function parseText(data) {
    const textArr = data.text.words;
    var maxCost = 0;
    textArr.forEach(textObj => {
      var text = textObj.text;
      if(text.includes("$")) {
        text = text.replace(/\s/g, ''); //remove white space
        text = text.replace("$", ""); //remove $ sign
        text = parseFloat(text); //convert from string to fp number
        if(text > maxCost) {
          maxCost = text;
        }
      }
    });
    maxCost = maxCost.toFixed(2); //converts number to string, rounding to keep two decimals
    return maxCost;
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: async acceptedFiles => {
      await identifyText(acceptedFiles);

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          {loaderState ? <Loader type="Bars" color="rgb(1, 114, 71)" height={"50%"} width={"100%"} /> :
            <>
              <input {...getInputProps()} />
              <p className="dropbox-text"> Drag 'n' Drop Images Here <br/> or <br/> Click to Select</p>
              <p className="dropbox-disclaimer-text">Only *.jpeg and *.png images are accepted! <br/> Images must have a $ indicator! </p>
            </>
          }
        </div>
      </section>
      <DropzoneModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        data={filesWithCost} 
        from="dropzone"
      />
    </>
  );
}

export default Dropzone;