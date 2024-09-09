document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.nav-link')
    const tabContent = document.getElementById('content')

    function loadSection(section) {
        const tabLink = `./secciones/${section}.html`

        fetch(tabLink)
            .then(response => response.text())
            .then(data => {
                tabContent.innerHTML = data

                if (section === 'perfil') {
                    const btnContacto = document.getElementById('btn-contacto')
                    if (btnContacto) {
                        btnContacto.addEventListener('click', () => {
                            const contactModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'))
                            contactModal.hide()

                            loadSection('contacto')
                        })
                    }
                }
            })
            .catch(error => console.log('Error al cargar contenido de la página:', error))
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault()

            const section = e.target.getAttribute('data-tab')
            loadSection(section)
        })
    })

    window.addEventListener('DOMContentLoaded', () => {
        loadSection('inicio')
    })

    document.getElementById('btn-contacto').addEventListener('click', () => {
        const contacto = document.getElementById('exampleModal')
        const contactModal = bootstrap.Modal.getOrCreateInstance()

        contactModal.hide()

        loadSection('contacto')
    })

    const btnEnviar = document.getElementById('btn-enviar')
    const modalContacto = document.getElementById('modal-body-contacto')

    btnEnviar.addEventListener('click', (e) => {
        e.preventDefault()

        const nombre = document.getElementsByName('nombre').value
        const email = document.getElementsByName('email').value
        const mensaje = document.getElementsByName('mensaje').value

        if (nombre && email && mensaje) {
            const contactModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'))
            modalContacto.show()
        } else {
            alert('Por favor, completa todos los campos del formulario.');
        }
    })
})