import Slider from 'react-slick';
import FilmCard from './FilmCard'; 
import { PrevArrow, NextArrow } from "./SliderArrows";

const FilmSlider = ({ films }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      {films.map((film) => (
        <FilmCard key={film.movieid} film={film} />
      ))}
    </Slider>
  );
};

export default FilmSlider;
