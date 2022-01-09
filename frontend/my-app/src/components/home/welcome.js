import logo from '../../assets/icon-transparent-blue.svg';

export default function Welcome() {
    return (
        <section className='center-container welcome-container'>
            <img className='welcome-container__logo' src={logo}></img>
            <h1>Welcome to <span className='welcome-container__company-name'>Groupomania</span></h1>
            <p></p>
        </section>
    )
}