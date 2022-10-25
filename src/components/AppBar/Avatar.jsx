import React, { useState } from 'react'

export default function AvatarUpload () {
    const [image, setImage] = useState('');
    const [loading,setLoading] = useState(false)


   
 const submitImg = async (e) => {
const files = e.target.files;
const data = new FormData();
data.append("file", files[0]);
data.append("upload_preset", "images");
setLoading(true);
const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgrk2p8p3/image/upload",{
        method: "POST",
        body:data,
    }
)
const file= await res.json();
setImage(file.secure_url)
console.log(file.secure_url)
setLoading(false)
}

    return (
        <div className="profile">
            { <input type="file"  onChange={submitImg} className='inputFile' /> }
            {loading ? <h3>Loading images </h3> : (<img src={image} className='profileImg'/>)}
        </div>
  
    );
}
