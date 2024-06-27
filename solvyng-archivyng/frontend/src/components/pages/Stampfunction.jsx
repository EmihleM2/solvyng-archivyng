import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Rnd } from 'react-rnd';
import './styling/file-viewer.css';
import { Stamp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Stampfunction = () => {
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);
  const [stampPosition, setStampPosition] = useState({ x: 0, y: 0, width: 150, height: 150 });
  const [isStampDropped, setIsStampDropped] = useState(false);
  const [stampType, setStampType] = useState('approved');
  const [selection, setSelection] = useState(''); // 'stamp' or 'signature'
  const [showStamp, setShowStamp] = useState('appear'); // 'stamp' or 'signature
  const [toolsMenu, setToolsMenu] = useState('');
  const [pdfBox, setpdfBox] = useState('open');
  const pdfCanvasRef = useRef(null);


  const loadPdf = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfBytes = new Uint8Array(fileReader.result);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      console.log('PDF loaded and URL set:', url);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleStop = (e, d) => {
    setStampPosition({ ...stampPosition, x: d.x, y: d.y });
    setIsStampDropped(true);
    console.log('Stamp dropped at position:', d.x, d.y);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setStampPosition({
      ...stampPosition,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  };

  const addStampToPdf = async () => {
    if (!pdfUrl) return;

    console.log('Starting to add stamp to PDF...');
    const response = await fetch(pdfUrl);
    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const stampUrl = stampType === 'approved' ? 'approved_stamp.png' : 'deny_stamp.png';
    console.log('Fetching stamp image from URL:', stampUrl);
    const stampImageBytes = await fetch(stampUrl).then((res) => res.arrayBuffer());
    const stampImage = await pdfDoc.embedPng(stampImageBytes);

    const canvas = pdfCanvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const pdfX = (stampPosition.x / canvasRect.width) * firstPage.getWidth();
    const pdfY = firstPage.getHeight() - (stampPosition.y / canvasRect.height) * firstPage.getHeight();

    console.log('Drawing stamp at PDF coordinates:', pdfX, pdfY);
    firstPage.drawImage(stampImage, {
      x: pdfX,
      y: pdfY,
      width: (stampPosition.width / canvasRect.width) * firstPage.getWidth(),
      height: (stampPosition.height / canvasRect.height) * firstPage.getHeight(),
    });

    const pdfBytesModified = await pdfDoc.save();
    const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setModifiedPdfUrl(url);
    //navigate("/stampedDoc");
    console.log('Modified PDF URL set:', url);
  };

  return (
    <>
      {/* File loader for testing */}
      <input type="file" onChange={loadPdf} />

      {pdfBox === 'open' && (
        <div className='pdf-box'>

          {/* Positioning of pdf viewer */}
          <div className='file-viewer'>
          <label className='tools-label' onClick={() => setToolsMenu('stamp')}>Tools</label>
        
            {/* Get url from fetched file */}
            {pdfUrl && (
              <iframe
                ref={pdfCanvasRef}
                title="PDF Viewer"
                src={pdfUrl}
                width="100%"
                height="700px"
                style={{ position: 'relative', zIndex: 0 }}
              >
              </iframe>
            )}
          </div>
          <hr className='tools-line'></hr>

          <div className='tools-menu'>

          
            <div>
              <button className='button-stamp' onClick={() => setSelection('stamp')}>Stamp</button>
              <br />
            </div>
            {selection === 'stamp' && (
              <>  {showStamp === 'appear' && (
                <Rnd
                  size={{ width: stampPosition.width, height: stampPosition.height }}
                  position={{ x: stampPosition.x, y: stampPosition.y }}
                  onDragStop={handleStop}
                  onResize={handleResize}
                  style={{ border: "1px solid black" }}
                >
                  <img
                    src={stampType === 'approved' ? 'approved_stamp.png' : 'deny_stamp.png'}
                    alt="Stamp"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'move',
                      zIndex: 1,
                    }} />
                </Rnd>
              )}
                <div>
                  <button className='button-stamp-approve' onClick={() => setStampType('approved')}>Select Approve Stamp</button>
                </div><div>
                  <button className='button-stamp-deny' onClick={() => setStampType('denied')}>Select Deny Stamp</button>
                </div><div>
                  <button className='button-stamp-add' onClick={addStampToPdf} disabled={!isStampDropped}>Add Stamp to PDF</button>
                </div></>
            )}
            <button className='button-signature' onClick={() => setSelection('signature')}>Signature </button>
          </div>
          {modifiedPdfUrl && (
            <iframe
              title="Modified PDF"
              src={modifiedPdfUrl}
              width="100%"
              height="700px"
              style={{ position: 'absolute', top: '40px', zIndex: 2, padding: "0px 0px 0px 200px" }}
            ></iframe>
          )}
        </div>
      )}
    </>
  );
};

export default Stampfunction;

//  <div>
//       <div className="side-menu">
//         <button onClick={() => setSelection('stamp')}>Stamp</button>
//         <button onClick={() => setSelection('signature')}>Signature</button>
//       </div>
//       <div className='file' style={{ position: 'relative', width: '100%', padding: "0px 0px 0px 200px", border: "2px solid" }}>
//         {pdfUrl && (
//           <iframe
//             ref={pdfCanvasRef}
//             title="PDF Viewer"
//             src={pdfUrl}
//             width="100%"
//             height="700px"
//             style={{ position: 'relative', zIndex: 0 }}
//           ></iframe>
//         )}
//         <Rnd
//           size={{ width: stampPosition.width, height: stampPosition.height }}
//           position={{ x: stampPosition.x, y: stampPosition.y }}
//           onDragStop={handleStop}
//           onResize={handleResize}
//           style={{ border: "1px solid black" }}
//         >
//           <img
//             src={stampType === 'approved' ? '/approved_stamp.png' : '/deny_stamp.png'}
//             alt="Stamp"
//             style={{
//               width: '100%',
//               height: '100%',
//               cursor: 'move',
//               zIndex: 1,
//             }}
//           />
//         </Rnd>
//         {selection === 'stamp' && (
//           <div className="stamp-popup" style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
//             <button onClick={() => { setStampType('approved'); setShowStampMenu(false); }}>Approve Stamp</button>
//             <button onClick={() => { setStampType('denied'); setShowStampMenu(false); }}>Deny Stamp</button>
//           </div>
//         )}
//         <div>
//           <button className='button-stamp' onClick={addStampToPdf} disabled={!isStampDropped}>Add Stamp to PDF</button>
//         </div>
//         {selection === 'signature' && (
//           <div>
//             <button className='button-stamp'>Add Signature to PDF</button>
//           </div>
//         )}
//       </div>
//       {modifiedPdfUrl && (
//         <iframe
//           title="Modified PDF"
//           src={modifiedPdfUrl}
//           width="100%"
//           height="700px"
//           style={{ position: 'absolute', top: '40px', zIndex: 2, padding: "0px 0px 0px 200px" }}
//         ></iframe>
//       )}
//     </div>