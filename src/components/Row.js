import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import "./Row.css";
import MovieModal from './MovieModal';

import { Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Row({ isLargeRow, title, id, fetchUrl }) {
	const [movies, setMovies] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [movieSelected, setMovieSelected] = useState();
	useEffect(() => {
		fetchMovieData();
	}, []);
	
	const fetchMovieData = async () => {
		const request = await axios.get(fetchUrl);
		setMovies(request.data.results);
	}

	const handleClick = (movie) => {
		setModalOpen(true);
		setMovieSelected(movie);
	};


	return (
		
		<section className='row'>
			<h2>{title}</h2>
				<Swiper
					modules={[Pagination, Navigation, Scrollbar, A11y]}
					navigation
					pagination={{ clickable: true }}
					loop={true}
					breakpoints={{
						1378: {
							slidesPerView: 6,
							slidesPerGroup:5
						},
						998: {
							slidesPerView: 5,
							slidesPerGroup:5
						},
						625: {
							slidesPerView: 4,
							slidesPerGroup:2
						},
						0: {
							slidesPerView: 3,
							slidesPerGroup:1
						}
					}}
				>	
					<div id={id} className='row__posters'>
						{movies.map(movie => (
							<SwiperSlide>
								<img 
									key={movie.id}
									className={`row__poster ${isLargeRow && "row__posterLarge"}`}
									src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
									onClick={() => handleClick(movie)}
								/>
							</SwiperSlide>
						))}
					</div>
				</Swiper>

						{
							modalOpen &&
								<MovieModal {...movieSelected} setModalOpen={setModalOpen} />
						}

		</section>
		
	)
}
