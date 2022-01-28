import React, { useEffect } from "react";
import appConfig from "../config.json"
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useState } from "react";
import { useRouter } from "next/router"

function Titulo(props) {
  const Tag = props.tag || h1;

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 
            }
            `}</style>
    </>
  )
}



export default function PaginaInicial() {
  const [username, setUsername] = useState('juliahpm'),
    [userNotFound, setUserNotFound] = useState(false),
    [bioGit, setBioGit] = useState(),
    [nameGit, setNameGit] = useState(),
    [repoGit, setRepoGit] = useState(),
    [followersGit, setFollowersGit] = useState(),
    [followingGit, setFollowingGit] = useState();

  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(async (res) => {
      const dadosGit = await res.json();

      if(dadosGit.message === "Not Found"){
        setUserNotFound(true);
        setBioGit('');
        setNameGit('');
        setRepoGit('');
        setFollowersGit('');
        setFollowingGit();
      }else{
        setUserNotFound(false);
      
        setBioGit(dadosGit.bio);
        setNameGit(dadosGit.name);
        setRepoGit(dadosGit.public_repos);
        setFollowersGit(dadosGit.followers);
        setFollowingGit(dadosGit.following);

      }
        
      })
  }, [username])

  // const bioGit = dadosGit.bio;
  // console.log(bioGit);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[400],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/monsters-inc-doors-at-scare-floor-f-1024x576.jpeg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
            onSubmit={function (event) {
              event.preventDefault();
              router.push(`/chat?username=${username}`);
            }}
          >
            <Titulo tag="h2">Olá monstro!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              defaultValue={username}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '210px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              // border: '1px solid',
              // borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />

            <Box styleSheet={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '5px',

            }}>
              {username &&
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.primary[600],
                    padding: '4px 10px',
                    marginBottom: '5px',
                    marginRight: '5px',
                    borderRadius: '1000px',
                    fontSize: '13px', 
                    textAlign:'center',
                    
                  }}
                >
                  {username}
                </Text>}

              {nameGit &&
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '4px 10px',
                    marginBottom: '5px',
                    borderRadius: '1000px',
                    fontSize: '13px', 
                    textAlign:'center'
                  }}
                >
                  {nameGit}
                </Text>}
            </Box>

            <Box styleSheet={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '5px',

            }}>
              {repoGit>=0 &&
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '4px 11px',
                    borderRadius: '1000px', 
                    textAlign:'center'
                  }}
                >
                  <b>{repoGit}</b> repo
                </Text>}

              {followersGit>=0 &&
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '4px 11px',
                    borderRadius: '1000px',
                    marginLeft: '4px',
                    marginRight: '4px',
                    textAlign:'center'
                  }}
                >
                  <b>{followersGit}</b> followers
                </Text>}

              {followingGit>=0 &&
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '4px 11px',
                    borderRadius: '1000px', 
                    textAlign:'center'
                  }}
                >
                  <b>{followingGit}</b> following
                </Text>}

            </Box>

            {!username &&
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  //  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  //  borderRadius: '1000px',
                  textAlign: "center"
                }}
              >
                Digite um nome de usuário
              </Text>
            }

              {userNotFound && username.length>0 &&
              <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                //  backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                //  borderRadius: '1000px',
                textAlign: "center"
              }}
            >
              Usuário não encontrado!
            </Text>
              }


            {bioGit &&
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '5px 12px',
                  borderRadius: '15px'
                }}
              >
                {bioGit}

              </Text>
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
} 