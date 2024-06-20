import React from 'react'

const Documents = () => {
  return (
    <div>
        <section className="doc_wrapper py-5" data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 mb-4">
                        <div className="doc-img">
                            <img src="src/components/assets/doc1.png" alt="" className="img-fluid"/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="doc-content">
                            <h3>Built-in protections against <br/> malware, spam, and <br/>ransomware using Amazon <br/>Macie</h3>
                            <p>Drive can provide encrypted and secure access to your files. Files shared with you can be proactively scanned and removed when malware, spam, ransomware, or phishing is detected. And Drive is cloud-native, which eliminates the need for local files and can minimize risk to your devices.</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 mb-4">
                        <div className="doc-content">
                            <h3>Collaborate with your team and <br/>track the version history of your <br/> documents.</h3>
                            <p>Drive can provide encrypted and secure access to your files. Files shared with you can be proactively scanned and removed when malware, spam, ransomware, or phishing is detected. And Drive is cloud-native, which eliminates the need for local files and can minimize risk to your devices.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="doc-img d-flex justify-content-end">
                            <img src="src/components/assets/doc2.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Documents