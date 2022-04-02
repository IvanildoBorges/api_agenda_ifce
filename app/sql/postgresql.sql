/*Criar tabela de atividades*/
CREATE TABLE atividade(
	ID SERIAL PRIMARY KEY,
	titulo VARCHAR(50),
	descricao VARCHAR(300),
	dataDaAtividade TIMESTAMPTZ
);

/*Inserir valores iniciais de duas atividades*/
INSERT INTO atividade(titulo, descricao, dataDaAtividade)
VALUES(
	'N2 PDM', 
	'Atividade para concessão da nota da segunda etapa de Programação para Dispositivos Móveis', 
	'2022-03-23T15:00:00-3'
);

INSERT INTO atividade(titulo, descricao, dataDaAtividade)
VALUES(
	'N1 PDM', 
	'Atividade para concessão da nota da primeira etapa de Programação para Dispositivos Móveis', 
	'2022-02-15 20:40:00-3'
);

/*Listar atividades por data em ordem crescente*/
SELECT * FROM atividade
ORDER BY dataDaAtividade ASC;

/*Criar lista de videos*/
CREATE TABLE video(
	ID SERIAL PRIMARY KEY,
	titulo TEXT,
	organizacao TEXT, 
	fonte TEXT[]
);

INSERT INTO video(titulo, organizacao, fonte)
VALUES(
	'Lista 01 de videos externos',
	'By Blender Foundation',
	ARRAY['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
		 ]
);

INSERT INTO video(titulo, organizacao, fonte)
VALUES(
	'Lista 02 de videos externos',
	'By Google',
	ARRAY['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
		 ]
);

INSERT INTO video(titulo, organizacao, fonte)
VALUES(
	'Lista 03 de videos externos',
	'By Garage419',
	ARRAY['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
		  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
		 ]
);

SELECT * FROM video;
