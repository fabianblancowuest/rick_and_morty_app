import styles from "./Favorites.module.css";
import { connect } from "react-redux";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions/actions";

const Favorites = (props) => {
	console.log(props);
	const dispatch = useDispatch();
	function handleOrder(event) {
		dispatch(orderCards(event.target.value));
	}
	function handleFilter(event) {
		dispatch(filterCards(event.target.value));
	}
	// const {name, status, species, gender, origin, image, id, location, onClose}  = props;
	return (
		<article className={styles.article}>
			<section className={styles.favorites}>
				<div>
					<select onChange={handleFilter}>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Genderless">Genderless</option>
						<option value="unknown">Unknown</option>
					</select>
					<select onChange={handleOrder}>
						<option value="A">Ascedente</option>
						<option value="D">Descendente</option>
					</select>
				</div>
				<div className={styles.container}>
					{props.favorites?.map((character, index) => {
						return (
							<Card
								key={index}
								id={character.id}
								name={character.name}
								status={character.status}
								species={character.species}
								gender={character.gender}
								origin={character.origin.name}
								image={character.image}
							></Card>
						);
					})}
				</div>
			</section>
		</article>
	);
};

export function mapStateToProps(state) {
	return {
		favorites: state.favorites,
	};
}

export default connect(mapStateToProps)(Favorites);
