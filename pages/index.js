import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommos'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
import ProfileGaleriaBox from '../src/components/ProfileGaleriaBox';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitHubUser}`}>
          @{propriedades.gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}


export default function Home(props) {
  const gitHubUser = props.githubUser;

  const [comunidades, setComunidades] = React.useState([]);

  const favoritesPerson = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch(`https://api.github.com/users/${gitHubUser}/following`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      });

    fetch('https://graphql.datocms.com/',
      {
        method: 'post',
        headers: {
          'Authorization': '8f3fc47b8f4c474ac5fed4f59a1fe9',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }, body: JSON.stringify({
          "query": `query {
          allCommunities{
            login
            id
            avatarUrl
            creatorSlug
          }
        }` })
      })
      .then((resposta) => resposta.json())
      .then((respostaCompleta) => {
        setComunidades(respostaCompleta.data.allCommunities);
      })
  }, [])


  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  {
                    login: dadosForm.get('title'),
                    avatar_url: dadosForm.get('image')
                  }
                )
              }).then(async (response) => {
                const dados = await response.json();
                setComunidades([...comunidades, dados.register]);
              })
            }}>
              <div>
                <input
                  placeholder="qual vai ser o nome da sua comunidade?"
                  name="title"
                  type="text"
                  aria-label="qual vai ser o nome da sua comunidade?" />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa" />
              </div>

              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileGaleriaBox props={{ items: seguidores, title: 'Seguidores' }} />
          <ProfileGaleriaBox props={{ items: comunidades, title: 'Comunidades' }} />
          <ProfileGaleriaBox props={{ items: favoritesPerson, title: 'Pessoas da Comunidades' }} />

        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    },
  }
}
