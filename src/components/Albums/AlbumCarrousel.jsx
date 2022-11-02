import React from "react";
import "./AlbumCarrousel.css";
import AlbumCard from "./AlbumCard";
import Coverflow from "react-coverflow";

function AlbumCarrousel({ data, random }) {
  return (
    <div className="flex flex-wrap w-[800px] h-full mb-28 ml-[18%]">
      <div className="flex flex-col  mb-10">
        <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
          Your Playlists
        </h1>
        <div className="wrapper">
          <Coverflow
            displayQuantityOfSide={2}
            height={300}
            width={800}
            infiniteScroll
            enableHeading={false}
            currentFigureScale={1}
            otherFigureScale={1}
          >
            {data.map((card) => {
              return (
                <div className="wrapper">
                  <AlbumCard
                    key={card._id}
                    title={card.name}
                    imgSrc={card.thumbnail}
                  />
                </div>
              );
            })}
          </Coverflow>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
          Recommended
        </h1>
        <div className="wrapper">
          <Coverflow
            displayQuantityOfSide={2}
            height={300}
            width={800}
            infiniteScroll
            enableHeading={false}
            currentFigureScale={1}
            otherFigureScale={1}
          >
            {random.map((card) => {
              return (
                <div className="wrapper">
                  <AlbumCard
                    key={card._id}
                    title={card.name}
                    imgSrc={card.thumbnail}
                  />
                </div>
              );
            })}
          </Coverflow>
        </div>
      </div>
    </div>
  );
}

export default AlbumCarrousel;
