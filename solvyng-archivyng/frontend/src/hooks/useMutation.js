import { useState } from 'react';
import axiosClient from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useMutation = ({ url, method = 'POST' }) => {
    const [state, setState] = useState({
        isLoading: false,
        error: '',
        progress: 0,  
    });

    const fn = async data => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            progress: 0,  
        }));

        const config = {
            onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('Upload progress:', percentCompleted);
                setState(prev => ({
                    ...prev,
                    progress: percentCompleted,  
                }));
<<<<<<< HEAD
                // if (percentCompleted === 100) {
                //     toast.success('Successfully Added File', {
                //         position: "bottom-right",
                //         autoClose: 4000,
                //     });
                // }
=======
                if (percentCompleted === 100) {
                    toast.success('Successfully Added File', {
                        position: "bottom-right",
                        autoClose: 4000,
                    });
                }
>>>>>>> a6175a3 (latest)
            },
        };

        axiosClient({ url, method, data, ...config })
            .then(() => {
                setState({ isLoading: false, error: '', progress: 0 });
            })
            .catch(error => {
                setState({ isLoading: false, error: error.message, progress: 0 });
            });
    };

    return { mutate: fn, ...state };
};

<<<<<<< HEAD
=======
// const useMutation = ({ url, method = 'POST', onSuccessMessage, onErrorMessage }) => {
//     const [state, setState] = useState({
//         isLoading: false,
//         error: '',
//         progress: 0,  
//     });

//     const fn = async data => {
//         setState(prev => ({
//             ...prev,
//             isLoading: true,
//             progress: 0,  
//         }));

//         const config = {
//             onUploadProgress: function (progressEvent) {
//                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 console.log('Upload progress:', percentCompleted);
//                 setState(prev => ({
//                     ...prev,
//                     progress: percentCompleted, 
//                 }));
//                 if (percentCompleted === 100 && onSuccessMessage) {
//                     toast.success(onSuccessMessage, {
//                         position: "bottom-right",
//                         autoClose: 4000,
//                     });
//                 }
//             },
//         };

//         axiosClient({ url, method, data, ...config })
//             .then(() => {
//                 setState({ isLoading: false, error: '', progress: 0 });
//             })
//             .catch(error => {
//                 setState({ isLoading: false, error: error.message, progress: 0 });
//                 if (onErrorMessage) {
//                     toast.error(onErrorMessage, {
//                         position: "bottom-right",
//                         autoClose: 4000,
//                     });
//                 }
//             });
//     };

//     return { mutate: fn, ...state };
// };


>>>>>>> a6175a3 (latest)
const handleDelete = async (key) => {
    try {
        const response = await axiosClient.delete(`/images/${key}`);
        console.log(response.data);
<<<<<<< HEAD
        // Display a success toast
        toast.success('Image deleted successfully', {
            position: "bottom-right",
            autoClose: 4000,
            transition: Slide,
            newestOnTop,
        });
        // Remove the deleted image from the state
        setRefetch(refetch + 1);
=======
        toast.success('File deleted successfully', {
            position: "bottom-right",
            autoClose: 4000,
        });
        // Here you can add code to remove the deleted image from the UI
>>>>>>> a6175a3 (latest)
    } catch (error) {
        console.error(error);
        toast.error('Error deleting file', {
            position: "bottom-right",
            autoClose: 4000,
<<<<<<< HEAD
            transition: Slide,
            newestOnTop,
=======
>>>>>>> a6175a3 (latest)
        });
    }
};


export default useMutation;
