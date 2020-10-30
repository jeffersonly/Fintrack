import './Dropzone.css';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Predictions from '@aws-amplify/predictions';
import DropzoneModal from '../Modals/DropzoneModal';

function Dropzone(props) {
    const [files, setFiles] = useState([]);
    const [filesWithCost, setFilesWithCost] = useState([]);
    const [showModal, setShowModal] = useState(false); //state of whether to show modal or not w/ images

    async function identifyText(acceptedFiles) {
        let arrayOfObjs = []; 
        acceptedFiles.forEach(async file => {
            // await Predictions.identify({
            //     text: {
            //         source: {
            //             file
            //         }
            //     }
            // })
            // .then(res => {
            //     console.log(res);
            //     console.log("here");
            //     const totalCost = parseText(res);
            //     let costAndImgObj = {
            //         totalCost: totalCost,
            //         image: file
            //     };
            //     arrayOfObjs.push(costAndImgObj);
            // })
            // .catch(err => console.log(err));
            const totalCost = 5;
            let costAndImgObj = {
                totalCost: totalCost,
                image: file
            };
            arrayOfObjs.push(costAndImgObj);
        });
        setFilesWithCost(arrayOfObjs);
        setShowModal(true);
    }

    //function to parse text recognized by rekognition to find total cost
    function parseText(data) {
        const textArr = data.text.words;
        var maxCost = 0;
        textArr.map(textObj => {
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
        //console.log(filesWithCost);
    }, [files, filesWithCost]);

    return (
        <>
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p className="dropbox-text"> Drag 'n' Drop Images Here <br/> or <br/> Click to Select</p>
                    <p className="dropbox-disclaimer-text">Only *.jpeg and *.png images are accepted! <br/> Images must have a $ indicator! </p>
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