import React from "react";
import "./AlbumCarrousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import AlbumCard from "./AlbumCard";



  function AlbumCarrousel({data, random}) {
  // constructor(props) {
  //   super(props);
  //   this.state = { index: 0 };
  //   this.handleLeft = this.handleLeft.bind(this);
  //   this.handleRight = this.handleRight.bind(this);
  // }

  

  // handleRight(total) {
  //   let limit = Math.floor(total / 2) - 1;
  //   if (this.state.index < limit) {
  //     let n = this.state.index + 1;
  //     this.setState({ index: n });
  //     document.getElementById(
  //       "carousel-top-albums"
  //     ).style.transform = `translateX(-${n * (170 + 40)}px)`;
  //   }
  // }
  // handleLeft() {
  //   if (this.state.index > 0) {
  //     let n = this.state.index - 1;
  //     this.setState({ index: n });
  //     document.getElementById(
  //       "carousel-top-albums"
  //     ).style.transform = `translateX(-${n * (170 + 40)}px)`;
  //   }
  // }


    return (
      <>
        <div className="carrousel-container">
          <div className="header-carrousel">
            <h1>Your Playlists</h1>
            <div>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="arrow"
                // onClick={this.handleLeft}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="arrow"
                // onClick={this.handleRight.bind(this, albums.length)}
              />
            </div>
          </div>
          <section>
            <div className="slider">
              <div className="items-slider" id="carousel-top-albums">
                {
                  data?.length > 0 ? data.map((card)=>{
                    return  <AlbumCard key={card._id} title={card.name} imgSrc={card.thumbnail}/>
                  }) :  <h2>no data</h2>
                }
              </div>
            </div>
          </section>
        </div>
        <div className="carrousel-container">
          <div className="header-carrousel">
            <h1>Random Playlists</h1>
            <div>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="arrow"
                // onClick={this.handleLeft}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="arrow"
                // onClick={this.handleRight.bind(this, albums.length)}
              />
            </div>
          </div>
          <section>
            <div className="slider">
              <div className="items-slider" id="carousel-top-albums">

             { random?.length > 0 ? random.map((card)=>{
                    return  <AlbumCard key={card._id} title={card.name} imgSrc={card.thumbnail}/>
                  }) :  <h2>no data</h2>}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }


export default AlbumCarrousel;
