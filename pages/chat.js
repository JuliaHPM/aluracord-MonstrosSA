import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwODUxNiwiZXhwIjoxOTU4ODg0NTE2fQ.3tTR-qYcgg0A9UdNdhfLJYCooEGAP4xoY2QLKgsFGXE";
const SUPABASE_URL = "https://drhdbangmldvugyamovy.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [mensagem, setMensagem] = useState();
    const [listaMensagens, setListaMensagens] = useState([]);

    useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('dados: ', data);
                setListaMensagens(data)
            });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaMensagens.length + 1,
            de: 'juliahpm', //vanessametonini //usuário logado
            texto: novaMensagem
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                setListaMensagens([
                    data[0],
                    ...listaMensagens
                ]);
            })

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/monsters-inc-doors-at-scare-floor-f-1024x576.jpeg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Lista: */}
                    {/* {listaMensagens.map((mensagemAtual)=>{
                        return(
                        <li key={mensagemAtual.id}><b>{mensagemAtual.de}: </b>{mensagemAtual.texto}</li>
                        )
                    })} */}

                    <MessageList mensagens={listaMensagens} setListaMensagens={setListaMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'start',
                            // justifyContent:'center'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            onChange={(event) => {
                                // console.log(event);
                                const novaMensagem = event.target.value;
                                setMensagem(novaMensagem);
                            }}
                            onKeyPress={(event) => {
                                // console.log(event);
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                        />
                        <Button
                            title='Enviar'
                            iconName='FaPaperPlane'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                // height: '0%'
                            }}
                            onClick={() => { handleNovaMensagem(mensagem) }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList({ mensagens, setListaMensagens }) { //props.mensagens
    // console.log('MessageList', props.mensagens);

    function excluirMensagem({ id }) {
        supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: id })
            .then(({ data }) => {
                //novo array sem a mensagem que foi apagada:
                const listaMensagensRestantes = mensagens.filter((mensagem) => mensagem.id !== data[0].id);
                // console.log("listaMensagensRestantes: ", listaMensagensRestantes)

                setListaMensagens(
                    listaMensagensRestantes
                );
            })
    }


    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                // overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px'
            }}
        >

            {mensagens?.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}

                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                }}>
                                <Box>
                                    <Image
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}

                                    />
                                    <Text tag="strong">
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                </Box>
                                <Button
                                    variant='tertiary'
                                    colorVariant='dark'
                                    rounded='full'
                                    title='Excluir'
                                    label='x'
                                    onClick={() => { excluirMensagem(mensagem) }}
                                />
                            </Box>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}

        </Box>
    )
}