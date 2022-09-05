import {useState} from "react";
// upload file with file ref and file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

let data = {
    content:"",
    metadata:""
}

const useFileUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(0);
    const [error, setError] = useState(null);
    
    const uploadFileHandler = (pathRef, data, getUrl) => {
        setIsUploading(true);
        // getting ref of database for updating
        if (data.content) {
            const docRef = ref(storage, pathRef);
            const uploadTask = uploadBytesResumable(docRef, data.content, data.metadata);
            
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadStatus(progress);
                    // console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setError(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        getUrl(downloadURL);
                    });
                }
            )
        }
    }
    // const pause = () => {
    //     setIsPause(true)
    //     uploadTask.pause();
    // }
    // const resume = () => {
    //     setIsPause(false);
    //     uploadTask.resume();
    // }
    // const cancel = () => {
    //     setIsUploading(false)
    //     uploadTask.cancel();
    // }
    


    return {
        isUploading,
        uploadStatus,
        error,
        setUploadStatus,
        uploadFileHandler
    }

}

export default useFileUpload;