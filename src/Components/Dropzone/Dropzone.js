import './Dropzone.css';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Predictions from '@aws-amplify/predictions';

function Dropzone(props) {
    const [files, setFiles] = useState([]);

    async function identifyText(acceptedFiles) {
        acceptedFiles.forEach(async file => {
            await Predictions.identify({
                text: {
                    source: {
                        file
                    }
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        })
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

    const thumbs = files.map(file => (
        <div className="thumbs-img" key={file.name}>
            <div className="thumbs-img-inner">
                <img
                    src={file.preview}
                    className="thumbnail-image"
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p className="dropbox-text">Drag 'n' Drop Images Here <br/> or <br/> Click to Select</p>
                <p className="dropbox-disclaimer-text">Only *.jpeg and *.png images are accepted!</p>
            </div>
            <aside className="thumbs-imgs-container">
                {thumbs}
            </aside>
        </section>
    );
}

export default Dropzone;