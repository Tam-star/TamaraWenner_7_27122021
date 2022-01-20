import logo from '../../assets/icon-transparent-blue.svg';

export default function ErrorContainer() {
    return (
        <section className='center-container error-container'>
            <div className='error-container__title'>
                <p>ERREUR</p>
                <div className='error-container__title__404'>
                    <p>4</p><img className='error-container__title__404__logo' src={logo} alt='Logo de Groupomania'></img><p>4</p>
                </div>
            </div>
            <p>L'URL que vous demandez n'existe pas.</p>
        </section>
    )
}