# 📦 WTR - Wordpress Typescript React

## Intro

### Perché WTR?

WTR nasce dalla necessità di avere uno strumento per creare velocemente piccoli siti in Wordpress mantenedno il backend, a cui i clienti sono così affezionati, e provando a risolvere le problematiche più note (o comunque quelle che abbiamo incontrato in questi anni di attività) dello sviluppare in Typescript:

1. Ottenere, quasi, una forma parziale di server side rendering;
2. Migliorare le performance lato SEO/Crawlers;
3. Ottimizzare l'uso degli assets, del chunk splitting ec...
4. Il dover ogni volta riconfigurare Webpack (o il bundler di vostra preferenza, sempre da capo).

### Cosa è dunque WTR

WTR non è altro che un pacchetto installabile da npm attraverso il comando:

```bash
npm i @hund-ernesto/wtr
```

che contiene al suo interno:

- Un bundler (Webpack) già configurato pronto per essere usato (anche in watch mode) $^{1}$;
- Uno script che (attraverso la funzione `renderToString()` di react/server) prerenderizza i template del tema PHP di Wordpress;
- Alcuni React Hooks per interagire con varie funzionalità di Wordpress (ad esempio i menù o i plugin multilingua);
- Un router che permette di aggiornare i meta della pagina prendendo direttamente i dati impostati da Yoast;
- Il supporto di default per ACF.

$_{1\ Dentro\ a\ Webpack\ è\ attivo\ il\ supporto\ per\ scss,\ moduli\ css,\ immagini,\ font}$

> Disclaimer: Le features rese disponibili per WTR sono tarate sul nostro modo di sviluppare e sul nostro stack di plugin/tecnologie. Se hai bisogno di ulteriori informazioni relative al supporto di plugin non elencati alla voce plugin scrivici a [developer@hund.studio](mailto:developer@hund.studio).

WTR è quindi un modo per sviluppare rapidamente un sito senza doversi preoccupare di Wordpress, o Typescript, o React ma concentrandosi solamente sulle cose che contano.

## Supporto per i plugin

Essendo un tema Wordpress la maggior parte dei plugin che possono essere installati su wordpress possono essere usati anche con WTR...detto ciò alcuni plugin che vanno a modificare/intervengono sul frontend potrebbero andare in conflitto con il sistema ibrido di Server Side Rendering e causarne un malfunzionamento totale o parziale. In generale la nostra policy è: meno plugin ci sono meglio stiamo tutti...nel mondo.

Di seguito sono invece elencati i plugin direttamente integrati all'interno di WTR e che possono fornire varie funzionalità utili:

- Advanced Custom Fields;
- qTranslate-XT;
- Yoast SEO.

> Disclaimer: In caso di plugin particolarmente utili possiamo eventualmente valutare di integrarli. Scrivi alla mail [developer@hund.studio](mailto:developer@hund.studio).

## Note importanti in ordine sparso

- WTR funziona solamente con Typescript e non Javascript, quindi se già non lo state usando vedete di mettervi in pari;
- Allo stato attuale non abbiamo creato un comando in stile create-react-app per generare un boilerplate iniziale MA...per partire è sufficiente generare letteralmente 2 file...

## Come iniziare ad usarlo

Per partire ad usare WTR avrete bisogno di:

- Un ambiente di sviluppo locale in PHP;
- Un'installazione di Wordpress;
- NodeJS installato sulla vostra macchina;

Una volta soddisfatti questi requisiti sarà sufficiente:

1. Creare la cartella del progetto

```bash
mkdir il-mio-tema-wordpress
```

2. Iniziare un nuovo progetto

```bash
npm init -y
```

3. Installare WTR

```bash
npm i @hund-ernesto/wtr
```

4. Aggiungere un file `tsconfig.json`, un file `declarations.d.ts` e un file `.env`

```JSON
// ./tsconfig.json
{
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"moduleResolution": "node10",
		"baseUrl": "./",
		"strict": true,
		"esModuleInterop": true,
		"declaration": false,
		"skipLibCheck": true,
		"jsx": "react-jsx",
		"paths": {
			"@/*": ["./*"]
		}
	}
}
```

Per evitare che typescript si lamenti quando importate .jpg .png o simili...

```typescript
// ./declarations.d.ts
/// <reference types="@hund-ernesto/wtr/declarations/global" />
```

Per effettuare il collegamento di WTR con le API di Wordpress

```dotenv
# ./env
WP_HOST="http://yourlocalwordpress.local"
```

1. Aggiungere il file con il layout di base della vostra app

```typescript
// ./src/app/layout.tsx
import { FC, Fragment, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<main>{children}</main>
		</Fragment>
	);
};

export default RootLayout;
```

6. Iniziare ad creare i template di Wordpress necessari

```typescript
// ./src/app/[front-page]/page.tsx
import { FC, Fragment } from "react";

export default function Page({ data, error }: any) {
	return (
		<Fragment>
			<h1>Hello World</h1>
		</Fragment>
	);
}
```

Bene. Il setup è completato e da qui potete fare riferimento al Wiki per ulteriori guide ed esempi.
