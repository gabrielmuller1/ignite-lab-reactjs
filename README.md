# Ignite-lab
Desenvolvendo uma aplicação para plataforma de ensino
## Sobre a aula

Na aula do dia 20/06/2022 foi feito o setup do projeto com todas as tecnologias utilizadas para o desenvolvimento e produção da aplicação.

### Tecnologias utilizadas

---

<html><div style = "display:flex;justify-content:space-around;align-items:center;"><div style="display:flex;justify-content:space-around;align-items:center;background-color:#25292e;padding:6px;width:100%; max-width:70px"><img style="padding-left:3px"src="https://res.cloudinary.com/practicaldev/image/fetch/s--gBcBoIco--/c_limit,f_auto,fl_progressive,q_80,w_375/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/29/graphql-sticker.png"alt="graphql" width='20px' height='20px'></img><span>Graphql</span></div><div style="display:flex;justify-content:space-around;align-items:center;background-color:#25292f;padding:6px;width:100%; max-width:70px"><img style="padding-left:3px"src="https://avatars.githubusercontent.com/u/17189275?s=200&v=4"alt="graphql" width='20px' height='20px'></img><span>Apollo</span></div><div style="display:flex;justify-content:space-around;align-items:center;background-color:#25292e;padding:6px;width:100%; max-width:70px"><img style="padding-left:3px"src="https://avatars.githubusercontent.com/u/31031438?s=200&v=4"alt="grapCMS" width='20px' height='20px'></img><span>GraphCMS</span></div><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"alt="react"></img><img src="https://i0.wp.com/blog.logrocket.com/wp-content/uploads/2020/01/tailwind-css-logo.png?resize=730%2C182&ssl=1"width="100px"alt="react"></img></div></html>

---

### Notas sobre o IGNITE LAB

O Tailwind vai ajudar a estilizar a nossa aplicação e adicionar (like a bootstrap) responsividade.

Caso seja necessário, podemos utilizar no próprio CSS usando o postCSS a funcionalidade **Apply** pra gerar códigos css mais bem organizados:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
.titulo{
    @apply bg-zinc-800 text-zinc-100
}
```
Onde serão utilizadas as estilizações provindas do Tailwind 

### Conceitos básicos graph CMS

- CMS = Content Management System

- Bom para tornar o conteúdo gerenciável pelo cliente

- Headless CMS: Traz apenas o painel de administração (dados fornecidos pela API REST ou pelo graphQL)

- React consome os dados da api ou do CMS

- Slug é uma versão do título adaptada pra url :(sem acentos, em lowerCase etc.)

#### Exemplo básico de relacionamento entre entidades no graph CMS

Uma aula, ou lição deve possuir um e apenas um título, e um título pode pertencer apenas a uma lição, entretanto outras aulas podem possuir um título igual(exemplo de aulas atualizadas).
> Com base nisso criamos no modelo, uma entidade chamada Lesson, que possui uma propriedade Title do tipo string com texto de linha única obrigatório mas que não possui a tag unique.

#### Adicionando um novo campo ou editando um existente

A direita do graphCMS tem muitos tipos de campos diferentes para adicionar a entidade de forma facilitada.

Além disso podemos editar um campo existente, adicionar relações entre outras entidades

#### Adicionando dados ao GraphCMS

Pra adicionar um dado de uma entidade, é bem simples, basta ir em content, selecionar a entidade, depois clicar em go to content editing, adicionar os campos e clicar em salvar e publicar para publicar diretamente uma edição/adição no banco de dados.

#### sobre requisições de apis graphQL

- Toda api é gerada automaticamente

- Só serão feitas em graphQL e não em REST

- Só existem dois tipos de solicitações em graphQL que são:
    - Mutation: Altera, exclui ou cria informações
    - Query: Buscar informações

##### Vantagens

Em uma única requisição, é possível buscar diversos dados no back-end, além de ser possível estipular quais dados serão necessários na requisição, dando a responsabilidade de solicitação apenas para o front-end, onde o que é solicitado é sempre fornecido, nem mais nem menos, removendo as possibilidades de *under-fetching* ou *over-fetching*.

- Under-fetching: Back-end retorna menos informações do que o necessário

- Over-fetching: Back-end retorna mais informações do que o necessário

#### Configurando o graphCMS na aplicação

Uma vez criado um projeto, ou clonado, pode dar uma olhada no schema que fica a esquerda, onde estarão os relacionamentos do seu banco de dados, você pode editar os dados seguindo o que foi dito [acima](#adicionando-dados-ao-graphcms), mas considerando que todas as informações já estão no banco, basta agora copiar a Url da API e utilizar ela na sua aplicação.

##### Fazendo chamada api sem usar apolo

Entretanto, se você for do tipo que não instala qualquer dependência, você pode consumir os dados da api no react usando o framework`axios` ou o próprio `fetch` do node da seguinte forma:

```ts
import { useEffect } from "react"
const API_URL:string=process.env.API_URL || "https://api-sa-east-1.graphcms.com/v2/cl4oenrc924cn01xiezv89e0m/master"
function App() {
  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      body: 
        `query{...dados usados na requisição}`
      
  })
},[])
  return (
     <h1 className="text-5xl font-bold text-violet-500">Hello World</h1>
  )
}

export default App

```

##### Instalando o apollo

Para consumo da api no ignite adicionamos uma nova dependência para efetuar essas chamadas da api,chamada **apolo**.


Para instalar o apollo basta executar o comando :

 `npm i @apollo/client `

> Para utilizar é necessário já ter o graphQl instalado, se não tiver instale

###### Configurando o apollo

1. Crie um diretório chamado lib, e adicione um arquivo chamado `apollo.ts`

2. Adicione o seguinte script a ele:

```ts

import { ApolloClient, InMemoryCache } from "@apollo/client";
const API_URL: string = process.env.API_URL || "https://api-sa-east-1.graphcms.com/v2/cl4oenrc924cn01xiezv89e0m/master"; 
export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
})

```

3. Onde estiver efetuando o consumo dos dados na api adicione o import do client do apolo:

```ts
import {client} from "./lib/apollo"
```

4. Adicione a query da consulta da seguinte forma para garantir a sintaxe highlight no vscode:

```ts
const GET_ENTITY_QUERY=gql`

query{
  lessons{
    id
    title
  }
}
`

```

5. Consuma esses dados através do useEffect

```ts
useEffect(() => {
    client.query({
      query: GET_LESSONS_QUERY
    }).then(response=>{console.log(response.data)})
   },[])
```
Que deverá imprimir no console do navegador os dados consultados.

##### Usando REACT HOOKS / CONTENT API com o apollo

Primeiramente editamos o arquivo `main.tsx` pra adicionar comportamentos ao nosso componente App com base na content API adicionando o context-provider ApolloProvider:

```ts
import {ApolloProvider} from '@apollo/client' // importa o apollo provider
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { client } from './lib/apollo'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> // Adiciona o apollo provider como context provider do app
    <ApolloProvider client={client}>// obrigatoriamente possui a propriedade client que é o arquivo que configuramos inicialmente
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

```  
Em seguida dentro do contexto do componente, fazemos a importação do *hook* useQuery do apolo e adicionamos o hook ao componente:

```ts
import {useQuery} from "@apollo/client"
/*

dentro do componente

*/
const {data}=useQuery(GET_LESSONS_QUERY)
```
