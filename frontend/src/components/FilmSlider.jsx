// import Slider from 'react-slick';
// import FilmCard from './FilmCard'; 
// import { PrevArrow, NextArrow } from "./SliderArrows";
// import { useMediaQuery, useTheme } from "@mui/material";

// const FilmSlider = ({ films }) => {
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

//   const slidesToShow = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow,
//     slidesToScroll: 1,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: !isXs,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

//   return (
//     <Slider {...settings}>
//       {films.map((film) => (
//         <FilmCard key={film.movieid} film={film} />
//       ))}
//     </Slider>
//   );
// };

// export default FilmSlider;
