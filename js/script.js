/* =========================================================
   ATOS 29 — A HISTÓRIA CONTINUA
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ROLAGEM SUAVE PARA LINKS INTERNOS
    ====================================================== */

    const linksInternos = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const id = link.getAttribute("href");
            const destino = document.querySelector(id);

            if (!destino) return;

            event.preventDefault();

            const cabecalho = document.querySelector(".cabecalho");

            const alturaCabecalho = cabecalho
                ? cabecalho.offsetHeight
                : 0;

            const posicao =
                destino.getBoundingClientRect().top +
                window.pageYOffset -
                alturaCabecalho;

            window.scrollTo({
                top: posicao,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACCORDION DOS CAPÍTULOS
       AO ABRIR UM, FECHA OS OUTROS
    ====================================================== */

    const capitulos = document.querySelectorAll(
        ".experiencia details"
    );

    capitulos.forEach((capitulo) => {

        capitulo.addEventListener("toggle", () => {

            if (!capitulo.open) return;

            capitulos.forEach((outroCapitulo) => {

                if (
                    outroCapitulo !== capitulo &&
                    outroCapitulo.open
                ) {

                    outroCapitulo.removeAttribute("open");

                }

            });

        });

    });


    /* =====================================================
       CONTROLE DE ÁUDIOS
       QUANDO UM ÁUDIO TOCA, OS OUTROS PARAM
    ====================================================== */

    const audios = document.querySelectorAll("audio");

    audios.forEach((audio) => {

        audio.addEventListener("play", () => {

            audios.forEach((outroAudio) => {

                if (outroAudio !== audio) {

                    outroAudio.pause();

                }

            });

        });

    });


    /* =====================================================
       PARA O ÁUDIO QUANDO O CAPÍTULO É FECHADO
    ====================================================== */

    capitulos.forEach((capitulo) => {

        capitulo.addEventListener("toggle", () => {

            if (!capitulo.open) {

                const audio =
                    capitulo.querySelector("audio");

                if (audio) {

                    audio.pause();

                    audio.currentTime = 0;

                }

            }

        });

    });


    /* =====================================================
       MENU ATIVO CONFORME A SEÇÃO VISÍVEL
    ====================================================== */

    const secoes = document.querySelectorAll(
        "main section[id]"
    );

    const linksMenu = document.querySelectorAll(
        ".menu a[href^='#']"
    );

    if (
        secoes.length > 0 &&
        linksMenu.length > 0
    ) {

        const observerMenu =
            new IntersectionObserver(

                (entradas) => {

                    entradas.forEach((entrada) => {

                        if (!entrada.isIntersecting) return;

                        const id =
                            entrada.target.getAttribute("id");

                        linksMenu.forEach((link) => {

                            link.classList.remove("ativo");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add("ativo");

                            }

                        });

                    });

                },

                {
                    root: null,
                    rootMargin: "-30% 0px -60% 0px",
                    threshold: 0
                }

            );

        secoes.forEach((secao) => {

            observerMenu.observe(secao);

        });

    }


    /* =====================================================
       ANIMAÇÃO SUAVE DOS CAPÍTULOS
    ====================================================== */

    const experiencias = document.querySelectorAll(
        ".experiencia"
    );

    if ("IntersectionObserver" in window) {

        const observerExperiencias =
            new IntersectionObserver(

                (entradas, observer) => {

                    entradas.forEach((entrada) => {

                        if (!entrada.isIntersecting) return;

                        entrada.target.classList.add(
                            "experiencia-visivel"
                        );

                        observer.unobserve(
                            entrada.target
                        );

                    });

                },

                {
                    threshold: 0.08
                }

            );

        experiencias.forEach((experiencia) => {

            observerExperiencias.observe(
                experiencia
            );

        });

    } else {

        experiencias.forEach((experiencia) => {

            experiencia.classList.add(
                "experiencia-visivel"
            );

        });

    }


    /* =====================================================
       ATUALIZAÇÃO AUTOMÁTICA DO ANO
       NO RODAPÉ
    ====================================================== */

    const anoAtual = new Date().getFullYear();

    const copyright =
        document.querySelector(".rodape-copy p");

    if (copyright) {

        copyright.innerHTML =
            `&copy; ${anoAtual} Atos 29 - Ministério Atalaia.
            Todos os direitos reservados.`;

    }


    /* =====================================================
       TECLA ESC
       FECHA TODOS OS CAPÍTULOS
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        capitulos.forEach((capitulo) => {

            if (capitulo.open) {

                capitulo.removeAttribute("open");

            }

        });

    });


    /* =====================================================
       SEGURANÇA PARA LINKS EXTERNOS
    ====================================================== */

    const linksExternos = document.querySelectorAll(
        'a[target="_blank"]'
    );

    linksExternos.forEach((link) => {

        if (
            !link.hasAttribute("rel")
        ) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    console.log(
        "Atos 29 — JavaScript carregado com sucesso."
    );

});