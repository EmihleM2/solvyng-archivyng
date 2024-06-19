import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';


const RecentFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('https://o4ageyedwiyl4mxvmfglmw3cha0ifgel.lambda-url.us-east-1.on.aws/', {
                    method: 'GET',
                    mode: 'cors',
                });
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files', error);
                setError('Error fetching files');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="p-6 flex-1 bg-white">
                <h1 className="text-2xl font-semibold mb-6">Recent Files</h1>
                <div className="overflow-hidden border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Type</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {files.map((file, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.key}</td>
                                    {/* Display the event time as the "Access Date" */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.eventTime}</td>
                                    {/* Display the file type as the "File Type" */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href={file.url} className="text-indigo-600 hover:text-indigo-900" target="_blank" rel="noopener noreferrer">Open</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default RecentFiles;
