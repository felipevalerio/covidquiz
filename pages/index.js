import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
				
					<Widget 
						as={motion.section}
						transition= {{ delay: 0, duration: 0.5 }}
						variants={{
							show: { opacity: 1, y: '0' },
							hidden: { opacity: 0, y: '100%' },
						}}

						initial="hidden"
						animate="show"
					>
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
					
					
					<Widget 
						as={motion.section}
						transition= {{ delay: 0.5, duration: 0.5 }}
						variants={{
							show: { opacity: 1 },
							hidden: { opacity: 0 },
						}}

						initial="hidden"
						animate="show"
					>
						<Widget.Content>
							
							<h1>Quizes da Galera</h1>
							<ul>
								{db.external.map((linkExterno) => {
									const [projectName, githubUser] = linkExterno
										.replace(/\//g, '')
										.replace('https:', '')
										.replace('.vercel.app', '')
										.split('.');

									{/* `/quiz/${projectName}___${githubUser}` */}
									return (
										<li key={linkExterno}>
											<Widget.Topic href = {linkExterno}>
												{`${githubUser}/${projectName}`}
											</Widget.Topic>
										</li>
									);
								})}
							</ul>
							
						</Widget.Content>
					</Widget>
					 
					<Footer 
						as={motion.footer}
						transition= {{ delay: 0.5, duration: 0.5 }}
						variants={{
							show: { opacity: 1 },
							hidden: { opacity: 0 },
						}}

						initial="hidden"
						animate="show"
					/>
			</QuizContainer>
			<GitHubCorner projectUrl = "https://github.com/felipevalerio"/>
		</QuizBackground>
	);
}
