import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommos'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
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


export default function Home() {
  const gitHubUser = "elton999";

  const [comunidades, setComunidades] = React.useState([{
    id: '1234',
    login: 'AluraKut',
    avatar_url: 'http://placehold.it/300x300'
  }]);

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
    fetch('https://api.github.com/users/elton999/following')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
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

              setComunidades(
                [
                  ...comunidades,
                  {
                    id: new Date().toISOString(),
                    login: dadosForm.get('title'),
                    avatar_url: dadosForm.get('image')
                  },

                ]
              );

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
