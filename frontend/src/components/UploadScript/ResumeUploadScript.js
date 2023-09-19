import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import pa from "./uploads"
import "../../css/LoginCss.css"
import ContextApi from "../../components/ContextApi";
import { toast, Toaster } from "react-hot-toast";


export default function ResumeUploadScript() {
  const a = useContext(ContextApi);
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);
//   // import pa from "./Uploads"
//   const filepath= a.user.details.resumeFile
// const pdfFilePath = require(`./Uploads/${filepath}`)
//   useEffect(() => {
//     getImage();
//   }, []);
// const filen=""
// pa.map((p)=>{
//   if(p===a.user.detail.resumeFile){
//     filen=p
//   }
// })


  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    const id =a.user._id
    formData.append("id",id)

    console.log(id)
    const response = await axios.post(
      "http://localhost:5000/api/upload-image",
      formData,{id},
      {
        headers: { "Content-Type": "multipart/form-data" },
       
      },
    );
    const json = await response.data;
    console.log(json);
    if (json.success) {
      toast.success("Saved successfully!");

      // navigate("../MobileOTP");
    }

    if (!json.success) {
      toast.error("Invalid credentials");
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // const pdfFilePath = `./Uploads/${filepath}`;
    const handleDownload = () => {
      // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
      // const pdfPath = 'frontend\public\Har.pdf';
    // window.location.href = pdfFilePath;

      // // Create a virtual anchor element
      // const link = document.createElement('a');
      // link.href = pa;
      // link.target = '_blank'; // Open the link in a new tab
      // link.download = 'downloaded-file.pdf'; // Optional: Set a custom filename for the downloaded file
      
      // // Trigger a click event on the anchor element
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    };

//   const getImage = async () => {
//     const result = await axios.get("http://localhost:5000/get-image");
//     console.log(result);
//     setAllImage(result.data.data);
//   };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <p style={{fontWeight:"bold", color:"green"}}>Add Your Resume</p>
      <form onSubmit={submitImage}>

        <input className=" button-6" type="file" accept=".pdf" onChange={onInputChange}></input>{" "}
        <button className="button-6" type="submit">ADD RESUME</button>
      </form>


      {/* <div>
      <h1>PDF Download Example</h1>
      
      <button onClick={handleDownload}>Download PDF</button>
      <button onClick={() => window.open(pdfFilePath, '_blank')} download="newfile">Open PDF in New Tab</button>
      </div> */}
      
    </div>
  );
}
