import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Input from '../src/components/Input';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';


export default function Home() {
	
	const router = useRouter();
	const [name, setName] = useState('');

	return (
		<QuizBackground backgroundImage={db.bg}>
			<Head>
				<title>Covid Quiz</title>
			</Head>
			<QuizContainer>
				<QuizLogo />
					<Widget>
						<Widget.Header>
							<h1>Quiz Covid</h1>
						</Widget.Header>
						<Widget.Content>
							<form onSubmit={(infosDoEvento) => {
								infosDoEvento.preventDefault();
								router.push(`/quiz?name=${name}`);
							}}>
							<Input
								name="nomeDoUsuario"
								onChange={(infosDoEvento) => {setName(infosDoEvento.target.value);}} 
								placeholder="Digite seu nome"
								value={name} 
							/>

							<Button type="submit" disabled={name.length === 0}>
								{`Jogar ${name}`}
							</Button>
							</form>
						</Widget.Content>
					</Widget>
						
					<Widget>
						<Widget.Content>
							<h1>Quizes da Galera</h1>
							<p>lorem ipsolum</p>
						</Widget.Content>
					</Widget>
					<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl = "https://github.com/felipevalerio"/>
		</QuizBackground>
	);
}
