import * as React from "react";
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
	Card,
	CardItem,
} from "native-base";

import styles from "./styles";
export interface Props {
	navigation: any;
	list: any;
	authUser: any;
	authRole: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
	render() {
		const cardAdmin = (
			<CardItem
					button
					// onPress={() => this.props.navigation.navigate("PasienPage")}
					>
					<Left><Text>Ubah Role</Text></Left>
					<Right><Icon active name="ios-arrow-forward"/></Right>
				</CardItem>
		);

		const cardDokter = (
				<CardItem
					button
					onPress={() => this.props.navigation.navigate("PasienPage")} >
					<Left><Text>Daftar Pasien</Text></Left>
					<Right><Icon active name="ios-arrow-forward"/></Right>
				</CardItem>
		);

		const cardPasien = (
			<CardItem
				button
				// onPress={() => this.props.navigation.navigate("PasienPage")}
				>
				<Left><Text>Riwayat Rekam Medik</Text></Left>
				<Right><Icon active name="ios-arrow-forward"/></Right>
			</CardItem>
	);

		const cardResepsionis = (
			<CardItem
				button
				onPress={() => this.props.navigation.navigate("PasienPage")}
				>
				<Left><Text>Input Daftar Periksa Pasien</Text></Left>
				<Right><Icon active name="ios-arrow-forward"/></Right>
			</CardItem>
	);

		let selectedCard;
		if (this.props.authRole === "admin") {
			selectedCard = cardAdmin;
		} else if (this.props.authRole === "dokter") {
			selectedCard = cardDokter;
		} else if (this.props.authRole === "pasien") {
			selectedCard = cardPasien;
		} else if (this.props.authRole === "resepsionis") {
			selectedCard = cardResepsionis;
		}

		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent>
							<Icon
								active
								name="menu"
								onPress={() => this.props.navigation.navigate("DrawerOpen")}
							/>
						</Button>
					</Left>
					<Body>
						<Title>Dashboard</Title>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content} >
					<Card>
						<CardItem header>
							<Body>
								<Text>{this.props.authUser}</Text>
							</Body>
						</CardItem>
						{selectedCard}
					</Card>
				</Content>
			</Container>
		);
	}
}

export default Home;

{/* <List>
	{this.props.list.map((item, i) => (
		<ListItem
			key={i}
			onPress={() =>
				this.props.navigation.navigate("BlankPage", {
					name: { item }
				})}
		>
			<Text>{item}</Text>
		</ListItem>
	))}
</List> */}