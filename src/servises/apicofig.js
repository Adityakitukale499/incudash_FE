import axios from "axios";

const baseUrl  = import.meta.env.VITE_REACT_BASE_URL

export const putData = async (path, body) => {
    const response = await axios.put(`${baseUrl}/${path}`, body, {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    // console.log(response);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const postData = async (path, body) => {
    const response = await axios.post(`${baseUrl}/${path}`, body, {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    // console.log(response);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const getData = async (path)=>{
    const response = await axios.get(`${baseUrl}/${path}`,  {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
    // console.log(response);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const handleOpenPicker = (uploadFile, openPicker, authResponse) => {
    openPicker({
        clientId:
            "538649572727-qtir7ceg35vu4l61ukhn4m4lkofhaknv.apps.googleusercontent.com",
        developerKey: "AIzaSyCTXO8bYQ-9CPzkrQbaDy2cc-1lJDaxBJ4",
        viewId: "DOCS_IMAGES_AND_VIDEOS",

        token:
            "ya29.a0AfB_byDplq5_-_Pwi-5TG64vogBvARt77Jt0lcG3kn-0FlRQNt4ForX2DW6HJUS-tmtfU9o5sJBSuLhUUSMB39he4aoafV10WVvA-jN7I07xGDAT63EDqi3LOQ76YUHGR97mZFD4ZnUZ0Mg5-odDDjj-lgRthr5_p8mjaCgYKAYcSARESFQGOcNnCauzVfjSk7f6OkgxBGbjksw0171",
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,

        //   customViews: customViewsArray, // custom view
        callbackFunction: (data) => {
            if (data.action === "cancel") {
                console.log("User clicked cancel/close button");
            }
            console.log(data);
            uploadFile(data)
        },
    });
};