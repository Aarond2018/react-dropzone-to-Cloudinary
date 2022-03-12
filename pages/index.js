import { useCallback, useState, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [selectedImages, setSelectedImages] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        setSelectedImages(prevState => [...prevState, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop/* ,accept: 'image/jpeg' */,maxFiles:2})

  const onUpload = () => {
    (async function uploadImage() {
      try {
        const response = await axios.post("/api/upload", {
          images: JSON.stringify(selectedImages)
        });
        console.log(response)
      } catch (error) {
        console.log("imageUpload" + error);
      }
    })();
  }

  const style = useMemo(() => ({
    ...(isDragAccept ? {borderColor: '#00e676'} : {}),
    ...(isDragReject ? {borderColor: '#ff1744'} : {})
  }), [
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.dropzone} {...getRootProps({style})}>
        <input {...getInputProps()} />
        { isDragActive ?
          <p>Drop file(s) here ...</p> :
          <p>Drag and drop file(s) here, or click to select files</p>
      }
      </div>
      <div className={styles.images}>
        {selectedImages.length > 0 && selectedImages.map((image, index) => (
          <img src={image} key={index} />
        ))}
      </div>
      {selectedImages.length > 0 && <div className={styles.btn}>
        <button onClick={onUpload}>Upload to Cloudinary</button>
      </div>}
    </div> 
  )
}
