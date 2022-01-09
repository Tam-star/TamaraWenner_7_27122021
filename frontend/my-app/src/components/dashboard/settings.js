import React from 'react';
import maleAvatar from '../../assets/male-avatar-profile.jpg';
import Switch from 'react-switch';

export default function SettingsContainer({ user, handleClick }) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };
    return (
        <section className='settings-container'>
            <h2>Paramètres</h2>
            <h3>Mode</h3>
            <p>Light Mode / Dark Mode</p>
            <Switch
                //style={{width:'170px'}}
                onChange={handleChange}
                onColor="#18315a"
                offColor='#e6e6e6'
                onHandleColor="#e6e6e6"
                offHandleColor="#ffffff"
                checked={checked}
                className="react-switch"
                height={40}
                width={180}
                uncheckedIcon={
                    <div className='react-switch__uncheckedIcon react-switch__mode'>
                        Light Mode
                    </div>
                }
                checkedIcon={
                    <div className='react-switch__checkedIcon react-switch__mode'>
                        Dark Mode
                    </div>
                }
                uncheckedHandleIcon={
                    <svg className='react-switch__HandleIcon' viewBox="0 0 10 10" >
                        <circle r={3} cx={5} cy={5} />
                    </svg>
                }
                checkedHandleIcon={
                    <svg className='react-switch__HandleIcon' viewBox="0 0 10 10" >
                        <circle r={3} cx={5} cy={5} />
                    </svg>
                }
            />
            <h3>Suppression du compte</h3>
            <button>Je souhaite supprimer mon compte définitivement</button>
        </section>
    )
}

