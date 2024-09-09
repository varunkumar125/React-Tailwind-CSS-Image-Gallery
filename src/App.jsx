import React, { useEffect, useState } from "react"
import ImageCard from "./component/imageCard"
import ImageSearch from "./component/imageSearch"


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=45833718-364e9849866dfb2db80e89fde&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  },[term])
  return (
    <>
      <div className="container mx-auto p-5">
        <ImageSearch searchText={(text) => setTerm(text)} />

        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

        {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-4 gap-4 ">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>}
      </div>
    </>
  )
}

export default App
