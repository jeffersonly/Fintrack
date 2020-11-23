import './Webcam.css';
import React, { useState } from 'react';
import Webcam from "react-webcam";
import Predictions from '@aws-amplify/predictions';
import DropzoneModal from '../Modals/DropzoneModal';
import Loader from 'react-loader-spinner';

function WebcamCapture(props) {
    const webcamRef = React.useRef(null);
    const [showWebcam, setShowWebcam] = useState(false); //state of whether to show webcam or not
    const [imageWithCost, setImageWithCost] = useState({}); 
    const [showModal, setShowModal] = useState(false); //state of whether to show modal or not w/ images
    const [loaderState, setLoaderState] = useState(false);

    function convertToImg(imageSrc) {
        const b64 = imageSrc.split(",")[1];
        const charCodeArray = [...atob(b64)].map((c) => c.charCodeAt(0));
        const blobData = [new Uint8Array(charCodeArray)];
        return new Blob(blobData, { type: "image/jpeg" });
    }

    //function to capture image from webcam
    const capture = React.useCallback(async () => {
        setLoaderState(true);
        const imageSrc = webcamRef.current.getScreenshot();
        
        const file = convertToImg(imageSrc); 

        //identify text within image to find total cost
        let totalCost = 0;
        let costAndImgObj = {
            totalCost: totalCost,
            image: imageSrc
        };

        await Predictions.identify({
            text: {
                source: {
                    file
                }
            }
        })
        .then(res => {
            totalCost = parseText(res);
            costAndImgObj = {
                totalCost: totalCost,
                image: imageSrc
            };
        })
        .catch(err => console.log(err));

        setImageWithCost(costAndImgObj);
        setLoaderState(false);
        setShowModal(true);
    }, [webcamRef]);


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

    //function to determine what components should be shown for webcam
    function displayWebcam() {
        if(showWebcam) {
            return (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="webcam"
                    />
                    <button className="take-photo-button" onClick={capture}>Capture Photo</button>
                    <button className="close-webcam-button" onClick={() => setShowWebcam(false)}>Close Camera</button>
                </>
            );
        } else {
            return (
                <>
                    <h2 className="webcam-text">OR</h2>
                    <button className="take-photo-button" onClick={() => setShowWebcam(true)}>Take a Photo</button>
                </>
            );
        }
    }

    return (
        <>
            <div className="webcam-item-container">
                {loaderState ? <Loader type="Bars" color="rgb(1, 114, 71)" height={"50%"} width={"100%"} /> : displayWebcam()}
            </div>
            <DropzoneModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                data={imageWithCost} 
                from="webcam"
            />
            
        </>
    );
}

export default WebcamCapture;
  