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
				<a href="/">
					<QuizLogo />
				</a>
				
					<Widget>
						<Widget.Header>
							<h1>{db.title}</h1>
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
					
					{ /* 
					<Widget>
						<Widget.Content>
							
							<h1>Quizes da Galera</h1>
							<ul>
								{db.external.map((linkExterno) => {
									const [projectName, githubUser] = linkExterno
										.replace(/\//g, '')
										.replace('https:', '')
										.replace('.vercel.app', '')
										.split('.');


									return (
										<li key={linkExterno}>
											<Widget.Topic href = {`/quiz/${projectName}___${githubUser}`}>
												{`${githubUser}/${projectName}`}
											</Widget.Topic>
										</li>
									);
								})}
							</ul>
							
						</Widget.Content>
					</Widget>
					 */}
					
					<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl = "https://github.com/felipevalerio"/>
		</QuizBackground>
	);
}
